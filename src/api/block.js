import { ethers } from "ethers";

export const getLatestBlock = async (providerUrl) => {
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  const data = await provider.getBlockWithTransactions("latest");
  return data;
};

export const getBlock = async (providerUrl, blockNumber) => {
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  const data = await provider.getBlockWithTransactions(Number(blockNumber));
  return data;
};
