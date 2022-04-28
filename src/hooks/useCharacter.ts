import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { useNftContract } from "./useContract";
import { getUserOwnedTokens } from "utils/callHelpers";

export const useCharacter = () => {
  const { account } = useWeb3React();
  const nftContract = useNftContract();

  const getUserNfts = useCallback(async () => {
    try {
        
        console.log("🚀 ~ file: useCharacter.ts ~ line 14 ~ getUserNfts ~ nftContract, account", nftContract, account)
        const info = await getUserOwnedTokens(nftContract, account);
        console.log("🚀 ~ file: useCharacter.ts ~ line 13 ~ getUserNfts ~ info", info)
        return info;
    } catch (e) {
      console.log("🚀 ~ file: useCharacter.ts ~ line 14 ~ getUserNfts ~ e", e);

      return false;
    }
  }, [account, nftContract]);
  const enterGame = useCallback(async (nftId) => {
    try {
        const info = await enterGame(nftContract, nftId);
        console.log("🚀 ~ file: useCharacter.ts ~ line 26 ~ enterGame ~ info", info)
        
        return info;
    } catch (e) {
    console.log("🚀 ~ file: useCharacter.ts ~ line 30 ~ enterGame ~ e", e)
      

      return false;
    }
  }, [account, nftContract]);

  return {getUserTokens: getUserNfts, enterGame: enterGame}
};
