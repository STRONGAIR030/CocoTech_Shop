import styled from "styled-components"
import AdminLayout from "../../components/layout/AdminLayout"
import { useState } from "react"

const LoginInput = ({inputText, handleChange, inputValue, inputType}) => {
   return (
        <StyledLoginInput>
            <h3>{inputText}</h3>
            <input type={inputType || "text"} value={inputValue} onChange={handleChange} placeholder={inputText}/>
        </StyledLoginInput>
    )
}

const AdminLoginPage = () => {
    const [password, setPassword] = useState("");
    const [adminName, setAdminName] = useState("");

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    } 

    const handleAdminNameChange = (event) => {
        setAdminName(event.target.value)
    }


    return (
        <StyledAdminLoginPage>
            <h1>Login</h1>
            
            <StyledLoginContainer>
                <LoginInput 
                    inputText="admin name" 
                    inputValue={adminName} 
                    handleChange={handleAdminNameChange}
                />
                <LoginInput 
                    inputText="Password" 
                    inputType="password"
                    inputValue={password} 
                    handleChange={handlePasswordChange}
                />
                <button>Ok</button>
            </StyledLoginContainer>
        </StyledAdminLoginPage>
    )
}

export default AdminLoginPage

const StyledAdminLoginPage = styled.div`
    width: 100%;
    height: 100vh;
    background-color: ${props => props.$wrapperColor || "#c68642b2"};

    h1{
        text-align: center;
        padding: 16px 0px;
    }
`

const StyledLoginContainer = styled.div`
    max-width: 400px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;

    button, input{
        width: 100%;
        font-size: 24px;
        padding: 4px 8px;
        border-radius: 20px;
    }

    button{
        margin-top: 16px;
    }

`

const StyledLoginInput = styled.div`
    width: 100%;
    padding: 16px 0px;
    h3{
        padding: 8px 4px;
    }
`