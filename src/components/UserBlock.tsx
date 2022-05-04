import { useTranslation } from "contexts/Localization"
import React from "react"
import { Button } from "@kenjiwb/uikit"
import { useWalletModal } from "./SelectWalletModal"
import { Login } from "./WalletModal/types"

interface Props {
  account?: string
  login: Login
  logout: () => void
}

const UserBlock: React.FC<Props> = ({ account, login, logout }: Props) => {
  const { onPresentWalletModal, onPresentAccountModal } = useWalletModal(
    login,
    logout,
    account
  )
  const { t } = useTranslation()
  const accountEllipsis = account
    ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}`
    : null
  return (
    <div style={{ marginRight: "10px" }}>
      {account ? (
        <Button
          scale="sm"
          variant="primary"
          onClick={() => {
            onPresentAccountModal()
          }}
        >
          {accountEllipsis}
        </Button>
      ) : (
        <Button
        style={{background: '#2b7fa0'}}
          scale="sm"
          variant="primary"
          onClick={() => {
            onPresentWalletModal()
          }}
        >
          {t("Connect")}
        </Button>
      )}
    </div>
  )
}

export default React.memo(
  UserBlock,
  (prevProps, nextProps) => prevProps === nextProps
)
