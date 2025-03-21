import styled from "styled-components";
import axios from "axios";

import { useContext, useState } from "react";
import ErrorMessage from "../../components/common/ErrorMessage";
import { useNavigate } from "react-router";
import AdminContext from "../../components/context/AdminContext";
import { API_HOST } from "../../constants";
import PropTypes from "prop-types";

const LoginInput = ({ inputText, handleChange, inputValue, inputType }) => {
    return (
        <StyledLoginInput>
            <h3>{inputText}</h3>
            <input
                type={inputType || "text"}
                value={inputValue}
                onChange={handleChange}
                placeholder={inputText}
            />
        </StyledLoginInput>
    );
};

LoginInput.propTypes = {
    inputText: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    inputValue: PropTypes.string.isRequired,
    inputType: PropTypes.string,
};

const AdminLoginPage = () => {
    const [password, setPassword] = useState("");
    const [adminName, setAdminName] = useState("");
    const [errorText, setErrorText] = useState("");
    const { adminSignIn } = useContext(AdminContext);
    const navgaiton = useNavigate();

    const goAdminHomePage = () => navgaiton("/admin/home");

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleAdminNameChange = (event) => {
        setAdminName(event.target.value);
    };

    const verifyUserInput = () => {
        if (!password || !adminName) {
            return "You need enter all Information.";
        }

        return "";
    };

    const verifySingIn = (adminData) => {
        if (!adminData || adminData.password != password) {
            return "name or PassWord wrong!!";
        }

        return "";
    };

    const hadleSingIn = async () => {
        const userInputError = verifyUserInput();

        if (userInputError) {
            setErrorText(userInputError);
            return;
        }

        try {
            const {
                data: [adminData],
            } = await axios.get(`${API_HOST}/admin?id=${adminName}`);

            const singInError = verifySingIn(adminData);

            if (singInError) {
                setErrorText(singInError);
                return;
            }

            adminSignIn(adminData.id);
            goAdminHomePage();
            setErrorText("");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <StyledAdminLoginPage>
            <h1>Login</h1>
            <StyledLoginContainer>
                {errorText && <ErrorMessage errorText={errorText} />}
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
                <button onClick={hadleSingIn}>Ok</button>
            </StyledLoginContainer>
        </StyledAdminLoginPage>
    );
};

export default AdminLoginPage;

const StyledAdminLoginPage = styled.div`
    width: 100%;
    height: 100vh;
    background-color: ${(props) => props.$wrapperColor || "#c68642b2"};

    h1 {
        text-align: center;
        padding: 16px 0px;
    }
`;

const StyledLoginContainer = styled.div`
    max-width: 400px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;

    button,
    input {
        width: 100%;
        font-size: 24px;
        padding: 4px 8px;
        border-radius: 20px;
    }

    button {
        margin-top: 16px;
    }
`;

const StyledLoginInput = styled.div`
    width: 100%;
    padding: 16px 0px;
    h3 {
        padding: 8px 4px;
    }
`;
