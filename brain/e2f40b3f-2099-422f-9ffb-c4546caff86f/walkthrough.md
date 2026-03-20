# Hardhat Deployment Walkthrough

I have successfully initialized the Hardhat environment, configured it for Optimism, and created a comprehensive deployment script for all your contracts.

## Key Deliverables

### 1. Configuration (`hardhat.config.js`)
- Configured for **Optimism Mainnet** and **Optimism Sepolia**.
- Integrated **Etherscan** verification.
- Downgraded to Hardhat v2 for stability and CommonJS support.
- **Action Required**: Rename `.env.example` to `.env` and fill in `PRIVATE_KEY` and `OPTIMISM_ETHERSCAN_API_KEY`.

### 2. Deployment Script (`scripts/deploy_all.js`)
- Deploys all 12 contracts in dependency order.
- Automatically verifies contracts on Etherscan (skips on local network).
- Includes logic to deploy a `MockERC20` LP token if `LP_TOKEN_ADDRESS` is not provided in `.env` (useful for testing).

### 3. Usage

#### Install Dependencies
```bash
npm install
```

#### Compile Contracts
```bash
npx hardhat compile
```

#### Run Deployment (Dry Run / Local)
```bash
npx hardhat run scripts/deploy_all.js
```

#### Run Deployment (Optimism Mainnet)
```bash
npx hardhat run scripts/deploy_all.js --network optimism
```

## Verification Results
I performed a dry-run deployment on the local Hardhat network. All contracts were deployed successfully.

```text
1. Deploying MergeToken...
MergeToken deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3

2. Deploying EntropyPool...
EntropyPool deployed to: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512

...

12. Deploying ResurrectionDeployer...
ResurrectionDeployer deployed to: 0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e

--- Deployment Complete ---
Skipping verification on local network.
```

## Fixes Performed
- **Restored `IQRHRPVerifier.sol`**: This interface file was missing and prevented compilation. I restored it.
- **Fixed OpenZeppelin Imports**: Updated imports in `LPStaking`, `MergeCoreManager`, `StakingPool`, and `MerkleBooster` to be compatible with OpenZeppelin v5 (`security/ReentrancyGuard.sol` -> `utils/ReentrancyGuard.sol`).
- **Fixed `GovernanceSimple.sol`**: Fixed a syntax error in struct instantiation.

## Follow-up: Documentation
In addition to the deployment script, I have generated a complete suite of project documentation in the `docs/` folder:

- [Pitch Deck (docs/Pitch_Deck.md)](file:///c:/Users/mergetoken/docs/Pitch_Deck.md): Investor presentation highlighting the quantum-resistant value proposition.
- [Whitepaper (docs/Whitepaper.md)](file:///c:/Users/mergetoken/docs/Whitepaper.md): Technical deep-dive into the architecture and contracts.
- [Tokenomics (docs/Tokenomics.md)](file:///c:/Users/mergetoken/docs/Tokenomics.md): 100M supply breakdown and vesting schedule.
- [One-Pager (docs/One_Pager.md)](file:///c:/Users/mergetoken/docs/One_Pager.md): Executive summary.
