
import { NavLink } from "react-router"
import styled from "styled-components"
import DefaultLayout from "../../components/layout/defaultLayout"
import AdSection from "../../components/FrontComponents/AdSection"
import ProductSection from "../../components/FrontComponents/ProductSection"

const ShopPage = () => {
    return (
        <DefaultLayout>
            <Wrapper>
                <StyledShopPage>    
                    <AdSection/>
                    <ProductSection/>
                </StyledShopPage>
            </Wrapper>
        </DefaultLayout>
    )
}

export default ShopPage

const StyledNav = styled.nav`
    a {
        color: #ffdd84;
        margin: 0px 16px;
    }
`
const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 16px;
    background-color: #c68642b2;
`

const StyledShopPage = styled.main`
    animation: PageIn 1s both;

    @keyframes PageIn {
        0%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }
`

