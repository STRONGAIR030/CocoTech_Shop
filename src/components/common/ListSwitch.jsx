import styled, {css} from "styled-components";

const ListSwitch = ({handleClick, switchState, textSize, imgSize, hrColor}) => {
    return (
        <StyledListSwitch $hrColor={hrColor} $textSize={textSize} $imgSize={imgSize} onClick={handleClick}>
            <StyledSwitchBtn $isTurnOn={switchState}>
                <h3>Reviews</h3>
                <img src="/img/arrow_down.svg"></img>
            </StyledSwitchBtn>
            <hr />
        </StyledListSwitch>
    )
}

export default ListSwitch

const StyledListSwitch = styled.div`
    h3 {
        margin-bottom: 16px;
        font-size: ${props => props.$textSize ? props.$textSize : "auto"};
    }

    hr{
        width: 100%;
        margin-bottom: 16px;
        border: none;
        border-top: 2px dashed ${props => props.$hrColor ? props.$hrColor : "black"};
    }
`

const StyledSwitchBtn = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    img{
        width: ${props => props.$imgSize ? props.$imgSize : "30px"};
        transition: all 0.3s ease-out;
        ${props => props.$isTurnOn && css`
            transform: rotate(180deg);
        `}
    }
`
