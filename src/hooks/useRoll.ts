import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { useBoardContract } from "./useContract";
import { checkGridInfos, rollDice, userInfo, userInfos } from "utils/callHelpers";

export const useDiceRoll = () => {
  const { account } = useWeb3React();
  const boardContract = useBoardContract();

  const handleRoll = useCallback(async () => {
    try {
      const txHash = await rollDice(boardContract, account);
      handleUserInfo();
      return txHash;
    } catch (e) {
      return false;
    }
  }, [account, boardContract]);

  const handleUserInfo = useCallback(async () => {
    try {
      const tx = await userInfo(boardContract, account);
      console.log("txHash_user", tx);
      return tx;
    } catch (e) {
      console.log('txHash_user_e', e, account)
      return false;
    }
  }, [account, boardContract]);
  
  
  const handleGetRewards = useCallback(async (gridPosition) => {
    try {
      const tx = await checkGridInfos(boardContract, account, gridPosition);
      // const user = await handleUserInfo();
      console.log("txHagetRewardsh_gridInfos", tx);


      return tx;
    } catch (e) {
      console.log('txHash_grid_info_e', e)
      return false;
    }
  }, [account, boardContract]);
  
  return { onDiceRoll: handleRoll, getPosition: handleUserInfo, getReward: handleGetRewards };
};
