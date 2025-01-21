import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";

const DefaultLayout = ({children, wrapperColor}) => {
    return (
        <StyledDefaultLayout>
            <Header/>
            <StyledClearfix/>
            <Wrapper $color={wrapperColor}>
                {children}
            </Wrapper>
            <Footer/>
        </StyledDefaultLayout>
    )
}

export default DefaultLayout

const StyledDefaultLayout = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`

const StyledClearfix = styled.div`
    height: 100px;
    @media screen and (max-width: 746px){
        height: 80px;
    }
`

const Wrapper = styled.div`
    flex: 1;
    width: 100%;
    height: 100%;
    padding: 16px;
    background-color: ${props => props.$color ? props.$color : "#c68642b2"};
`
