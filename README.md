## Merkle Airdrop Smart Contract
This is a smart contract that allows for the distribution of tokens to a list of addresses. The contract is designed to be used with the Merkle Airdrop CLI tool/script.

#### Setup and Run merkle.js Script

**Prerequisites**
- Node.js (v14 or later)
- yarn (v1.22 or later)
- Hardhat (for smart contract deployment)

**Installation**
1. Clone the repository
   ```bash
    git clone https://github.com/your-repo/merkle-airdrop.git
    cd merkle-airdrop
```
2. Install the dependencies
```bash
    yarn install
```

**Running the Script**

1. Create a `eligible.csv` file in the `data` directory with the list of addresses and their corresponding token amounts.
2. Run the script
```bash
    yarn merkle
```
3. The script will generate a `merkle.json` file in the `data` directory. This file contains the Merkle root and the list of addresses and token amounts.

#### Deploying the Merkle Airdrop Contract
**Prerequisites**

- Ensure you have set up environmental variables using the cli. Here's a guide on how to set up environmental variables using the CLI [link](https://hardhat.org/hardhat-runner/docs/guides/configuration-variables). All the required ENV are listed in the `.env.example` file.
- Ensure you have sufficient funds in the deployer account to deploy the contract.

**Deployment Steps**
1. Compile the smart contract
```bash
   yarn compile
```
2. Deploy the token contract
```bash
   npx hardhat ignition deploy ignition/modules/MyToken.ts --network <network>
```
3. Update the `configs/config.ts`  with the deployed token address.
4. Deploy the Merkle Airdrop contract
```bash
   npx hardhat ignition deploy ignition/modules/MerkleAirdrop.ts --network <network>
```
5. Update the `scripts/interaction.ts` file with the deployed Token and Merkle Airdrop contract address.

**How to Generate Proofs**
1. Update `merkle.ts` with the address and amount you wish to generate proof for.
2. Find the proof in the `data/proofs.json`.
3. Update the proof in the `scripts/interaction.ts` file.
4. Run the interaction script using the command below.
```bash
   yarn interaction
```