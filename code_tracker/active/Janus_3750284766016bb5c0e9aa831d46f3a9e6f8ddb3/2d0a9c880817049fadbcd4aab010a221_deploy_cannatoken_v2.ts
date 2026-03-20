�import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying CannaTokenV2 with the account:", deployer.address);

    // Deploy CannaTokenV2
    console.log("\nDeploying CannaTokenV2...");
    const CannaTokenV2 = await ethers.getContractFactory("CannaTokenV2");
    const cannaTokenV2 = await CannaTokenV2.deploy(deployer.address);
    await cannaTokenV2.waitForDeployment();
    const cannaTokenV2Address = await cannaTokenV2.getAddress();
    console.log(`✅ CannaTokenV2 deployed to: ${cannaTokenV2Address}`);

    // Get the already deployed WrappedCanna address
    const wrappedCannaAddress = "0x534c8Da2E1aB9563B894633B70452E57FE47f5aA";

    // Set WrappedCanna as an operator
    console.log("\nSetting WrappedCanna as operator...");
    const setOperatorTx = await cannaTokenV2.setOperator(wrappedCannaAddress, true);
    await setOperatorTx.wait();
    console.log(`✅ WrappedCanna (${wrappedCannaAddress}) is now an operator`);

    // Verify operator status
    const isOperator = await cannaTokenV2.isOperator(wrappedCannaAddress);
    console.log(`✅ Verified: WrappedCanna is operator = ${isOperator}`);

    console.log("\n📊 Deployment Summary:");
    console.log("================================");
    console.log(`CannaTokenV2:  ${cannaTokenV2Address}`);
    console.log(`Owner:         ${deployer.address}`);
    console.log(`Operator:      ${wrappedCannaAddress}`);
    console.log(`Initial Supply: 200,000,000 CANNA (tokenId=1)`);

    console.log("\n📝 Next Steps:");
    console.log("1. Verify contract on BscScan");
    console.log("2. Deploy new WrappedCanna pointing to V2");
    console.log("3. Create migration plan for existing holders");
    console.log("4. Update frontend to use new contract address");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
�"(3750284766016bb5c0e9aa831d46f3a9e6f8ddb32Lfile:///c:/Users/Janus/cannatoken/cannatoken/scripts/deploy_cannatoken_v2.ts:file:///c:/Users/Janus