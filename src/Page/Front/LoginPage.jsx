import { NavLink } from "react-router"
import DefaultLayout from "../../components/layout/defaultLayout"
import styled from "styled-components"
import { useContext, useState } from "react"
import AppContext from "../../components/common/AppContext"
import axios from "axios"
import { v4 as uuidv4} from "uuid"
import API_HOST from "../../ApiHost"

const LoginPage = () => {
    const {userSignIn} = useContext(AppContext)
    const [email, setEmail] = useState("");
    const [passWord, setPassWord] = useState("");
    const [errorText, setError] = useState("");
    const [errorKey, setKey] = useState(uuidv4());

    const handlSignIn = async () => {
        if(!(email && passWord)){
            setError("You need to enter all information.")
            setKey(uuidv4())
            return;
        }

        const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
        if(!emailRule.test(email)){
            setError("You need to enter correct email.")
            setKey(uuidv4())
            return;      
        }
        
        try{
            const getRes = await axios.get(`${API_HOST}/customers?email=${email}`)            
            const userData = getRes.data
            console.log(userData);
            
            if(userData.length == 0 || userData[0].passWord != passWord){
                console.log(passWord);
                console.log(userData.passWord);
                
                
                setError("eamil or PassWord wrong!!")
                setKey(uuidv4())
            }
            else{
                await userSignIn(userData[0].id, userData[0].email, userData[0].name)
                setError("")
            }

        } catch (err) {
            console.error(err);
            
        }
    }

    return (
        <DefaultLayout>
            <StyledLoginPage>
                <StyledLoginContainer>
                    <h3>Login</h3>
                    {
                        errorText && 
                        <ErrorContainer key={errorKey}>
                            <h3>{errorText}</h3>
                        </ErrorContainer>}
                    <UserInfInput>
                        <h4>Email</h4>
                        <input placeholder="Enter your Email" type="text" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                    </UserInfInput>
                    <UserInfInput>
                        <h4>Password</h4>
                        <input placeholder="Enter your Password" type="password" value={passWord} onChange={(e) => {setPassWord(e.target.value)}}/>
                    </UserInfInput>
                    <LoginBtn onClick={handlSignIn}>Sign in</LoginBtn>
                    <NavLink to="/account/register">
                        <p>Don't have an account? <u>Sign up</u></p>
                    </NavLink>
                </StyledLoginContainer>
            </StyledLoginPage>
        </DefaultLayout>
    )
}

export default LoginPage

const StyledLoginPage = styled.div`
    padding: 16px;
    border-radius: 20px;
    background-color: #C68642;
    animation: CartIn 0.5s both;

    @keyframes CartIn {
        0%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }

`

const StyledLoginContainer = styled.div`
    max-width: 350px;
    margin: 0px auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > h3{
        font-size: 3em;
    }

    button,input{
        border: none;
        border-radius: 100px;
    }
`

const UserInfInput = styled.div`
    padding: 16px 0px;
    width: 100%;

    input{
        background-color: #ffdd84;
        padding: 8px 16px;
        font-size: 24px;
        width: 100%;
    }

    h4{
        font-size: 2em;
    }


`

const LoginBtn = styled.button`
    margin: 32px 0px;
    width: 100%;
    padding: 8px 16px;
    font-size: 24px;
    background: linear-gradient(to right, #8D5524, #C68642, #E0AC69);
    box-shadow: rgba(0, 0, 0, 0.3) 0px 5px 15px;

    &:active{
        background: #8D5524;
    }


`

const ErrorContainer = styled.div`
    width: 100%;
    height: 50px;
    margin: 16px 0px;
    padding: 8px;
    border-radius: 20px;
    border: 2px solid red;
    background-color: rgba(255, 0, 0, 0.2);
    text-align: center;
    animation: ErrorIn 0.2s 2 both;

    @keyframes ErrorIn {
        0%{
            transform: rotate(0deg);
        }
        25%{
            transform: rotate(5deg);
        }
        50%{
            transform: rotate(0deg);
        }
        75%{
            transform: rotate(-5deg);
        }
        100%{
            transform: rotate(0deg)
        }
    }

`