import React from "react"
import { Button } from "@kenjiwb/uikit"
import { Text } from "@kenjiwb/uikit"
import { connectorLocalStorageKey } from "./config"
import { Login, Config } from "./types"
import styled from "styled-components"

const StyledButton = styled(Button)`
  padding: 12px 16px;
  color: #fff;
  border: 1px solid rgb(46 51 72/1);
  background: rgba(0, 0, 0, 0.2);
  height: auto;
  > div {
    font-size: 0.875rem !important;
    cursor: pointer;
    color: #fff;
    font-weight: bold;
  }
  :hover {
    border-color: rgb(9 147 236 / 1);
    opacity: 1 !important;
  }

  svg {
    height: 32px;
    width: 32px;
  }
`

interface Props {
  walletConfig: Config
  login: Login
  onDismiss: () => void
  mb: string
}

const WalletCard: React.FC<Props> = ({
  login,
  walletConfig,
  onDismiss,
  mb,
}: Props) => {
  const { title, icon: Icon } = walletConfig
  return (
    <StyledButton
      width="100%"
      variant="tertiary"
      onClick={() => {
        login(walletConfig.connectorId)
        window.localStorage.setItem(
          connectorLocalStorageKey,
          walletConfig.connectorId
        )
        onDismiss()
      }}
      style={{ justifyContent: "space-between" }}
      mb={mb}
      id={`wallet-connect-${title.toLocaleLowerCase()}`}
    >
      <Text color="#bfbfbf" mr="16px">
        {title}
      </Text>
      <Icon width="32px" />
    </StyledButton>
  )
}

export default WalletCard
