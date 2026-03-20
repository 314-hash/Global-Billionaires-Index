¬#import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // 1. Deploy CannaGovToken
    console.log("Deploying CannaGovToken...");
    const CannaGovToken = await ethers.getContractFactory("CannaGovToken");
    const cannaGovToken = await CannaGovToken.deploy();
    await cannaGovToken.waitForDeployment();
    const cannaGovTokenAddress = await cannaGovToken.getAddress();
    console.log(`CannaGovToken deployed to: ${cannaGovTokenAddress}`);

    // 2. Deploy CannaToken
    console.log("Deploying CannaToken...");
    const CannaToken = await ethers.getContractFactory("CannaToken");
    // Constructor takes initialOwner. We use the deployer.
    const cannaToken = await CannaToken.deploy(deployer.address);
    await cannaToken.waitForDeployment();
    const cannaTokenAddress = await cannaToken.getAddress();
    console.log(`CannaToken deployed to: ${cannaTokenAddress}`);

    // 3. Deploy CannaStaking
    console.log("Deploying CannaStaking...");
    const CannaStaking = await ethers.getContractFactory("CannaStaking");
    // Constructor takes (tokenAddress, initialOwner).
    // We assume staking uses CannaToken.
    const cannaStaking = await CannaStaking.deploy(cannaTokenAddress, deployer.address);
    await cannaStaking.waitForDeployment();
    const cannaStakingAddress = await cannaStaking.getAddress();
    console.log(`CannaStaking deployed to: ${cannaStakingAddress}`);

    // 4. Deploy BadgeSBTFacet
    console.log("Deploying BadgeSBTFacet...");
    const BadgeSBTFacet = await ethers.getContractFactory("BadgeSBTFacet");
    const badgeSBTFacet = await BadgeSBTFacet.deploy();
    await badgeSBTFacet.waitForDeployment();
    const badgeSBTFacetAddress = await badgeSBTFacet.getAddress();
    console.log(`BadgeSBTFacet deployed to: ${badgeSBTFacetAddress}`);

    // 5. Deploy ConsensusAdapter
    console.log("Deploying ConsensusAdapter...");
    const ConsensusAdapter = await ethers.getContractFactory("ConsensusAdapter");
    // Constructor: (initialOwner, stakingAddress, sbtAddress, daoAddress)
    const consensusAdapter = await ConsensusAdapter.deploy(
        deployer.address,
        cannaStakingAddress,
        badgeSBTFacetAddress,
        cannaGovTokenAddress
    );
    await consensusAdapter.waitForDeployment();
    const consensusAdapterAddress = await consensusAdapter.getAddress();
    console.log(`ConsensusAdapter deployed to: ${consensusAdapterAddress}`);

    // 6. Deploy ConsensusCoordinatorFacet
    console.log("Deploying ConsensusCoordinatorFacet...");
    const ConsensusCoordinatorFacet = await ethers.getContractFactory("ConsensusCoordinatorFacet");
    // Constructor: (initialOwner, stakingAddr, sbtAddr, daoAddr)
    const consensusCoordinatorFacet = await ConsensusCoordinatorFacet.deploy(
        deployer.address,
        cannaStakingAddress,
        badgeSBTFacetAddress,
        cannaGovTokenAddress
    );
    await consensusCoordinatorFacet.waitForDeployment();
    const consensusCoordinatorFacetAddress = await consensusCoordinatorFacet.getAddress();
    console.log(`ConsensusCoordinatorFacet deployed to: ${consensusCoordinatorFacetAddress}`);

    // 7. Deploy WrappedCanna
    console.log("Deploying WrappedCanna...");
    const WrappedCanna = await ethers.getContractFactory("WrappedCanna");
    // Constructor: (cannaTokenAddress, initialOwner)
    const wrappedCanna = await WrappedCanna.deploy(
        cannaTokenAddress,
        deployer.address
    );
    await wrappedCanna.waitForDeployment();
    const wrappedCannaAddress = await wrappedCanna.getAddress();
    console.log(`WrappedCanna deployed to: ${wrappedCannaAddress}`);

    console.log("\nDeployment Summary:");
    console.log("-------------------");
    console.log(`CannaGovToken:             ${cannaGovTokenAddress}`);
    console.log(`CannaToken:                ${cannaTokenAddress}`);
    console.log(`CannaStaking:              ${cannaStakingAddress}`);
    console.log(`BadgeSBTFacet:             ${badgeSBTFacetAddress}`);
    console.log(`ConsensusAdapter:          ${consensusAdapterAddress}`);
    console.log(`ConsensusCoordinatorFacet: ${consensusCoordinatorFacetAddress}`);
    console.log(`WrappedCanna:              ${wrappedCannaAddress}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
¬#"(3750284766016bb5c0e9aa831d46f3a9e6f8ddb32Ffile:///c:/Users/Janus/cannatoken/cannatoken/scripts/deploy_all_bsc.ts:file:///c:/Users/Janus