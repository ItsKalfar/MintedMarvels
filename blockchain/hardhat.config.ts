import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

interface CustomHardhatConfig extends HardhatUserConfig {
  namedAccounts?: {
    deployer: {
      default: number;
    };
  };

  settings?: {
    optimizer: {
      enabled: boolean;
      runs: number;
    };
  };
}

const config: CustomHardhatConfig = {
  solidity: "0.8.19",
  settings: {
    optimizer: {
      enabled: true,
      runs: 1000,
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      chainId: 80001,
      url: process.env.MUMBAI_API || "",
      accounts: [process.env.PRIVATE_KEY || ""],
    },
    sepolia: {
      chainId: 11155111,
      url: process.env.SEPOLIA_API || "",
      accounts: [process.env.PRIVATE_KEY || ""],
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.POLYGONSCAN_API_KEY || "",
      sepolia: process.env.ETHERSCAN_API_KEY || "",
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};

export default config;
