import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { useNftContract, useBoardContract } from "./useContract";
import { approveNft, enterGame, getUserOwnedTokens, isEntered } from "utils/callHelpers";

export const useCharacter = () => {
  const { account } = useWeb3React();
  const nftContract = useNftContract();
  const board = useBoardContract();

  const getUserNfts = useCallback(async () => {
    try {
      console.log(
        "🚀 ~ file: useCharacter.ts ~ line 14 ~ getUserNfts ~ nftContract, account",
        nftContract,
        account
      );
      const info = await getUserOwnedTokens(nftContract, account);
      console.log(
        "🚀 ~ file: useCharacter.ts ~ line 13 ~ getUserNfts ~ info",
        info
      );
      return info;
    } catch (e) {
      console.log("🚀 ~ file: useCharacter.ts ~ line 14 ~ getUserNfts ~ e", e);

      return false;
    }
  }, [account, nftContract]);
  const joinGame = useCallback(
    async (nftId) => {
      try {
        const info = await enterGame(board, nftId, account);
        console.log(
          "🚀 ~ file: useCharacter.ts ~ line 26 ~ enterGame ~ info",
          info
        );

        return info;
      } catch (e) {
        console.log("🚀 ~ file: useCharacter.ts ~ line 30 ~ enterGame ~ e", e);

        return false;
      }
    },
    [account, board]
  );

  const approve = useCallback(
    async (nftId) => {
      try {
        const info = await approveNft(nftContract, account, nftId);
        console.log(
          "🚀 ~ file: useCharacter.ts ~ line 40 ~ approveNFT ~ info",
          info
        );

        return info;
      } catch (e) {
        console.log("🚀 ~ file: useCharacter.ts ~ line 44 ~ approveNFT ~ e", e);

        return false;
      }
    },
    [account, nftContract]
  );
  const entered = useCallback(
    async () => {
      try {
        const info = await isEntered(board, account);
        console.log("🚀 ~ file: useCharacter.ts ~ line 71 ~ isEntered", info)
        return info;
      } catch (e) {
        console.log("🚀 ~ file: useCharacter.ts ~ line 44 ~ approveNFT ~ e", e);

        return false;
      }
    },
    [account, board]
  );

  return {
    getUserTokens: getUserNfts,
    enterGame: joinGame,
    approveNFT: approve,
    isEntered: entered,
  };
};
