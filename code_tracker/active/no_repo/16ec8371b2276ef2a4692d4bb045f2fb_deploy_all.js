¶Fconst hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const networkName = hre.network.name;
    console.log("Network:", networkName);

    // --- CONFIGURATION ---
    const ADMIN_ADDRESS = deployer.address;
    const START_TIME = Math.floor(Date.now() / 1000) + 60; // Start vesting 1 min from now
    const AIRDROP_CLAIM_AMOUNT = hre.ethers.parseEther("100"); // 100 MERG
    const INITIAL_REWARD_RATE = hre.ethers.parseEther("1"); // 1 MERG per block/second

    // LP Token Address: Set this if deploying to mainnet and you have a real LP token
    // If empty, a MockERC20 will be deployed
    let LP_TOKEN_ADDRESS = process.env.LP_TOKEN_ADDRESS || "";

    // 1. Deploy MergeToken
    console.log("\n1. Deploying MergeToken...");
    const MergeToken = await hre.ethers.getContractFactory("MERGToken");
    const mergeToken = await MergeToken.deploy(ADMIN_ADDRESS);
    await mergeToken.waitForDeployment();
    const mergeTokenAddress = await mergeToken.getAddress();
    console.log("MergeToken deployed to:", mergeTokenAddress);

    // 2. Deploy EntropyPool
    console.log("\n2. Deploying EntropyPool...");
    const EntropyPool = await hre.ethers.getContractFactory("EntropyPool");
    const entropyPool = await EntropyPool.deploy(ADMIN_ADDRESS);
    await entropyPool.waitForDeployment();
    const entropyPoolAddress = await entropyPool.getAddress();
    console.log("EntropyPool deployed to:", entropyPoolAddress);

    // 3. Deploy Verifier (Mock for now, as no real implementation provided)
    console.log("\n3. Deploying Verifier (MockQRHRPVerifier)...");
    const Verifier = await hre.ethers.getContractFactory("MockQRHRPVerifier");
    const verifier = await Verifier.deploy();
    await verifier.waitForDeployment();
    const verifierAddress = await verifier.getAddress();
    console.log("Verifier deployed to:", verifierAddress);

    // 4. Deploy MergeCoreManager
    console.log("\n4. Deploying MergeCoreManager...");
    const MergeCoreManager = await hre.ethers.getContractFactory("MergeCoreManager");
    const mergeCoreManager = await MergeCoreManager.deploy(
        ADMIN_ADDRESS,
        entropyPoolAddress,
        verifierAddress,
        mergeTokenAddress
    );
    await mergeCoreManager.waitForDeployment();
    const mergeCoreManagerAddress = await mergeCoreManager.getAddress();
    console.log("MergeCoreManager deployed to:", mergeCoreManagerAddress);

    // 5. Deploy TokenVesting
    console.log("\n5. Deploying TokenVesting...");
    const TokenVesting = await hre.ethers.getContractFactory("TokenVesting");
    const tokenVesting = await TokenVesting.deploy(
        mergeTokenAddress,
        START_TIME,
        ADMIN_ADDRESS
    );
    await tokenVesting.waitForDeployment();
    const tokenVestingAddress = await tokenVesting.getAddress();
    console.log("TokenVesting deployed to:", tokenVestingAddress);

    // 6. Deploy GovernanceSimple
    console.log("\n6. Deploying GovernanceSimple...");
    const GovernanceSimple = await hre.ethers.getContractFactory("GovernanceSimple");
    const governanceSimple = await GovernanceSimple.deploy(ADMIN_ADDRESS);
    await governanceSimple.waitForDeployment();
    const governanceSimpleAddress = await governanceSimple.getAddress();
    console.log("GovernanceSimple deployed to:", governanceSimpleAddress);

    // 7. Deploy MergAirdrop
    console.log("\n7. Deploying MergAirdrop...");
    const MergAirdrop = await hre.ethers.getContractFactory("MergAirdrop");
    const mergAirdrop = await MergAirdrop.deploy(
        mergeTokenAddress,
        AIRDROP_CLAIM_AMOUNT,
        ADMIN_ADDRESS
    );
    await mergAirdrop.waitForDeployment();
    const mergAirdropAddress = await mergAirdrop.getAddress();
    console.log("MergAirdrop deployed to:", mergAirdropAddress);

    // 8. Deploy MerkleBooster
    console.log("\n8. Deploying MerkleBooster...");
    const MerkleBooster = await hre.ethers.getContractFactory("MerkleBooster");
    const merkleBooster = await MerkleBooster.deploy(mergeTokenAddress, ADMIN_ADDRESS);
    await merkleBooster.waitForDeployment();
    const merkleBoosterAddress = await merkleBooster.getAddress();
    console.log("MerkleBooster deployed to:", merkleBoosterAddress);

    // 9. Deploy StakingPool (Staking MERG, Earning MERG)
    console.log("\n9. Deploying StakingPool (MERG -> MERG)...");
    const StakingPool = await hre.ethers.getContractFactory("StakingPool");
    const stakingPool = await StakingPool.deploy(
        mergeTokenAddress, // Staking Token
        mergeTokenAddress, // Reward Token
        ADMIN_ADDRESS,
        INITIAL_REWARD_RATE
    );
    await stakingPool.waitForDeployment();
    const stakingPoolAddress = await stakingPool.getAddress();
    console.log("StakingPool deployed to:", stakingPoolAddress);

    // 10. Handle LP Token
    if (!LP_TOKEN_ADDRESS || LP_TOKEN_ADDRESS === "") {
        console.log("\n10. Deploying Mock LP Token...");
        const MockERC20 = await hre.ethers.getContractFactory("MockERC20");
        const mockLP = await MockERC20.deploy("Mock LP", "mLP", hre.ethers.parseEther("1000000"));
        await mockLP.waitForDeployment();
        LP_TOKEN_ADDRESS = await mockLP.getAddress();
        console.log("Mock LP Token deployed to:", LP_TOKEN_ADDRESS);
    } else {
        console.log("\n10. Using existing LP Token:", LP_TOKEN_ADDRESS);
    }

    // 11. Deploy LPStaking (LP -> MERG)
    console.log("\n11. Deploying LPStaking (LP -> MERG)...");
    const LPStaking = await hre.ethers.getContractFactory("LPStaking");
    const lpStaking = await LPStaking.deploy(
        LP_TOKEN_ADDRESS, // Staking Token (LP)
        mergeTokenAddress, // Reward Token (MERG)
        INITIAL_REWARD_RATE,
        ADMIN_ADDRESS
    );
    await lpStaking.waitForDeployment();
    const lpStakingAddress = await lpStaking.getAddress();
    console.log("LPStaking deployed to:", lpStakingAddress);

    // 12. Deploy ResurrectionDeployer
    console.log("\n12. Deploying ResurrectionDeployer...");
    const ResurrectionDeployer = await hre.ethers.getContractFactory("ResurrectionDeployer");
    const resurrectionDeployer = await ResurrectionDeployer.deploy();
    await resurrectionDeployer.waitForDeployment();
    const resurrectionDeployerAddress = await resurrectionDeployer.getAddress();
    console.log("ResurrectionDeployer deployed to:", resurrectionDeployerAddress);

    console.log("\n--- Deployment Complete ---");

    // --- VERIFICATION ---
    if (networkName !== "hardhat" && networkName !== "localhost") {
        console.log("\nWaiting for block confirmations before verification...");
        await sleep(30000); // Wait 30s

        console.log("\n--- Starting Verification ---");

        await verify(mergeTokenAddress, [ADMIN_ADDRESS]);
        await verify(entropyPoolAddress, [ADMIN_ADDRESS]);
        await verify(verifierAddress, []);
        await verify(mergeCoreManagerAddress, [ADMIN_ADDRESS, entropyPoolAddress, verifierAddress, mergeTokenAddress]);
        await verify(tokenVestingAddress, [mergeTokenAddress, START_TIME, ADMIN_ADDRESS]);
        await verify(governanceSimpleAddress, [ADMIN_ADDRESS]);
        await verify(mergAirdropAddress, [mergeTokenAddress, AIRDROP_CLAIM_AMOUNT, ADMIN_ADDRESS]);
        await verify(merkleBoosterAddress, [mergeTokenAddress, ADMIN_ADDRESS]);
        await verify(stakingPoolAddress, [mergeTokenAddress, mergeTokenAddress, ADMIN_ADDRESS, INITIAL_REWARD_RATE]);

        // Only verify mock LP if we deployed it
        if (!process.env.LP_TOKEN_ADDRESS) {
            // Note: Verify function might fail if it's already verified or if source is same as other mocks
            await verify(LP_TOKEN_ADDRESS, ["Mock LP", "mLP", hre.ethers.parseEther("1000000")]);
        }

        await verify(lpStakingAddress, [LP_TOKEN_ADDRESS, mergeTokenAddress, INITIAL_REWARD_RATE, ADMIN_ADDRESS]);
        await verify(resurrectionDeployerAddress, []);
    } else {
        console.log("Skipping verification on local network.");
    }
}

async function verify(contractAddress, args) {
    console.log(`Verifying contract at ${contractAddress}...`);
    try {
        await hre.run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        });
        console.log("Verified!");
    } catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("Already verified!");
        } else {
            console.log("Verification failed:", error);
        }
    }
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
*cascade08 *cascade08*cascade08
 *cascade08
*cascade08 *cascade08 *cascade08*cascade08¶F *cascade0821file:///c:/Users/mergetoken/scripts/deploy_all.js