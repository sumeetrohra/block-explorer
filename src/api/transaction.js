import { ethers } from "ethers";

export const getTransaction = async (providerUrl, txHash) => {
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  const data = await provider.getTransaction(txHash);
  return data;
};
