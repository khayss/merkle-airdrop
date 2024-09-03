import { MerkleTree } from "merkletreejs";
// import { createHash } from "node:crypto";
import path from "node:path";
import fs from "node:fs";
import keccak256 from "keccak256";
import { abiCoder } from "../utils/abiCoder";
import data from "../data/eligible-packed.json";

const merkleOutputFilePath = path.resolve(__dirname, "../data/merkle.json");
const proofOutputFilePath = path.resolve(__dirname, "../data/proof.json");

const leaves = data
  .sort((a: string, b: string) => a.localeCompare(b))
  .map((x: string) => keccak256(x));
const tree = new MerkleTree(leaves, keccak256, { sort: true });
const root = tree.getHexRoot();

// update the argument in leaf with the `address` + `amount` to generate a proof.
const leaf = keccak256(
  abiCoder.encode(
    ["address", "uint256"],
    ["0xDaB8892C07FB4C362Dd99D9a2fBFf8B555D39Cb5", 68]
  )
);
const proof = tree.getHexProof(leaf);

const writeStream = fs.createWriteStream(merkleOutputFilePath);
writeStream.write(`{"root": "${root}"}\n`);
writeStream.close();

const writeStreamProof = fs.createWriteStream(proofOutputFilePath);
writeStreamProof.write(`{"proof": ${JSON.stringify(proof)}}\n`);
writeStreamProof.close();
