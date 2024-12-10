
import { NavLink } from "react-router"
import styled from "styled-components"
import DefaultLayout from "../../components/layout/defaultLayout"
import AdSection from "../../components/ShopPage/AdSection"
import ProductSection from "../../components/ShopPage/ProductSection"

const ShopPage = () => {
    return (
        <DefaultLayout>
            <StyledShopPage>    
                <AdSection/>
                <ProductSection/>
            </StyledShopPage>
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
const StyledShopPage = styled.main`
    background-color: #c68642b2;
`

