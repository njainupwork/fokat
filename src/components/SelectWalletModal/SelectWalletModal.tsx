import React from "react";
// import styled from "styled-components";
import { Modal as CustomModal } from "../Modal";
// import { Link } from "@kenjiwb/uikit";
import WalletCard from "./WalletCard";
import { useHistory } from "react-router-dom";
import config from "./config";
import { Login } from "./types";
import styled from "styled-components";

interface Props {
  login: Login;
  onDismiss?: () => void;
}

// const HelpLink = styled(Link)`
//   display: flex;
//   align-self: center;
//   align-items: center;
//   margin-top: 24px;
// `;

const Modal = styled(CustomModal)`
  @media (min-width: 1024px) {
     {
      max-width: 32rem;
    }
  }
  overflow-y: auto !important;
  width: 100%;
  padding: 16px;
  text-align: left;
  vertical-align: bottom;
  background-color: rgb(22 21 34/1);
  // border-color: rgb(32 34 49/1);
  border-width: 1px;
  border-radius: 0.75rem;
  overflow: hidden;
  width: 100%;
  display: inline-block;
  > :nth-child(1) {
    border-bottom: none;
    padding: 0;
    align-items: flex-start;
  }
  > :nth-child(2) {
    padding: 0;
    margin-top: 16px;
  }
  h2 {
    font-size: 16px;
  }
  button[aria-label="Close the dialog"] {
    height: auto;
    width: auto;

    svg {
      fill: #fff;
      height: 24px;
      width: 24px;
    }
  }
`;

const ModalBody = styled.div`
  overflow-y: auto;
  grid-gap: 1rem;
  gap: 1rem;
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  @media (min-width: 768px) {
     {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
`;

const ModalFooter = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
`;

const Text = styled.span`
  color: rgb(127 127 127/1);
  line-height: 1rem;
  font-weight: 500;
  font-size: 0.75rem;
`;

const LearnMoreText = styled.span`
  color: rgb(9 147 236/1) !important;
  line-height: 1rem;
  font-weight: 500;
  font-size: 0.75rem;
`;

const Link = styled.a`
  color: rgb(9 147 236/1) !important;

  text-decoration: none;
  cursor: pointer;
`;

const SelectWalletModal: React.FC<Props> = ({
  login,
  onDismiss = () => null,
}: Props) => {
  const history = useHistory();

  return (
    <Modal
      style={{ zIndex: "10000 !important" }}
      title="Select a wallet"
      onDismiss={onDismiss}
    >
      <ModalBody>
        {config.map((entry, index) => (
          <WalletCard
            key={entry.title}
            login={(e) => {
              login(e)
            }}
            walletConfig={entry}
            onDismiss={onDismiss}
            mb={index < config.length - 1 ? "8px" : "0"}
          />
        ))}
      </ModalBody>
      <ModalFooter>
        <Text>
          New to Ethereum?
          <LearnMoreText>
            <Link
              href="/wallets"
              onClick={() => {
                history.push("/wallets");
              }}
            >
              &nbsp;Learn more about wallets
            </Link>
          </LearnMoreText>
        </Text>
      </ModalFooter>
      {/* <HelpLink
      href="https://docs.pancakeswap.finance/get-started/connection-guide"
      external
    >
      <HelpIcon color="primary" mr="6px" />
      Learn how to connect
    </HelpLink> */}
    </Modal>
  );
};

export default SelectWalletModal;
