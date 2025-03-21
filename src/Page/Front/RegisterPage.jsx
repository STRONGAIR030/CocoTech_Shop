import { NavLink, useNavigate } from "react-router";
import DefaultLayout from "../../components/layout/defaultLayout";
import styled from "styled-components";
import { useContext, useState } from "react";
import axios from "axios";
import { API_HOST } from "../../constants";
import FrontContext from "../../components/context/FrontContext";
import ErrorMessage from "../../components/common/ErrorMessage";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [passWord, setPassWord] = useState("");
    const [firtstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [errorText, setError] = useState("");
    const { userSignIn } = useContext(FrontContext);
    const navigate = useNavigate();

    const goToOrderPage = () => navigate("/account/orders");

    const verifyUserInput = () => {
        if (!(email && passWord && lastName && firtstName)) {
            return "You need to enter all information.";
        }

        const emailRule =
            /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
        if (!emailRule.test(email)) {
            return "You need to enter correct email.";
        }

        return "";
    };

    const handleRegister = async () => {
        const error = verifyUserInput();

        if (error) {
            setError(error);
            return;
        }

        try {
            const responce = await axios.get(
                `${API_HOST}/customers?email=${email}`,
            );
            const data = responce.data;
            if (data.length != 0) {
                setError("This mail is been used!");
            } else {
                const postResponce = await axios.post(`${API_HOST}/customers`, {
                    email,
                    name: firtstName + lastName,
                    passWord,
                });
                const userData = postResponce.data;

                await userSignIn(userData.id, userData.email, userData.name);
                goToOrderPage();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <DefaultLayout>
            <StyledRegisterPage>
                <StyledRegisterContainer>
                    <h3>Register</h3>
                    <ErrorMessage errorText={errorText} />
                    <UserInfInput>
                        <h4>First name</h4>
                        <input
                            placeholder="First name"
                            value={firtstName}
                            onChange={(e) => {
                                setFirstName(e.target.value);
                            }}
                        />
                    </UserInfInput>
                    <UserInfInput>
                        <h4>Last name</h4>
                        <input
                            placeholder="Last name"
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value);
                            }}
                        />
                    </UserInfInput>
                    <UserInfInput>
                        <h4>Email</h4>
                        <input
                            placeholder="Enter your Email"
                            type="text"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </UserInfInput>
                    <UserInfInput>
                        <h4>Password</h4>
                        <input
                            placeholder="Enter your Password"
                            type="password"
                            value={passWord}
                            onChange={(e) => {
                                setPassWord(e.target.value);
                            }}
                        />
                    </UserInfInput>
                    <RegisterBtn onClick={handleRegister}>Register</RegisterBtn>
                    <NavLink to="/account/login">
                        <p>
                            Already have an account? <u>Sign in</u>
                        </p>
                    </NavLink>
                </StyledRegisterContainer>
            </StyledRegisterPage>
        </DefaultLayout>
    );
};

export default RegisterPage;

const StyledRegisterPage = styled.div`
    padding: 16px;
    border-radius: 20px;
    background-color: #c68642;
`;

const StyledRegisterContainer = styled.div`
    max-width: 350px;
    margin: 0px auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > h3 {
        font-size: 3em;
    }

    button,
    input {
        border: none;
        border-radius: 100px;
    }
`;

const UserInfInput = styled.div`
    padding: 16px 0px;
    width: 100%;

    input {
        background-color: #ffdd84;
        padding: 8px 16px;
        font-size: 24px;
        width: 100%;
    }

    h4 {
        font-size: 2em;
    }
`;

const RegisterBtn = styled.button`
    margin: 32px 0px;
    width: 100%;
    padding: 8px 16px;
    font-size: 24px;
    background: linear-gradient(to right, #8d5524, #c68642, #e0ac69);
    box-shadow: rgba(0, 0, 0, 0.3) 0px 5px 15px;

    &:active {
        background: #8d5524;
    }
`;
