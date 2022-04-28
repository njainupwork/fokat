import { useMemo } from "react"
import useWeb3 from "hooks/useWeb3"
import { getBoardContract, getNftContract } from "utils/contractHelpers"
import { Contract } from "@ethersproject/contracts"
import ERC20_ABI from "config/abi/erc20.json"
import { getMulticallAddress } from "utils/addressHelpers"
import useActiveWeb3React from "./useActiveWeb3React"
import multiCallAbi from "../config/abi/Multicall.json"
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers"
import { getAddress } from "@ethersproject/address"
import { AddressZero } from "@ethersproject/constants"

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

export function getSigner(
  library: Web3Provider,
  account: string
): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

export function getProviderOrSigner(
  library: Web3Provider,
  account?: string
): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library
}
export function getContract(
  address: string,
  ABI: any,
  library: Web3Provider,
  account?: string
): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(
    address,
    ABI,
    getProviderOrSigner(library, account) as any
  )
}

export const useBoardContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getBoardContract(web3), [web3])
}

export const useNftContract = () => {
  const web3 = useWeb3()
  return getNftContract(web3)
}

function useContract(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true
): Contract | null {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined
      )
      // return null
    } catch (error) {
      console.error("Failed to get contract", error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useTokenContract(
  tokenAddress?: string,
  withSignerIfPossible?: boolean
): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useMulticallContract(): Contract | null {
  return useContract(getMulticallAddress(), multiCallAbi, false)
}
