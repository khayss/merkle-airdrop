import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("MyToken", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployMyToken() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const MyToken = await hre.ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy(owner, {});

    return { myToken, owner, otherAccount };
  }

  describe("MyToken", function () {
    it("Should set the right owner", async function () {
      const { myToken, owner } = await loadFixture(deployMyToken);

      expect(await myToken.owner()).to.equal(owner);
    });

    it("should have the right total supply", async function () {
      const { myToken } = await loadFixture(deployMyToken);

      expect(await myToken.totalSupply()).to.equal(1000000000000000000000000n);
    });
  });
});
