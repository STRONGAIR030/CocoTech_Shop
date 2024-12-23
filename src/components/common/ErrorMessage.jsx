import { useEffect, useState } from "react"
import styled from "styled-components"
import { v4 as uuidv4} from "uuid"

const ErrorMessage = ({errorText}) => {
    const [errorKey, setKey] = useState(uuidv4())

    useEffect(() => {
        setKey(uuidv4)
    }, [errorText])

    return (
        <StyledErrorContainer key={errorKey}>
            <h3>{errorText}</h3>
        </StyledErrorContainer>
    )    
}

export default ErrorMessage

const StyledErrorContainer = styled.div`
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