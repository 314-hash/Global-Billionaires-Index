ýimport { ethers } from "hardhat";

async function main() {
    const [deployer, treasury] = await ethers.getSigners();
    // If treasury is not a separate account, use deployer or a specific address
    const treasuryAddress = treasury ? treasury.address : deployer.address;

    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Treasury address:", treasuryAddress);

    // 1. Deploy KMXToken
    const KMXToken = await ethers.getContractFactory("KMXToken");
    const kmxToken = await KMXToken.deploy(deployer.address);
    await kmxToken.waitForDeployment();
    console.log("KMXToken deployed to:", await kmxToken.getAddress());

    // 2. Deploy KMXNFT
    const KMXNFT = await ethers.getContractFactory("KMXNFT");
    const kmxNft = await KMXNFT.deploy(deployer.address);
    await kmxNft.waitForDeployment();
    const kmxNftAddress = await kmxNft.getAddress();
    console.log("KMXNFT deployed to:", kmxNftAddress);

    // 3. Deploy KMXFactory
    const KMXFactory = await ethers.getContractFactory("KMXFactory");
    const kmxFactory = await KMXFactory.deploy(kmxNftAddress);
    await kmxFactory.waitForDeployment();
    const kmxFactoryAddress = await kmxFactory.getAddress();
    console.log("KMXFactory deployed to:", kmxFactoryAddress);

    // 4. Deploy KMXBuyout
    const KMXBuyout = await ethers.getContractFactory("KMXBuyout");
    const kmxBuyout = await KMXBuyout.deploy(kmxNftAddress, treasuryAddress);
    await kmxBuyout.waitForDeployment();
    const kmxBuyoutAddress = await kmxBuyout.getAddress();
    console.log("KMXBuyout deployed to:", kmxBuyoutAddress);

    // 5. Deploy KMXVesting
    // Set release time to 30 days from now for demo purposes
    const releaseTime = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;
    const KMXVesting = await ethers.getContractFactory("KMXVesting");
    const kmxVesting = await KMXVesting.deploy(await kmxToken.getAddress(), releaseTime);
    await kmxVesting.waitForDeployment();
    console.log("KMXVesting deployed to:", await kmxVesting.getAddress());

    // 6. Deploy KMXGovernor
    const KMXGovernor = await ethers.getContractFactory("KMXGovernor");
    const kmxTokenAddress = await kmxToken.getAddress();
    const kmxGovernor = await KMXGovernor.deploy(kmxTokenAddress);
    await kmxGovernor.waitForDeployment();
    console.log("KMXGovernor deployed to:", await kmxGovernor.getAddress());

    // --- Post Deployment Setup ---
    console.log("Starting post-deployment setup...");

    const MINTER_ROLE = await kmxNft.MINTER_ROLE();
    const BUYOUT_ROLE = await kmxNft.BUYOUT_ROLE();

    // Grant MINTER_ROLE to KMXFactory
    console.log("Granting MINTER_ROLE to KMXFactory...");
    let tx = await kmxNft.grantRole(MINTER_ROLE, kmxFactoryAddress);
    await tx.wait();
    console.log("Granted MINTER_ROLE to KMXFactory");

    // Grant BUYOUT_ROLE to KMXBuyout
    console.log("Granting BUYOUT_ROLE to KMXBuyout...");
    tx = await kmxNft.grantRole(BUYOUT_ROLE, kmxBuyoutAddress);
    await tx.wait();
    console.log("Granted BUYOUT_ROLE to KMXBuyout");

    console.log("All contracts deployed and configured successfully!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
¹ *cascade08¹óó— *cascade08—¦*cascade08¦ý *cascade08"(451ef9bff17f1e842575f8a4116d19212b61d1a525file:///c:/Users/Janus/KMXToken/scripts/deploy_all.ts:file:///c:/Users/Janus