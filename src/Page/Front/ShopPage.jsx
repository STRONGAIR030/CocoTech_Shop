
import { NavLink } from "react-router"
import styled from "styled-components"
import DefaultLayout from "../../components/layout/defaultLayout"

const ShopPage = () => {
    return (
        <DefaultLayout>
            <StyleledShopPage>    
                <h3>ShopPage</h3>
                <StyledNav>
                    <NavLink to="/account/login">Login</NavLink>
                    <NavLink to="/checkout">chectout</NavLink>
                    <NavLink to="/product/1">Product</NavLink>
                </StyledNav>
            </StyleledShopPage>
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
const StyleledShopPage = styled.main`
    background-color: #c68642b2;
`