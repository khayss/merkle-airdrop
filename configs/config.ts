import { vars } from "hardhat/config";
import data from "../data/merkle.json";

export const OWNER = "0xDaB8892C07FB4C362Dd99D9a2fBFf8B555D39Cb5";
export const MERKLE_ROOT = data.root;
export const TOKEN_ADDRESS = "0x8c662626Aa5944b4b8206837892cFD45E1117D86"; // Lisk Sepolia
export const MERKLE_AIRDROP_ADDRESS =
  "0xF70bC9DBF522f31159A1f54256590B2A1b1F88B6"; // Lisk Sepolia
export const PRIVATE_KEY = vars.get("PRIVATE_KEY");
export const ALCHEMY_API_KEY = vars.get("ALCHEMY_API_KEY");
export const ETHERSCAN_API_KEY = vars.get("ETHERSCAN_API_KEY");
