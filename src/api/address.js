import { ethers } from "ethers";

export const getAddressData = async (providerUrl, address) => {
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  const balance = await provider.getBalance(address);
  const code = await provider.getCode(address);
  return { balance: parseInt(balance._hex, 16), hasCode: code !== "0x" };
};
