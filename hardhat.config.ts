import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import {
  ALCHEMY_API_KEY,
  ETHERSCAN_API_KEY,
  PRIVATE_KEY,
} from "./configs/config";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [PRIVATE_KEY],
    },
    lisk: {
      url: "",
      accounts: [PRIVATE_KEY],
    },
    liskSepolia: {
      accounts: [PRIVATE_KEY],
      url: "https://rpc.sepolia-api.lisk.com",
    },
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,

      "lisk-sepolia": "empty",
    },
    customChains: [
      {
        network: "lisk-sepolia",
        chainId: 4202,
        urls: {
          apiURL: "https://sepolia-blockscout.lisk.com/api",
          browserURL: "https://sepolia-blockscout.lisk.com",
        },
      },
    ],
  },
};

export default config;
