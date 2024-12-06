import { NavLink } from "react-router"
import styled from "styled-components"

const ShopPage = () => {
    return (
        <div>
            <h3>ShopPage</h3>
            <StyledNav>
                <NavLink to="/account/login">Login</NavLink>
                <NavLink to="/checkout">chectout</NavLink>
                <NavLink to="/product/1">Product</NavLink>
            </StyledNav>
        </div>
    )
}

export default ShopPage

const StyledNav = styled.nav`
    a {
        margin: 0px 16px;
    }
`