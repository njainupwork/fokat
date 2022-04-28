import React from "react"
import { Button } from "@kenjiwb/uikit"
import { useWalletModal } from "./SelectWalletModal"
import useAuth from "hooks/useAuth"
import { useTranslation } from "contexts/Localization"

const UnlockButton = (props) => {
  const { login, logout } = useAuth()
  const { onPresentWalletModal } = useWalletModal(login, logout)
  const { t } = useTranslation()

  return (
    <Button onClick={onPresentWalletModal} {...props}>
      {t("Unlock Wallet")}
    </Button>
  )
}

export default UnlockButton
