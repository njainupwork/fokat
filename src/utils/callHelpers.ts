import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import { getBoardAddress } from "utils/addressHelpers"

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
export const checkGridInfos = async (board, account, gridPosition) => {
  console.log(
    "🚀 ~ file: callHelpers.ts ~ line 38 ~ gridInfos ~ gridPosition",
    gridPosition
  );
  const gridInfos = await board.methods.checkGridInfo(account,gridPosition).call();
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

export const approveNft = async (nft, account, nftId) => {
  console.log(
    "🚀 ~ file: callHelpers.ts ~ line 45 ~ getUserOwnedTokens ~ getUserOwnedTokens",
    account
  );
  const approved = await nft.methods
    .approve(getBoardAddress(), nftId)
    .send({ from: account })
    .on("transactionHash", (tx) => {
      console.log("🚀 ~ file: callHelpers.ts ~ line 64 ~ .on ~ tx", tx);
      return tx.transactionHash;
    });
  return approved;
};
export const enterGame = async (board, nftId, account) => {
  const enterGame = await board.methods
    .EnterGame(nftId)
    .send({ from: account })
    .on("transactionHash", (tx) => {
      console.log("🚀 ~ file: callHelpers.ts ~ line 60 ~ .on ~ tx", tx);
      return tx.transactionHash;
    });
  return enterGame;
};
