import addresses from "config/constants/contracts"
import { Address } from "config/constants/types"

export const getAddress = (address: Address): string => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  return address[chainId] ? address[chainId] : address[56]
}

export const getBoardAddress = () => {
  return getAddress(addresses.board)
}

export const getNftAddress = () => {
  return getAddress(addresses.nft)
}

export const getMulticallAddress = () => {
  return getAddress(addresses.multiCall)
}
