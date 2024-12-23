import React, { useState } from "react";
import styled from "styled-components";
import StyledImgContainer from "../common/StyledImgContainer";
import { NavLink } from "react-router";

const AdminSiderBar = ({showSiderBar, children}) => {

  return (
    <>
      <SidebarContainer $isOpen={showSiderBar}>
        <Nav>
            <Navitem>
                <NavLink to="/admin/home">
                    <StyledImgContainer $imgUrl="/img/home.svg" >
                        <div/>
                    </StyledImgContainer>
                    Home
                </NavLink>
            </Navitem>
            <Navitem>
                <NavLink to="/admin/orders">
                    <StyledImgContainer $imgUrl="/img/cart.svg" >
                        <div/>
                    </StyledImgContainer>
                    Orders
                </NavLink>
            </Navitem>
            <Navitem>
                <NavLink to="/admin/customers">
                    <StyledImgContainer  $imgUrl="/img/customer.svg" >
                        <div/>
                    </StyledImgContainer>
                    Customers
                </NavLink>
            </Navitem>
            <Navitem>
                <NavLink to="/admin/products">
                    <StyledImgContainer  $imgUrl="/img/products.svg" >
                        <div/>
                    </StyledImgContainer>
                    Products
                </NavLink>
            </Navitem>
        </Nav>

      </SidebarContainer>
      <Content>
        {children}
      </Content>
    </>
  );
};


export default AdminSiderBar

const SidebarContainer = styled.div`
  width: 180px;
  height: 100vh;
  background-color: #8D5524;
  color: white;
  overflow-x: hidden;
  transition: width 0.3s ease;

  @media screen and (max-width: 746px) {
    width: ${props => props.$isOpen ? "180" : "0"}px;
  }
`;

const Content = styled.div`
  flex: 1;
  transition: margin-left 0.3s ease;
`;

const Nav = styled.ul`
    display: flex;
    flex-direction: column;
    a{
        display: block;
    }

    li:first-child{
        border: 2px solid black;
    }
`

const Navitem = styled.li`
    border-bottom: 2px solid black;
    border-right: 2px solid black;
    border-left: 2px solid black;

    display: flex;
    align-items: center;
    height: 80px;


    a{
        padding: 0px 8px;
        height: 100%;
        color: #ffdd84;
        display: flex;
        align-items: center;
        width: 100%;
        gap: 16px;
        font-size: 18px;
        font-weight: 600;
    }

    ${StyledImgContainer} {
            flex: 0 0 40px;
    }

`
