import React, { useState } from "react";
import styled from "styled-components";

const SidebarContainer = styled.div`
  width: ${(props) => (props.isOpen ? "250px" : "0")};
  height: 100vh;
  background-color: #2c3e50;
  color: white;
  overflow-x: hidden;
  transition: width 0.3s ease;
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 20px;
  left: ${(props) => (props.isOpen ? "250px" : "0")};
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  transition: left 0.3s ease;
`;

const Content = styled.div`
  margin-left: ${(props) => (props.isOpen ? "250px" : "0")};
  transition: margin-left 0.3s ease;
  padding: 20px;
`;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SidebarContainer isOpen={isOpen}>
        <ul>
          <li><a href="#">首頁</a></li>
          <li><a href="#">關於我們</a></li>
          <li><a href="#">服務</a></li>
          <li><a href="#">聯絡我們</a></li>
        </ul>
      </SidebarContainer>
      <ToggleButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "←" : "☰"}
      </ToggleButton>
      <Content isOpen={isOpen}>
        <h1>主內容</h1>
        <p>這是主要內容區域。</p>
      </Content>
    </>
  );
};

export default Sidebar;
