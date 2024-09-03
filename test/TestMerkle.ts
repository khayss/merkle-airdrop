import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import keccak256 from "keccak256";

describe("Merkle", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployMerkleFixture() {
    const Merkle = await hre.ethers.getContractFactory("TestMerkle");
    const merkle = await Merkle.deploy(
      "0x04acaaffeb0baeb707a4247b9e27734c5af34744b6e9e05c53198814cf8e6606"
    );

    return { merkle };
  }

  describe("Deployment", function () {
    it("Should deploy", async function () {
      const { merkle } = await loadFixture(deployMerkleFixture);

      expect(
        await merkle.verifyProof(
          [
            "0x0b42b6393c1f53060fe3ddbfcd7aadcca894465a5a438f69c87d790b2299b9b2",
            "0x9c50d01bed947904793eeee1bec5476eba556d9e87045c48d078a31d37826595",
          ],
          keccak256("a")
        )
      ).to.be.true;
    });
  });
});
