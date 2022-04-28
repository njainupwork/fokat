import React from "react";
import { useModal } from "@kenjiwb/uikit";
import SelectModal from "./SelectWalletModal";
import AccountModal from "./AccountModal";
import { Login } from "./types";

interface ReturnType {
  onPresentWalletModal: () => void;
  onPresentAccountModal: () => void;
}

const useWalletModal = (
  login: Login,
  logout: () => void,
  account?: string
): ReturnType => {
  const [onPresentWalletModal] = useModal(<SelectModal login={login} />);
  const [onPresentAccountModal] = useModal(
    <AccountModal account={account || ""} logout={logout} />
  );
  return { onPresentWalletModal, onPresentAccountModal };
};

export default useWalletModal;
