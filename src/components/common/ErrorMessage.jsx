import { useEffect, useState } from "react"
import styled, {css} from "styled-components"
import { v4 as uuidv4} from "uuid"
import PropTypes from "prop-types";

const ErrorMessage = ({errorText}) => {
    const [errorKey, setKey] = useState(uuidv4())

    useEffect(() => {
        setKey(uuidv4)
    }, [errorText])

    return (
        <StyledErrorContainer key={errorKey} $errorTest={errorText}>
            <h3>{errorText}</h3>
        </StyledErrorContainer>
    )    
}

ErrorMessage.propTypes = {
    errorText: PropTypes.string.isRequired,
}

export default ErrorMessage

const StyledErrorContainer = styled.div`
    ${props => props.$errorTest || css`
        display: none;
    `};

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