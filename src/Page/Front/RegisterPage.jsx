import { NavLink } from "react-router"
import DefaultLayout from "../../components/layout/defaultLayout"
import styled from "styled-components"

const RegisterPage = () => {
    return (
        <DefaultLayout>
            <Wrapper>
                <StyledRegisterPage>
                    <StyledRegisterContainer>
                        <h3>Register</h3>
                        <UserInfInput>
                            <h4>First name</h4>
                            <input placeholder="First name" type="text"/>
                        </UserInfInput>
                        <UserInfInput>
                            <h4>Last name</h4>
                            <input placeholder="Last name" type="text"/>
                        </UserInfInput>
                        <UserInfInput>
                            <h4>Email</h4>
                            <input placeholder="Enter your Email" type="text"/>
                        </UserInfInput>
                        <UserInfInput>
                            <h4>Password</h4>
                            <input placeholder="Enter your Password" type="text"/>
                        </UserInfInput>
                        <RegisterBtn>Register</RegisterBtn>
                        <NavLink to="/account/login">
                            <p>Already have an account? <u>Sign in</u></p>
                        </NavLink>
                    </StyledRegisterContainer>
                </StyledRegisterPage>
            </Wrapper>
        </DefaultLayout>
    )
}

export default RegisterPage

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 16px;
    background-color: #c68642b2;
`

const StyledRegisterPage = styled.div`
    padding: 16px;
    border-radius: 20px;
    background-color: #C68642;
`

const StyledRegisterContainer = styled.div`
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

const RegisterBtn = styled.button`
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