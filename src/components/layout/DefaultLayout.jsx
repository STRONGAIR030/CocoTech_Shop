import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";

const DefaultLayout = ({children, wrapperColor}) => {
    return (
        <div>
            <Header/>
            <StyledClearfix/>
            <Wrapper $color={wrapperColor}>
                {children}
            </Wrapper>
            <Footer/>
        </div>
    )
}

export default DefaultLayout

const StyledClearfix = styled.div`
    height: 100px;
    @media screen and (max-width: 746px){
        height: 80px;
    }
`

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 16px;
    background-color: ${props => props.$color ? props.$color : "#c68642b2"};
`
