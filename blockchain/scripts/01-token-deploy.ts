import { ethers } from "hardhat";
import { verify } from "../utils/verify";
import dotenv from "dotenv";

dotenv.config();

async function main(): Promise<void> {
  try {
    console.log("1) Deploying Contract----------------");
    const token = await ethers.deployContract("Zether");
    await token.waitForDeployment();
    console.log(`2) Token deployed at ${token.target}`);
  } catch (error) {
    console.log(`Deployment failed because... ${error}`);
  }
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
