import styled from "styled-components";
import CheckOutHeader from "./CheckOutHeader";
import PropTypes from "prop-types";

const CheckOutLayout = ({ children }) => {
    return (
        <div>
            <CheckOutHeader />
            <StyledClearfix />
            <Wrapper>{children}</Wrapper>
        </div>
    );
};

CheckOutLayout.propTypes = {
    children: PropTypes.element,
};

export default CheckOutLayout;

const StyledClearfix = styled.div`
    height: 100px;
    @media screen and (max-width: 746px) {
        height: 80px;
    }
`;

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${(props) => (props.$color ? props.$color : "#c68642b2")};
`;
