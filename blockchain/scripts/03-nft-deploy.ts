import { ethers } from "hardhat";
import dotenv from "dotenv";

dotenv.config();

async function main(): Promise<void> {
  const MarketplaceContractAddress: string =
    process.env.MARKETPLACE_CONTRACT_ADDRESS!;

  try {
    console.log("1) Deploying Contract----------------");
    const nft = await ethers.deployContract("NFT", [
      MarketplaceContractAddress,
    ]);
    await nft.waitForDeployment();
    console.log(`2) NFT contract deployed at ${nft.target} `);
  } catch (error) {
    console.log(`Deployment failed because... ${error}`);
  }
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
