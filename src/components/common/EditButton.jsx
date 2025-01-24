import styled from "styled-components";
import StyledImgContainer from "./StyledImgContainer";
import PropTypes from "prop-types";

const EditButton = ({handleClick}) => {
    return (
        <StyledEditButton onClick={handleClick}>
            <StyledImgContainer $imgUrl="/img/orderEdit.svg">
                <div />
            </StyledImgContainer> 
        </StyledEditButton>
    )
}

EditButton.propTypes = {
    handleClick : PropTypes.func.isRequired,
}

export default EditButton

const StyledEditButton = styled.button`
    width: 40px;
    border-radius: 15px;
    padding: 8px;
    cursor: pointer;
`