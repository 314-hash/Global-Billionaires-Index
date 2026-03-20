¯Gconst { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts on Optimism with the account:", deployer.address);
    
    // Check balance in ETH (Optimism uses ETH as gas token)
    const balance = await deployer.provider.getBalance(deployer.address);
    console.log("Account balance:", ethers.formatEther(balance), "ETH");
    
    // Ensure sufficient balance for deployment
    const minBalance = ethers.parseEther("0.01"); // Minimum 0.01 ETH
    if (balance < minBalance) {
        throw new Error("Insufficient balance for deployment. Minimum required: 0.01 ETH");
    }

    // Deploy BAYANID first (needed by other contracts)
    console.log("\n1. Deploying BAYANID...");
    const BAYANID = await ethers.getContractFactory("BAYANID");
    const bayanID = await BAYANID.deploy();
    await bayanID.deployed();
    console.log("BAYANID deployed to:", bayanID.address);

    // Mint a BAYANID for the deployer (needed for BAYANToken deployment)
    console.log("\n2. Minting BAYANID for deployer...");
    const mintTx = await bayanID.mint(deployer.address);
    const receipt = await mintTx.wait();
    const tokenId = receipt.events[0].args.tokenId;
    console.log("BAYANID minted with token ID:", tokenId.toString());

    // Deploy BAYANToken
    console.log("\n3. Deploying BAYANToken...");
    // For Optimism, you can use the Optimism forwarder or set to AddressZero if not using meta-transactions
    const trustedForwarder = "0x4200000000000000000000000000000000000000"; // Optimism cross-domain messenger
    const BAYANToken = await ethers.getContractFactory("BAYANToken");
    const bayanToken = await BAYANToken.deploy(
        deployer.address, // recipient
        trustedForwarder, // trusted forwarder
        bayanID.address // BAYANID contract
    );
    await bayanToken.deployed();
    console.log("BAYANToken deployed to:", bayanToken.address);

    // Deploy BAYANAccess
    console.log("\n4. Deploying BAYANAccess...");
    const BAYANAccess = await ethers.getContractFactory("BAYANAccess");
    const bayanAccess = await BAYANAccess.deploy(
        bayanToken.address,
        bayanID.address
    );
    await bayanAccess.deployed();
    console.log("BAYANAccess deployed to:", bayanAccess.address);

    // Deploy BAYANGovernance
    console.log("\n5. Deploying BAYANGovernance...");
    const BAYANGovernance = await ethers.getContractFactory("BAYANGovernance");
    const bayanGovernance = await BAYANGovernance.deploy(bayanToken.address);
    await bayanGovernance.deployed();
    console.log("BAYANGovernance deployed to:", bayanGovernance.address);

    // Deploy BAYANRewards
    console.log("\n6. Deploying BAYANRewards...");
    const BAYANRewards = await ethers.getContractFactory("BAYANRewards");
    const bayanRewards = await BAYANRewards.deploy(
        bayanToken.address,
        bayanID.address
    );
    await bayanRewards.deployed();
    console.log("BAYANRewards deployed to:", bayanRewards.address);

    // Deploy BAYANTreasury
    console.log("\n7. Deploying BAYANTreasury...");
    const BAYANTreasury = await ethers.getContractFactory("BAYANTreasury");
    const bayanTreasury = await BAYANTreasury.deploy(
        bayanToken.address,
        bayanGovernance.address
    );
    await bayanTreasury.deployed();
    console.log("BAYANTreasury deployed to:", bayanTreasury.address);

    // Deploy BAYANTreasuryExecutor
    console.log("\n8. Deploying BAYANTreasuryExecutor...");
    const BAYANTreasuryExecutor = await ethers.getContractFactory("BAYANTreasuryExecutor");
    const bayanTreasuryExecutor = await BAYANTreasuryExecutor.deploy(
        bayanGovernance.address,
        bayanTreasury.address,
        deployer.address // executor
    );
    await bayanTreasuryExecutor.deployed();
    console.log("BAYANTreasuryExecutor deployed to:", bayanTreasuryExecutor.address);

    // Setup trusted contracts for BAYANToken
    console.log("\n9. Setting up trusted contracts...");
    await bayanToken.setTrustedContract(bayanAccess.address, true);
    await bayanToken.setTrustedContract(bayanGovernance.address, true);
    await bayanToken.setTrustedContract(bayanRewards.address, true);
    await bayanToken.setTrustedContract(bayanTreasury.address, true);
    await bayanToken.setTrustedContract(bayanTreasuryExecutor.address, true);
    console.log("Trusted contracts configured");

    // Setup trusted contracts for BAYANAccess
    console.log("\n10. Setting up BAYANAccess trusted contracts...");
    await bayanAccess.setTrustedContract(bayanGovernance.address, true);
    await bayanAccess.setTrustedContract(bayanRewards.address, true);
    await bayanAccess.setTrustedContract(bayanTreasury.address, true);
    await bayanAccess.setTrustedContract(bayanTreasuryExecutor.address, true);
    console.log("BAYANAccess trusted contracts configured");

    // Transfer some tokens to Treasury for governance operations
    console.log("\n11. Funding Treasury...");
    const treasuryFunding = ethers.utils.parseEther("10000000"); // 10M tokens
    await bayanToken.transfer(bayanTreasury.address, treasuryFunding);
    console.log("Treasury funded with 10M tokens");

    // Create a sample governance proposal
    console.log("\n12. Creating sample governance proposal...");
    const proposalTx = await bayanGovernance.createProposal(
        "Initial treasury setup and funding allocation",
        1000 // 1000 blocks voting period
    );
    const proposalReceipt = await proposalTx.wait();
    const proposalEvent = proposalReceipt.events.find(e => e.event === "ProposalCreated");
    const proposalId = proposalEvent ? proposalEvent.args.proposalId : 1;
    console.log("Sample governance proposal created with ID:", proposalId.toString());

    // Display deployment summary
    console.log("\n" + "=".repeat(50));
    console.log("OPTIMISM DEPLOYMENT SUMMARY");
    console.log("=".repeat(50));
    console.log("BAYANID:", bayanID.address);
    console.log("BAYANToken:", bayanToken.address);
    console.log("BAYANAccess:", bayanAccess.address);
    console.log("BAYANGovernance:", bayanGovernance.address);
    console.log("BAYANRewards:", bayanRewards.address);
    console.log("BAYANTreasury:", bayanTreasury.address);
    console.log("BAYANTreasuryExecutor:", bayanTreasuryExecutor.address);
    console.log("Deployer:", deployer.address);
    console.log("Total Supply:", ethers.utils.formatEther(await bayanToken.totalSupply()), "BAYAN");
    console.log("Deployer Balance:", ethers.utils.formatEther(await bayanToken.balanceOf(deployer.address)), "BAYAN");
    console.log("Treasury Balance:", ethers.utils.formatEther(await bayanToken.balanceOf(bayanTreasury.address)), "BAYAN");
    console.log("Gas Price:", ethers.utils.formatUnits(await deployer.provider.getGasPrice(), "gwei"), "gwei");
    console.log("Network:", await deployer.provider.getNetwork());
    console.log("=".repeat(50));

    // Save deployment addresses to file
    const deploymentInfo = {
        network: network.name,
        chainId: (await deployer.provider.getNetwork()).chainId,
        deployer: deployer.address,
        gasPrice: ethers.utils.formatUnits(await deployer.provider.getGasPrice(), "gwei"),
        trustedForwarder: trustedForwarder,
        contracts: {
            BAYANID: bayanID.address,
            BAYANToken: bayanToken.address,
            BAYANAccess: bayanAccess.address,
            BAYANGovernance: bayanGovernance.address,
            BAYANRewards: bayanRewards.address,
            BAYANTreasury: bayanTreasury.address,
            BAYANTreasuryExecutor: bayanTreasuryExecutor.address
        },
        deployedAt: new Date().toISOString()
    };

    // Ensure deployments directory exists
    const fs = require("fs");
    if (!fs.existsSync("deployments")) {
        fs.mkdirSync("deployments");
    }

    fs.writeFileSync(
        `deployments/${network.name}.json`,
        JSON.stringify(deploymentInfo, null, 2)
    );
    console.log(`\nDeployment info saved to deployments/${network.name}.json`);

    // Optimism specific: Log block explorer URL
    if (network.name === "optimism" || network.name === "optimismMainnet") {
        console.log("\nOptimism Block Explorer URLs:");
        console.log(`BAYANID: https://optimistic.etherscan.io/address/${bayanID.address}`);
        console.log(`BAYANToken: https://optimistic.etherscan.io/address/${bayanToken.address}`);
        console.log(`BAYANAccess: https://optimistic.etherscan.io/address/${bayanAccess.address}`);
        console.log(`BAYANGovernance: https://optimistic.etherscan.io/address/${bayanGovernance.address}`);
        console.log(`BAYANRewards: https://optimistic.etherscan.io/address/${bayanRewards.address}`);
        console.log(`BAYANTreasury: https://optimistic.etherscan.io/address/${bayanTreasury.address}`);
        console.log(`BAYANTreasuryExecutor: https://optimistic.etherscan.io/address/${bayanTreasuryExecutor.address}`);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });¯G"(e1beb97b220d053a86f2a99c54b0dee72d22ff9a25file:///c:/Users/Janus/BayanLedger/deploy-optimism.js:"file:///c:/Users/Janus/BayanLedger