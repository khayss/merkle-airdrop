import { MerkleTree } from "merkletreejs";
// import { createHash } from "node:crypto";
import path from "node:path";
import fs from "node:fs";
import { getEligibleList } from "./get-eligible-list";
import keccak256 from "keccak256";

const filePath = path.resolve(__dirname, "../data/eligible.csv");
const merkleOutputFilePath = path.resolve(__dirname, "../data/merkle.json");
const proofOutputFilePath = path.resolve(__dirname, "../data/proof.json");

getEligibleList(filePath).then((data) => {
  const leaves = data
    .sort((a, b) => a.localeCompare(b))
    .map((x) => keccak256(x));
  const tree = new MerkleTree(leaves, keccak256, { sort: true });
  const root = tree.getHexRoot();

  // update the argument in leaf with the `address` + `amount` to generate a proof.
  const leaf = keccak256("0xDaB8892C07FB4C362Dd99D9a2fBFf8B555D39Cb568");
  const proof = tree.getHexProof(leaf);

  const writeStream = fs.createWriteStream(merkleOutputFilePath);
  writeStream.write(`{"root": "${root}"}\n`);
  writeStream.close();

  const writeStreamProof = fs.createWriteStream(proofOutputFilePath);
  writeStreamProof.write(`{"proof": ${JSON.stringify(proof)}}\n`);
  writeStreamProof.close();
});
