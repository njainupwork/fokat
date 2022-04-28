import { createAsyncThunk } from "@reduxjs/toolkit"
import erc1155ABI from "config/abi/erc1155.json"
import multicall from "utils/multicall"

const fetchLootboxData = createAsyncThunk<
  { balance: number; allowance: boolean },
  { account: string; lootboxAddress: string; creditNatureAddress: string }
>(
  "lootbox/fetchUserData",
  async ({ account, lootboxAddress, creditNatureAddress }) => {
    const userCalls = [
      {
        address: creditNatureAddress,
        name: "isApprovedForAll",
        params: [account, lootboxAddress],
      },
      {
        address: creditNatureAddress,
        name: "balanceOf",
        params: [account, 0],
      },
    ]
    const userData = await multicall(erc1155ABI, userCalls)

    return {
      allowance: userData[0][0],
      balance: parseInt(userData[1].toString()),
    }
  }
)

export default fetchLootboxData
