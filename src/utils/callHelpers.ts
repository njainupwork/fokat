import BigNumber from "bignumber.js";
import { ethers } from "ethers";

export const approve = async (lpContract, masterChefContract, account) => {
  return lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account });
};

export const approveERC1155 = async (
  lpContract,
  masterChefContract,
  account
) => {
  return lpContract.methods
    .setApprovalForAll(masterChefContract.options.address, true)
    .send({ from: account });
};

export const rollDice = async (board, account) => {
  return board.methods
    .rollDice()
    .send({ from: account })
    .on("transactionHash", (tx) => {
      return tx.transactionHash;
    });
};

export const userInfos = async (board, account) => {
  const userInfos = await board.methods.userInfos(account).call();
  return userInfos;
};
export const userInfo = async (board, account) => {
  const userInfos = await board.methods.userInfo(account).call();
  return userInfos;
};
export const gridInfos = async (board, gridPosition) => {
  console.log(
    "🚀 ~ file: callHelpers.ts ~ line 38 ~ gridInfos ~ gridPosition",
    gridPosition
  );
  const gridInfos = await board.methods.gridInfos(gridPosition).call();
  return gridInfos;
};

export const getUserOwnedTokens = async (nft, account) => {
  console.log(
    "🚀 ~ file: callHelpers.ts ~ line 45 ~ getUserOwnedTokens ~ getUserOwnedTokens",
    account
  );
  const userTokens = await nft.methods.getUserOwnedTokens(account).call();
  return userTokens;
};

export const enterGame = async (nft, nftId) => {
  const enterGame = await nft.methods
    .enterGame(nftId)
    .send()
    .on("transactionHash", (tx) => {
      console.log("🚀 ~ file: callHelpers.ts ~ line 60 ~ .on ~ tx", tx)
      return tx.transactionHash;
    });
  return enterGame;
};
