/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { LangSelector } from "@kenjiwb/uikit";
import styled from "styled-components";
import { MenuOutlined } from "@ant-design/icons";

//account details
import { useWeb3React } from "@web3-react/core";
import useAuth from "hooks/useAuth";

import UserBlock from "components/UserBlock";
import { languageList } from "config/localization/languages";
import { useTranslation } from "contexts/Localization";
import Swap from "../../assets/swap.svg";
import Marketplace from "../../assets/marketplace.svg";

const NavbarContainer = styled.div`
  .ui.menu {
    &.secondary {
      border-bottom: 1px solid rgba(34, 36, 38, 0.15);
      -webkit-box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
      box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
    }
  }
  background-color: #0d0415;
  padding: 0 1rem;
  position: relative;
  border-bottom: thin solid rgba(155, 155, 155, 0.3);
  // border-color: rgb(155, 155, 155);
  border-opacity: 1;
  // border-bottom: 1px;
`;

const Logo = styled.img`
  height: 6em;
  width: 8em !important;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-right: 1rem;
`;

const List = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 5px;
`;

const MenuBar = styled.div`
  position: relative;
  @media (min-width: 768px) {
    display: none;
  }
  &:hover {
    > div {
      display: block;
    }
  }
`;

const MenuOptionContainter = styled.div`
  background: rgb(32, 34, 49);
  text-align: center;
  position: absolute;
  color: white;
  z-index: 999;
  display: none;
  right: 10px;
  top: 30px;
  border-radius: 10px;
  padding: 20px 5px;
`;

const MenuContainter = styled.div`
  text-align: center;
  color: white;
  border-radius: 10px;
  padding: 20px 5px;
  display: flex;
  @media (max-width: 769px) {
    display: none;
  }
`;

const Token = styled.div`
  padding: 5px;
  border-radius: 5px;
  width: 150px;
  column-gap: 5px;
  color: #1fc7d4;
  display: flex;
  justify-content: center;
  columngap: 5px;
`;
const TextEllipsis = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
`;

const StyledLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 12px;
`;

const NavBar = () => {
  const { currentLanguage, setLanguage } = useTranslation();
  const { account } = useWeb3React();
  const { login, logout } = useAuth();

  return (
    <NavbarContainer>
      <Menu>
        <Logo src="/images/newMonopolonLogo.png" />
        <MenuContainter>
          <Token>
            <TextEllipsis>
              <img src={Swap} style={{ width: "15px", padding: "8px" }} />

              <StyledLink href="https://swap.monopolon.io">
                Swap MLON to MGM
              </StyledLink>
            </TextEllipsis>
          </Token>
          <Token>
            <TextEllipsis>
              <img
                src={Marketplace}
                style={{ width: "18px", padding: "5px" }}
              />

              <StyledLink href="https://marketplace.monopolon.io">
                Marketplace
              </StyledLink>
            </TextEllipsis>
          </Token>
        </MenuContainter>
        <List>
          <LangSelector
            color="white"
            position="bottom"
            currentLang={currentLanguage.code}
            langs={languageList}
            setLang={setLanguage}
            flagUrl={currentLanguage.flag}
          />

          <UserBlock account={account} login={login} logout={logout} />
          <MenuBar>
            <MenuOptionContainter>
              <Token>
                <TextEllipsis>
                  <StyledLink href="https://swap.monopolon.io">
                    Swap MLON to MGM
                  </StyledLink>
                </TextEllipsis>
              </Token>
              <Token>
                <TextEllipsis>
                  <StyledLink href="https://marketplace.monopolon.io">
                    MarketPlace
                  </StyledLink>
                </TextEllipsis>
              </Token>
            </MenuOptionContainter>
            <MenuOutlined style={{ fontSize: "150%" }} className="menuicon" />
          </MenuBar>
        </List>
      </Menu>
    </NavbarContainer>
  );
};

export default NavBar;
