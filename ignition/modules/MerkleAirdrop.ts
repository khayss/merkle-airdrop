import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { OWNER, MERKLE_ROOT, TOKEN_ADDRESS } from "../../configs/config";

const MerkleAirdropModule = buildModule("MerkleAirdropModule", (m) => {
  const merkleAirdrop = m.contract(
    "MerkleAirdrop",
    [OWNER, TOKEN_ADDRESS, MERKLE_ROOT],
    {}
  );

  return { merkleAirdrop };
});

export default MerkleAirdropModule;
