�import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("🚀 Deploying WrappedCannaV2 Ecosystem");
    console.log("=====================================");
    console.log("Deployer:", deployer.address);
    console.log("");

    // CannaTokenV2 address (already deployed)
    const cannaTokenV2Address = "0x9D673Cc32522854aFc2BB241b0070416762D6a91";
    console.log("📍 Using CannaTokenV2 at:", cannaTokenV2Address);

    // Deploy WrappedCannaV2
    console.log("\n1️⃣ Deploying WrappedCannaV2...");
    const WrappedCannaV2 = await ethers.getContractFactory("WrappedCannaV2");
    const wrappedCannaV2 = await WrappedCannaV2.deploy(
        cannaTokenV2Address,
        deployer.address
    );
    await wrappedCannaV2.waitForDeployment();
    const wrappedCannaV2Address = await wrappedCannaV2.getAddress();
    console.log("✅ WrappedCannaV2 deployed to:", wrappedCannaV2Address);

    // Set WrappedCannaV2 as operator on CannaTokenV2
    console.log("\n2️⃣ Setting WrappedCannaV2 as operator on CannaTokenV2...");
    const CannaTokenV2 = await ethers.getContractAt("CannaTokenV2", cannaTokenV2Address);
    const setOperatorTx = await CannaTokenV2.setOperator(wrappedCannaV2Address, true);
    await setOperatorTx.wait();
    console.log("✅ WrappedCannaV2 is now authorized as operator");

    // Verify operator status
    console.log("\n3️⃣ Verifying operator status...");
    const isOperator = await CannaTokenV2.isOperator(wrappedCannaV2Address);
    const isAuthorized = await wrappedCannaV2.isAuthorized();
    console.log("✅ CannaTokenV2 reports operator:", isOperator);
    console.log("✅ WrappedCannaV2 confirms authorized:", isAuthorized);

    // Display summary
    console.log("\n📊 DEPLOYMENT SUMMARY");
    console.log("=====================================");
    console.log("CannaTokenV2:     ", cannaTokenV2Address);
    console.log("WrappedCannaV2:   ", wrappedCannaV2Address);
    console.log("Owner:            ", deployer.address);
    console.log("Token Symbol:      wCANNA");
    console.log("Token Name:        Wrapped Cannabis V2");
    console.log("Backing Token:     CannaTokenV2 (tokenId=1)");
    console.log("");

    console.log("✅ V2 ECOSYSTEM READY!");
    console.log("");
    console.log("📝 Next Steps:");
    console.log("1. Verify WrappedCannaV2 on BscScan");
    console.log("2. Test wrap/unwrap functionality");
    console.log("3. Add liquidity on PancakeSwap (wCANNA/BNB)");
    console.log("4. Update documentation with new addresses");
    console.log("");
    console.log("⚠️  DEPRECATION NOTICE:");
    console.log("Old WrappedCanna (0x534c8Da2...) is OBSOLETE");
    console.log("Use only WrappedCannaV2 for all operations");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
�"(3750284766016bb5c0e9aa831d46f3a9e6f8ddb32Ofile:///c:/Users/Janus/cannatoken/cannatoken/scripts/deploy_wrapped_canna_v2.ts:file:///c:/Users/Janus