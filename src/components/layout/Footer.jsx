import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";
import styled from "styled-components";

const FollowUsitem = ({ children, iconUrl }) => {
  return (
    <StyledFollowUsitem $iconUrl={iconUrl}>
      <div />
      <h4>{children}</h4>
    </StyledFollowUsitem>
  );
};

const SocialMediaList = () => {
  return (
    <li>
      <StyledSocialMediaList>
        <StyledSocialMediaItem $iconUrl={"/img/instagram.svg"} />
        <StyledSocialMediaItem $iconUrl={"/img/facebook.svg"} />
        <StyledSocialMediaItem $iconUrl={"/img/twitter.svg"} />
      </StyledSocialMediaList>
    </li>
  );
};

const Footer = () => {
  const [showFollowUs, setFollowUs] = useState(false);
  const [showHelp, setHelp] = useState(false);
  const [showCompanyDes, setCompanyDes] = useState(false);
  const windowWidth = useRef(9999);

  const handleClike = (id) => {
    const handlers = {
      1: () => {setCompanyDes((prevShow) => !prevShow)},
      2: () => {setHelp((prevShow) => !prevShow)},
      3: () => {setFollowUs((prevShow) => !prevShow)},
    };

    if (window.innerWidth < 746) {
      handlers[id] && handlers[id]();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 746 && windowWidth.current >= 746) {
        setFollowUs(false);
        setHelp(false);
        setCompanyDes(false);
      }
      windowWidth.current = window.innerWidth;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <StledFooter>
      <Nav>
        <Navitem>
          <h3
            onClick={() => {
              handleClike(1);
            }}
          >
            comppany
          </h3>
          <StyledListHr />
          <StyledCompanyDes $show={showCompanyDes}>
            About Us: ChocoTech combines the sweetness of indulgence with
            cutting-edge technology. Established with a vision to bring
            innovative chocolate creations to life, we specialize in crafting
            everyday items entirely from high-quality, edible chocolate. From
            tech gadgets to household tools, ChocoTech transforms the ordinary
            into extraordinary, blending functionality with a touch of
            decadence.
            <br />
            <br />
            Mission: To revolutionize the way people experience chocolate by
            fusing it with modern technology and innovative design.
            <br />
            <br />
            Vision: To become the leading brand in chocolate craftsmanship,
            known for creating products that are as delightful to use as they
            are to taste.
          </StyledCompanyDes>
        </Navitem>
        <Navitem>
          <h3
            onClick={() => {
              handleClike(2);
            }}
          >
            help
          </h3>
          <StyledListHr />
          <StyledHelpList $show={showHelp}>
            <li>FAQ</li>
            <li>shipping</li>
            <li>payment</li>
          </StyledHelpList>
        </Navitem>
        <Navitem>
          <h3
            onClick={() => {
              handleClike(3);
            }}
          >
            follow us
          </h3>
          <StyledListHr />
          <StyledFollowUsList $show={showFollowUs}>
            <FollowUsitem iconUrl={"/img/apartment.svg"}>(05) 1234567</FollowUsitem>
            <FollowUsitem iconUrl={"/img/call.svg"}>(09) 1234567</FollowUsitem>
            <FollowUsitem iconUrl={"/img/mail.svg"}>user1234@mail.com</FollowUsitem>
            <SocialMediaList />
          </StyledFollowUsList>
        </Navitem>
      </Nav>
    </StledFooter>
  );
};

export default Footer;

const StledFooter = styled.footer`
  width: 100%;
  padding: 16px;
  background-color: #5a3616;
  color: #ffdd84;
`;

const Nav = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

  @media screen and (max-width: 746px) {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

const Navitem = styled.li`
  padding: 0px 16px;
  h3 {
    font-size: 36px;
    margin-bottom: 12px;
  }

  @media screen and (max-width: 746px) {
    h3 {
      font-size: 24px;
    }
  }
`;

const StyledListHr = styled.hr`
  display: none;
  margin-bottom: 16px;
  border-top: 2px dashed #ffdd84;

  @media screen and (max-width: 746px) {
    display: block;
  }
`;

const StyledCompanyDes = styled.p`
  @media screen and (max-width: 746px) {
    height: ${(props) => (props.$show ? "200" : "0")}px;
    overflow: scroll;
    transition: all 0.3s ease-out;
  }
`;

const StyledHelpList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  list-style-type: square;
  margin-left: 32px;

  @media screen and (max-width: 746px) {
    height: ${(props) => (props.$show ? "100" : "0")}px;
    overflow: hidden;
    transition: all 0.3s ease-out;
  }
`;

const StyledFollowUsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media screen and (max-width: 746px) {
    height: ${(props) => (props.$show ? "200" : "0")}px;
    overflow: hidden;
    transition: all 0.3s ease-out;
  }
`;

const StyledFollowUsitem = styled.li`
  display: flex;
  align-items: center;
  div {
    width: 40px;
    height: 40px;
    margin-right: 8px;
    background-image: url(${(props) => props.$iconUrl});
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: 40px;
  }
`;

const StyledSocialMediaList = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

const StyledSocialMediaItem = styled(NavLink)`
  width: 40px;
  height: 40px;
  background-image: url(${(props) => props.$iconUrl});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 40px;
`;
