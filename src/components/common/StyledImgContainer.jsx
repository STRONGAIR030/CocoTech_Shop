import styled, {css} from "styled-components";

const StyledImgContainer = styled.div`
    overflow: hidden;
    width: 100%;

    ${props => props.$containerWidth && css`
        max-width: ${props.$containerWidth};
    `}

    &::before{
        content: ' ';
        display: block;
        width: 100%;
        padding-top: 100%;
    }

    div{
        width: 100%;
        height: 100%;
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        ${props => props.$imgUrl && css`background-image: url(${props.$imgUrl});`}
        
        position: absolute;
        top: 0;
        left: 0;
    }

`

export default StyledImgContainer