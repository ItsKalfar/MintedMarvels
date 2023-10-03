import { ethers } from "hardhat";
import dotenv from "dotenv";

dotenv.config();

async function main(): Promise<void> {
  const ZetherContractAddress: string = process.env.ZETHER_CONTRACT_ADDRESS!;

  try {
    console.log("1) Deploying Contract----------------");
    const marketplace = await ethers.deployContract("Marketplace", [
      ZetherContractAddress,
    ]);
    await marketplace.waitForDeployment();
    console.log(`2) Market place deployed at ${marketplace.target} `);
  } catch (error) {
    console.log(`Deployment failed because... ${error}`);
  }
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
