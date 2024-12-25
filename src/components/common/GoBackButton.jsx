import styled from "styled-components";
import StyledImgContainer from "./StyledImgContainer";
import { useNavigate } from "react-router";

const GoBackButton = () => {
    const navigate = useNavigate();
    
    const goBack = () => {
        navigate(-1);
    }

    return (
        <StyledBackButton onClick={goBack}>
            <StyledImgContainer $imgUrl="/img/goBack.svg">
                <div/>
            </StyledImgContainer>
        </StyledBackButton>
    )
}

export default GoBackButton

const StyledBackButton = styled.button`
    width: 60px;
    padding: 8px 12px;
    border-radius: 10px;

    position: absolute;

    right: 16px;
    top: 16px;

    @media screen and (max-width: 540px){
        width: 45px;
    }
`
