/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit"
import { UserState } from "../types"
import fetchLootboxData from "./helpers"

const initialState: UserState = {
  balance: 0,
  allowance: false,
}

export const Lootbox = createSlice({
  name: "lootbox",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Update lootbox with live data
    builder.addCase(fetchLootboxData.fulfilled, (state, action) => {
      const { balance, allowance } = action.payload
      state.balance = balance
      state.allowance = allowance
    })
  },
})

// Actions

export default Lootbox.reducer
