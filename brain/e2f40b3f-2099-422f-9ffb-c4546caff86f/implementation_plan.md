# Implementation Plan - Optimize Deployment Script

The goal is to create a complete Hardhat deployment script to deploy all smart contracts in the `contracts/` directory to the Optimism network and verify them.

## User Review Required

> [!IMPORTANT]
> **Missing Dependencies**: The project lacks `package.json` and `hardhat.config.js`. I will initialize a standard Hardhat project structure.
>
> **LP Token for Staking**: `LPStaking.sol` requires an LP token address. I will deploy a `MockERC20` token to represent the LP token for the purpose of the script, unless a specific address is provided.
>
> **Environment Variables**: The script will rely on `.env` for `PRIVATE_KEY` and `OPTIMISM_ETHERSCAN_API_KEY`.

## Proposed Changes

### Configuration
#### [NEW] `package.json`
- Initialize with `npm init -y`
- Install dependencies: `hardhat`, `@nomicfoundation/hardhat-toolbox`, `dotenv`, `@openzeppelin/contracts`.

#### [NEW] `hardhat.config.js`
- Configure for Optimism Mainnet and Optimism Sepolia (for testing).
- Configure Etherscan for verification.

#### [NEW] `.env`
- Template for keys.

### Scripts
#### [NEW] `scripts/deploy_all.js`
- **Deployment Order**:
    1. `MergeToken`
    2. `EntropyPool`
    3. `MockQRHRPVerifier`
    4. `MergeCoreManager`
    5. `TokenVesting`
    6. `GovernanceSimple`
    7. `MergAirdrop`
    8. `MerkleBooster`
    9. `StakingPool` (Staking MERG, Earning MERG)
    10. `MockERC20` (as LP Token)
    11. `LPStaking` (Staking MockLP, Earning MERG)
    12. `ResurrectionDeployer`
- **Verification**:
    - Programmatic verification using `hardhat-etherscan` after deployment.
    - Includes `sleep` function to wait for block confirmations.

## Verification Plan

### Automated Tests
- Run `npx hardhat test` if tests exist (currently only basic ones).
- **Deployment Test**: Run `npx hardhat run scripts/deploy_all.js --network hardhat` to simulate deployment locally.

### Manual Verification
- Attempt to deploy to a testnet (e.g., Optimism Sepolia) if the user provides keys, otherwise dry-run locally.
