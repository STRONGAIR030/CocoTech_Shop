import styled, {css} from "styled-components";
import { NavLink } from "react-router";
import { useContext } from "react";
import AppContext from "../common/AppContext";

const CheckOutHeader = () => {
    const {userInf} = useContext(AppContext);

    return (
        <StyledCheckOutHeader>
            <ShopLogo to="/"/>
            <Nav>
                <Navitem $xlShow>
                    <NavLink to={`/account/${userInf.isSignIn ? "orders": "login"}`}>Account</NavLink>
                </Navitem>
                <Navitem $mdShow>
                    <AccoutLink to={`/account/${userInf.isSignIn ? "orders": "login"}`}/>
                </Navitem>
            </Nav>
        </StyledCheckOutHeader>
    )
}

export default CheckOutHeader

const StyledCheckOutHeader = styled.header`
    width: 100%;
    height: 100px;
    padding: 0px 16px;
    background-color: #8D5524;
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 10;
    
    @media screen and (max-width: 746px){
        height: 80px;
    }
`

const Nav = styled.ul`
    display: flex;
`

const Navitem = styled.li`
    display: flex;
    align-items: center;
    padding: 0px 16px;
    a,button,input{
        background-color: #ffdd84;
        color: #a52a2a;
        border: none;
        border-radius: 100px;
        padding: 4px 8px;
        font-size: 14px;
        font-weight: 600;
    }
    ${props => !props.$xlShow && css`display: none;`}

    @media screen and (max-width: 748px) {
        height: 60px;
        padding: 4px 8px;
        ${props => !props.$mdShow ? css`display: none;` : css`display: flex;`}

        a{
            font-size:18px
        }

    }

    @media screen and (max-width: 540px) {
        height: 40px;
        padding: 0 4px;

        a{
        font-size:14px
        }

    }
`

const ShopLogo = styled(NavLink)`
    width: 200px;
    height: 80px;
    border-radius: 20px;
    background-image: url("/img/cocoTecj.png");
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: 200px;

    @media screen and (max-width: 746px){
        width: 150px;
        height: 60px;
        background-size: 150px;
    }
`

const AccoutLink = styled(NavLink)`
    width: 40px;
    height: 40px;
    padding: 0px;
    background-image: url("/img/user.svg");
    background-repeat: no-repeat;
    background-size: 40px;
    background-position: 50% 50%;

`


