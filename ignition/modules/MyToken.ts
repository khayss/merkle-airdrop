import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { OWNER } from "../../configs/config";

const MyTokenModule = buildModule("MyTokenModule", (m) => {
  const myToken = m.contract("MyToken", [OWNER], {});

  return { myToken };
});

export default MyTokenModule;
