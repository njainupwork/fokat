/* eslint-disable import/no-unresolved */
import { useEffect } from "react"
import { useWeb3React } from "@web3-react/core"
import { useSelector } from "react-redux"
import { useAppDispatch } from "state"
// import { getCreditNatureAddress, getLootboxAddress } from "utils/addressHelpers"
import { State } from "./types"
import fetchLootboxData from "./user/helpers"

// Fetch User Details
export const useUser = () => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  // const lootboxAddress = getLootboxAddress()
  // const creditNatureAddress = getCreditNatureAddress()
  const lootboxAddress = "0x00"
  const creditNatureAddress = "0x00"

  useEffect(() => {
    if (account) {
      dispatch(
        fetchLootboxData({ account, lootboxAddress, creditNatureAddress })
      )
    }
  }, [account, lootboxAddress, creditNatureAddress, dispatch])
}

export const userUserData = () => {
  return useSelector((state: State) => state.user)
}
