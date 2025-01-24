import styled, { css } from "styled-components";
import { NavLink, useNavigate } from "react-router";
import { useEffect, useState, useRef, useContext, useMemo } from "react";
import StyledImgContainer from "../common/StyledImgContainer";
import AdminContext from "../context/AdminContext";
import PropTypes from "prop-types";

const AdminHeader = ({ toggleShowSiderBar }) => {
    const { adminInf, adminSignOut } = useContext(AdminContext);

    return (
        <StyledHeader>
            <Nav>
                <Navitem $mdShow onClick={toggleShowSiderBar}>
                    <Listbutton>
                        <StyledImgContainer
                            $width="30px"
                            $imgUrl="/img/menu.svg"
                        >
                            <div />
                        </StyledImgContainer>
                    </Listbutton>
                </Navitem>
                <Navitem $mdShow $xlShow>
                    <NavLink to="/">
                        <ShopLogo $imgUrl="/img/cocoTecj.png">
                            <div />
                        </ShopLogo>
                    </NavLink>
                </Navitem>
            </Nav>

            <Nav>
                <Navitem $xlShow $mdShow>
                    <h3>{adminInf.name}</h3>
                </Navitem>
                <Navitem $xlShow onClick={adminSignOut}>
                    <LogoutIcon $imgUrl="/img/logout.svg">
                        <div />
                    </LogoutIcon>
                    <h3>LogOut</h3>
                </Navitem>
                <Navitem $mdShow onClick={adminSignOut}>
                    <LogoutIcon $imgUrl="/img/logout.svg">
                        <div />
                    </LogoutIcon>
                </Navitem>
            </Nav>
        </StyledHeader>
    );
};

AdminHeader.propTypes = {
    toggleShowSiderBar: PropTypes.func.isRequired,
};

export default AdminHeader;

const StyledHeader = styled.header`
    width: 100%;
    height: 60px;
    padding: 0px 16px;
    background-color: #8d5524;
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 10;

    @media screen and (max-width: 746px) {
        padding: 0px 8px;
        height: 50px;
    }

    @media screen and (max-width: 540px) {
        padding: 0px;
    }
`;

const Nav = styled.ul`
    display: flex;
`;

const Navitem = styled.li`
    display: flex;
    align-items: center;
    padding: 0px 16px;
    a,
    button,
    input {
        border: none;
        border-radius: 100px;
        font-size: 14px;
        font-weight: 600;
    }
    ${(props) =>
        !props.$xlShow &&
        css`
            display: none;
        `}

    @media screen and (max-width: 748px) {
        height: 60px;
        padding: 4px 8px;
        ${(props) =>
            !props.$mdShow
                ? css`
                      display: none;
                  `
                : css`
                      display: flex;
                  `}

        a {
            font-size: 18px;
        }
    }

    @media screen and (max-width: 540px) {
        height: 40px;
        padding: 0 4px;

        a {
            font-size: 14px;
        }
    }
`;

const ShopLogo = styled(StyledImgContainer)`
    width: 120px;
    border-radius: 20px;

    &::before {
        padding-top: 41%;
    }

    @media screen and (max-width: 748px) {
        width: 90px;
        border-radius: 15px;
    }
`;

const LogoutIcon = styled(StyledImgContainer)`
    width: 30px;
    margin-right: 8px;
`;

const Listbutton = styled.button``;
