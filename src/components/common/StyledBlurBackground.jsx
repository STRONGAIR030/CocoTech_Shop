import styled , {css} from "styled-components";

const StyledBlurBackGround = styled.div`
    backdrop-filter:blur(5px);
    width: 100%;
    height: 100%;
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.37);
    z-index: ${props => props.$zindex || 99};
    visibility: hidden;
    overflow:  scroll;
    ${(props) => props.$show && css`visibility: visible;`}
`

export default StyledBlurBackGround
