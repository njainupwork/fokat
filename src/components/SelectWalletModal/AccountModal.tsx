import React from "react"
import { Button, Text, Flex, LinkExternal } from "@kenjiwb/uikit"
// import {Button2} from '../Button2'
import { Modal } from "../Modal"
import CopyToClipboard from "./CopyToClipboard"
import { connectorLocalStorageKey } from "./config"
import { useTranslation } from "contexts/Localization"

interface Props {
  account: string
  logout: () => void
  onDismiss?: () => void
}

const AccountModal: React.FC<Props> = ({
  account,
  logout,
  onDismiss = () => null,
}: Props) => {
  const { t } = useTranslation()
  return (
    <Modal title={t("Your wallet")} onDismiss={onDismiss}>
      <Text
        fontSize="20px"
        bold
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          marginBottom: "8px",
        }}
      >
        {account}
      </Text>
      <Flex mb="32px">
        <LinkExternal
          small
          href={`https://bscscan.com/address/${account}`}
          mr="16px"
        >
          {t("View on")} BscScan
        </LinkExternal>
        <CopyToClipboard toCopy={account}>{t("Copy Address")}</CopyToClipboard>
      </Flex>
      <Flex justifyContent="center">
        <Button
          scale="sm"
          variant="secondary"
          onClick={() => {
            logout()
            window.localStorage.removeItem(connectorLocalStorageKey)
            onDismiss()
          }}
        >
          {t("Logout")}
        </Button>
      </Flex>
    </Modal>
  )
}

export default AccountModal
