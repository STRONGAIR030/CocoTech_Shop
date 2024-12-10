import styled, {css} from "styled-components";
import { NavLink } from "react-router";
import { useEffect, useState , useRef} from "react";

const Header = () => {
    const [search, setSearch] = useState(false);
    const inputRef = useRef()
    useEffect(() => {
        if(search){
            inputRef.current.value="";
            inputRef.current.focus();
        }
    }, [search])
    return (
        <StyledHeader>
            <ShopLogo to="/"/>
            <Nav>
                <Navitem $xlShow >
                    <SearchInput placeholder="Search"/>
                </Navitem>
                <Navitem $mdShow>
                    <SearchBtn onClick={() =>{setSearch(true)}}/>
                </Navitem>
                <Navitem $xlShow>
                    <NavLink to="/account/login">Account</NavLink>
                </Navitem>
                <Navitem $mdShow>
                    <AccoutLink to="/account/login"/>
                </Navitem>
                <Navitem $xlShow $mdShow>
                    <button>1</button>
                </Navitem>
            </Nav>
            <JumpSearchInput placeholder="Search" ref={inputRef} onBlur={() => {setSearch(false)}}/>
        </StyledHeader>
    )
}

export default Header

const StyledHeader = styled.header`
    width: 100%;
    height: 100px;
    padding: 0px 16px;
    background-color: #8D5524;
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1;
    
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

const SearchInput = styled.input`
    background-color: #ffdd84;
    color: #a52a2a;
    width: 65px;
    transition: all 0.5s ease;

    &:focus{
        width: 240px;
    }

    &::placeholder{
        color: rgba(165, 42, 42, 0.5);
    }
`

const JumpSearchInput = styled.input`
    position: absolute;
    padding: 0px;
    border: 0px;
    bottom: -20px;
    left: 50%;
    border-radius: 100px;
    transform: translate(-50%, -50%);
    background-color: #ffdd84;
    color: #a52a2a;
    width: 0px;
    transition: all 0.5s ease;

    &:focus{
        padding: 4px 8px;
        width: 240px;
    }

    &::placeholder{
        color: rgba(165, 42, 42, 0.5);
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

const SearchBtn = styled(NavLink)`
    width: 40px;
    height: 40px;
    padding: 0px;
    background-image: url("/img/search.svg");
    background-repeat: no-repeat;
    background-size: 35px;
    background-position: 50% 50%;

`

