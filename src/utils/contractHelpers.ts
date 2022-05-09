import Web3 from "web3"
import { AbiItem } from "web3-utils"
import web3NoAccount from "utils/web3"
import BigNumber from "bignumber.js"

// Addresses
import { getBoardAddress, getNftAddress,getNewBoardAddress } from "utils/addressHelpers"

// ABI
import masterChef from "config/abi/masterchef.json"
import nft from "config/abi/nft.json"
import newBoard from "config/abi/new_board.json"
import bep20Abi from "config/abi/erc20.json"
import erc721Abi from "config/abi/erc721.json"
import erc1155Abi from "config/abi/erc1155.json"

import { BIG_TEN } from "./bigNumber"
import { getDecimalAmount } from "./formatBalance"
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18)
export const DEFAULT_GAS_LIMIT = 200000
export const DEFAULT_GAS_PRICE = 5
export const TESTNET_CHAIN_ID = "97"
export const MAINNET_CHAIN_ID = "56"

export const getGasPriceInWei = (amountInGwei: number) => {
  return getDecimalAmount(new BigNumber(amountInGwei), 9)
}

export const getDefaultGasPrice = () => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  if (chainId === TESTNET_CHAIN_ID) {
    return 10
  }
  return DEFAULT_GAS_PRICE
}

const getContract = (
  abi: any,
  address: string,
  web3?: Web3,
  account?: string
) => {
  const _web3 = web3 ?? web3NoAccount
  const gasPrice = getDefaultGasPrice()

  return new _web3.eth.Contract(abi as unknown as AbiItem, address, {
    gasPrice: getGasPriceInWei(gasPrice).toString(),
  })
}

export const getBep20Contract = (address: string, web3?: Web3) => {
  return getContract(bep20Abi, address, web3)
}
export const getErc721Contract = (address: string, web3?: Web3) => {
  return getContract(erc721Abi, address, web3)
}
export const getErc1155Contract = (address: string, web3?: Web3) => {
  return getContract(erc1155Abi, address, web3)
}
export const getBoardContract = (web3?: Web3) => {
  return getContract(masterChef, getBoardAddress(), web3)
}
export const getNftContract = (web3?: Web3) => {
  return getContract(nft, getNftAddress(), web3)
}
export const getNewBoardContract = (web3?: Web3) => {
  return getContract(newBoard, getNewBoardAddress(), web3)
}
