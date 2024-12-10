import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";

const DefaultLayout = ({children}) => {
    return (
        <div>
            <Header/>
            <StyledClearfix/>
            {children}
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