import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { MERKLE_ROOT } from "../configs/config";
import proof from "../data/proof.json";

describe("MerkleAirdrop", () => {
  const deployMerkleAirdrop = async () => {
    const [owner, otherAccounts] = await hre.ethers.getSigners();
    const Token = await hre.ethers.getContractFactory("MyToken");
    const MerkleAirdrop = await hre.ethers.getContractFactory("MerkleAirdrop");

    const token = await Token.deploy(owner.address);

    const merkleAirdrop = await MerkleAirdrop.deploy(
      owner.address,
      token,
      MERKLE_ROOT
    );

    return { owner, otherAccounts, token, merkleAirdrop };
  };

  it("should deploy", async () => {
    const { owner, otherAccounts, token, merkleAirdrop } = await loadFixture(
      deployMerkleAirdrop
    );
    expect(await merkleAirdrop.getOwner()).to.equal(owner.address);
    expect(await merkleAirdrop.getToken()).to.equal(token);
    expect(
      await merkleAirdrop.verifyProof(
        proof.proof,
        "0xDaB8892C07FB4C362Dd99D9a2fBFf8B555D39Cb5",
        68
      )
    ).to.equal(true);
  });
});
