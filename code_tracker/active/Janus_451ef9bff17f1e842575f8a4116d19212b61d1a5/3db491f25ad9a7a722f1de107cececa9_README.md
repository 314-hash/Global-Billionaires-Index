ê# KMX Token Project

## Prerequisites
- Node.js
- NPM

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Compile contracts:
   ```bash
   npx hardhat compile
   ```

## Deployment
To deploy all contracts to a network (e.g., localhost or mainnet):

1. Set up your `.env` file (optional for localhost, required for mainnet):
   ```
   PRIVATE_KEY=your_private_key
   ```

2. Run the deployment script:
   ```bash
   npx hardhat run scripts/deploy_all.ts --network <network_name>
   ```

   For local hardhat network (testing):
   ```bash
   npx hardhat run scripts/deploy_all.ts
   ```

## Contracts Overview
- **KMXToken**: ERC20 token with fixed supply.
- **KMXNFT**: ERC721 IP Registry with support for License assignments.
- **KMXFactory**: Helper to mint NFTs.
- **KMXBuyout**: Module to allow buyout of IP rights (pays Treasury).
- **KMXVesting**: Token vesting for team/advisors.
- **KMXGovernor**: Simple voting/governance contract.
ê*cascade08"(451ef9bff17f1e842575f8a4116d19212b61d1a52)file:///c:/Users/Janus/KMXToken/README.md:file:///c:/Users/Janus