import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { MERKLE_ROOT } from "../configs/config";

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
    const proof = [
      "0x94d4b901cece446795de1bcccf20cd86b99c989717be9511a9a5ccb3dba148c2",
      "0x5731255f46c8ba83765b6f37c5e1421358a7db08dd5e6b584502c4da17212006",
      "0x3f257b3a477653f5a7e53181640d7a5ca5ef2dea94306cb7b16adc8877c575ce",
      "0x1093c33b872eb22dfd520569fed9647eacb9d92a41f6efbd098b113fd71aea74",
      "0x3532b7d13c26335080705114da8172def3169f115aad12b3500db48df5b508e9",
      "0xe742d7526d2aa27e0fd0013197db8940735c9a390933b0e456097c7bcd6542e8",
      "0x2f225a536b66acf10b6e9e0f4abf5b328767cbe5bda34664aafba3dc221fd72a",
      "0xb2e44c4a0477d1a80cc0d824b98d4f5f452f69afae86c9e3fc21f8c80386aa0d",
      "0xfe05cdd48f8ee41be4d67fa0b0163c64b3121605e631f3168c13c2e55eff27c8",
      "0x9a0a72283e75e4ec2910da5c6d3ddf680a8f3ae5ecc546bb340e44db843d1bef",
    ];

    const { owner, otherAccounts, token, merkleAirdrop } = await loadFixture(
      deployMerkleAirdrop
    );
    expect(await merkleAirdrop.getOwner()).to.equal(owner.address);
    expect(await merkleAirdrop.getToken()).to.equal(token);
    expect(
      await merkleAirdrop.verifyProof(
        proof,
        "0xDaB8892C07FB4C362Dd99D9a2fBFf8B555D39Cb5",
        68
      )
    ).to.equal(true);
  });
});
