import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import { getNewBoardAddress } from "utils/addressHelpers";

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
  const gridInfos = await board.methods.gridInfos(gridPosition).call();
  return gridInfos;
};
export const checkGridInfos = async (board, account, gridPosition) => {
  const gridInfos = await board.methods
    .checkGridInfo(account, gridPosition)
    .call();
  return gridInfos;
};

export const getUserOwnedTokens = async (nft, account) => {
  const userTokens = await nft.methods.getUserOwnedTokens(account).call();
  return userTokens;
};

export const approveNft = async (nft, account, nftId) => {
  const approved = await nft.methods
    .approve(getNewBoardAddress(), nftId)
    .send({ from: account })
    .on("transactionHash", (tx) => {
      return tx.transactionHash;
    });
  return approved;
};

export const isEntered = async (board, account) => {
  const entered = await board.methods.isEntered(account).call();
  return entered;
};
export const exitGame = async (board, account) => {
  return await board.methods
    .ExitGame()
    .send({ from: account })
    .on("transactionHash", (tx) => {
      return tx.transactionHash;
    });
};

export const enterGame = async (board, nftId, account) => {
  return await board.methods
    .EnterGame(nftId)
    .send({ from: account })
    .on("transactionHash", (tx) => {
      return tx.transactionHash;
    });
};
export const safeTransfer = async (nftContract, nftId, account, to) => {
  return await nftContract.methods
    .transferFrom(account, to, nftId)
    .send({ from: account })
    .on("transactionHash", (tx) => {
      return tx.transactionHash;
    });
};
