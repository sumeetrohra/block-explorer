import { ethers } from "ethers";

const url = process.env.REACT_APP_RINKEBY_URL;
const provider = new ethers.providers.JsonRpcProvider(url);

export default provider;
