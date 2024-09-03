import { vars } from "hardhat/config";
import data from "../data/merkle.json";

export const OWNER = "0xDaB8892C07FB4C362Dd99D9a2fBFf8B555D39Cb5";
export const MERKLE_ROOT = data.root;
export const TOKEN_ADDRESS = "0xb121094C33f8A2Daf68054499aD6681f4F216107";
export const MERKLE_AIRDROP_ADDRESS =
  "0x00fCb1a47BeA634E088C1BB510Fd47316F40c32D";
export const PRIVATE_KEY = vars.get("PRIVATE_KEY");
export const ALCHEMY_API_KEY = vars.get("ALCHEMY_API_KEY");
export const ETHERSCAN_API_KEY = vars.get("ETHERSCAN_API_KEY");
