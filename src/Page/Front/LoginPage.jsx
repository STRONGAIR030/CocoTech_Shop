import { NavLink } from "react-router"
import DefaultLayout from "../../components/layout/defaultLayout"
import styled from "styled-components"

const LoginPage = () => {
    return (
        <DefaultLayout>
            <StyledLoginPage>
                <StyledLoginContainer>
                    <h3>Login</h3>
                    <UserInfInput>
                        <h4>Email</h4>
                        <input placeholder="Enter your Email" type="text"/>
                    </UserInfInput>
                    <UserInfInput>
                        <h4>Password</h4>
                        <input placeholder="Enter your Password" type="text"/>
                    </UserInfInput>
                    <LoginBtn>Sign in</LoginBtn>
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
