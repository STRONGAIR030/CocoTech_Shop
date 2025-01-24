
import PropTypes from "prop-types";
import styled, {css} from "styled-components";

const ListSwitch = ({text, handleClick, switchState, textSize, imgSize, hrColor , mdShow, padding}) => {
    return (
        <StyledListSwitch $hrColor={hrColor} $textSize={textSize} $imgSize={imgSize} onClick={handleClick} $mdShow={mdShow} $padding={padding}>
            <StyledSwitchBtn $isTurnOn={switchState}>
                <h3>{text}</h3>
                <img src="/img/arrow_down.svg"></img>
            </StyledSwitchBtn>
            <hr />
        </StyledListSwitch>
    )
}

ListSwitch.propTypes = {
    text: PropTypes.string,
    handleClick: PropTypes.func.isRequired,
    switchState: PropTypes.bool.isRequired,
    textSize: PropTypes.string,
    imgSize: PropTypes.string,
    hrColor: PropTypes.string,
    mdShow: PropTypes.bool,
    padding: PropTypes.string,

}

export default ListSwitch

const StyledListSwitch = styled.div`
    padding:${props => props.$padding ? props.$padding : "0px"};
    h3 {
        font-size: ${props => props.$textSize ? props.$textSize : "auto"};
    }

    hr{
        width: 100%;
        margin-bottom: 16px;
        border: none;
        border-top: 2px dashed ${props => props.$hrColor ? props.$hrColor : "black"};
    }

    ${props => props.$mdShow && css`
        display: none;

        @media screen and (max-width: 746px){
            display: block;
            
        }
    `}
`

const StyledSwitchBtn = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    
    img{
        width: ${props => props.$imgSize ? props.$imgSize : "30px"};
        transition: all 0.3s ease-out;
        ${props => props.$isTurnOn && css`
            transform: rotate(180deg);
        `}
    }
`
