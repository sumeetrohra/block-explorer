import { ethers } from "ethers";

export const getLatestBlock = (providerUrl) => {
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  return provider.getBlockWithTransactions("latest");
};

export const getBlock = (providerUrl, blockNumber) => {
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  return provider.getBlockWithTransactions(Number(blockNumber));
};
