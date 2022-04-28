import React from "react"
// import { Button } from "@kenjiwb/uikit";
import { Text, Button } from "@kenjiwb/uikit"
import { connectorLocalStorageKey } from "./config"
import { Login, Config } from "./types"

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
    <Button
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
    </Button>
  )
}

export default WalletCard
