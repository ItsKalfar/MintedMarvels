"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import {
  Contract,
  BrowserProvider,
  JsonRpcProvider,
  formatEther,
  parseUnits,
} from "ethers";
import { useToast } from "@/components/ui/use-toast";
import NFTABI from "@/constants/NFT.json";
import ZetherABI from "@/constants/Zether.json";
import MarketplaceABI from "@/constants/Marketplace.json";
import axios from "axios";

type GlobalContextType = {
  connectWallet: () => void;
  currentAccount: string | null;
  ethBalance: string;
  zthBalance: string;
  allItems: NFTItem[];
  createSale: (url: string, price: string, category: string) => void;
  buyItem: (itemId: number, price: string) => void;
  isLoading: boolean;
  uploadFileToIPFS: (file: File) => Promise<string>;
  uploadNFTToIPFS: (
    name: string,
    description: string,
    category: string,
    imageUrl: string
  ) => Promise<string>;
};

type NFTItem = {
  price: string;
  itemId: number;
  tokenId: number;
  seller: string;
  owner: string;
  image: string;
  name: string;
  category: string;
  description: string;
  nftContract: string;
  sold: boolean;
};

let eth: any;

if (typeof window !== "undefined") {
  eth = (window as any).ethereum;
}

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Environment Variables
  const MarketPlaceContract: string =
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS!;
  const NftContract: string = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS!;
  const ZetherContract: string =
    process.env.NEXT_PUBLIC_ZETHER_CONTRACT_ADDRESS!;
  const rpcUrl: string = process.env.NEXT_PUBLIC_RPC_URL!;

  const IPFSApiKey: string = process.env.NEXT_PUBLIC_IPFS_API_KEY!;
  const IPFSApiSecrete: string = process.env.NEXT_PUBLIC_IPFS_API_SECRET!;
  const IPFSSubdomain: string = process.env.NEXT_PUBLIC_IPFS_SUB_DOMAIN!;
  const IPFSEndPoint: string = process.env.NEXT_PUBLIC_IPFS_API_ENDPOINT!;

  const uploadFileToIPFS = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(IPFSEndPoint, formData, {
        auth: {
          username: IPFSApiKey,
          password: IPFSApiSecrete,
        },
      });
      if (response.status === 200) {
        const data = response.data;
        const ipfsUrl = `${IPFSSubdomain}/ipfs/${data.Hash}`;
        console.log("Image Url is : ", ipfsUrl);
        return ipfsUrl;
      } else {
        throw new Error("Failed to upload to IPFS");
      }
    } catch (error: any) {
      throw new Error("Error uploading image to IPFS: " + error.message);
    }
  };

  const uploadNFTToIPFS = async (
    name: string,
    description: string,
    category: string,
    imageUrl: string
  ): Promise<string> => {
    try {
      const nftDataJSON = JSON.stringify({
        name,
        description,
        category,
        image: imageUrl,
      });
      const formData = new FormData();
      formData.append(
        "file",
        new Blob([nftDataJSON], { type: "application/json" })
      );

      const response = await axios.post(IPFSEndPoint, formData, {
        auth: {
          username: IPFSApiKey,
          password: IPFSApiSecrete,
        },
      });
      if (response.status === 200) {
        const ipfsUrl = `${IPFSSubdomain}/ipfs/${response.data.Hash}`;
        return ipfsUrl;
      } else {
        throw new Error("Failed to upload NFT data to IPFS");
      }
    } catch (error: any) {
      throw new Error("Error uploading JSON to IPFS: " + error.message);
    }
  };

  //--------------------------------------------------

  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const [allItems, setAllItems] = useState<NFTItem[]>([]);
  const [ethBalance, setEthBalance] = useState("");
  const [zthBalance, setZthBalance] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const connectWallet = async (metamask = eth) => {
    try {
      if (!metamask) return toast({ title: "Please install Metamask first" });

      const accounts = await metamask.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);

      toast({
        title: "Wallet Connected!",
        description: "Your MetaMask wallet is now securely connected.",
      });
    } catch (error: any) {
      toast({ title: `${error}` });
    }
  };

  const checkIfWalletIsConnected = async (metamask = eth) => {
    try {
      if (!metamask) return toast({ title: "Please install Metamask First" });

      const accounts = await metamask.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getAllItems = async () => {
    try {
      const provider = new JsonRpcProvider(rpcUrl);
      // Create a contract instance for the Marketplace contract
      const Marketplace = new Contract(
        MarketPlaceContract,
        MarketplaceABI.abi,
        provider
      );
      // Create a contract instance for the NFT contract
      const NFT = new Contract(NftContract, NFTABI.abi, provider);

      // Get the total number of items
      const totalItems = await Marketplace.getitemId();
      const totalItemCount = parseInt(totalItems);

      const allItems = [];

      // Iterate through each item
      for (let index = 1; index <= totalItemCount; index++) {
        const getItem = await Marketplace.getListing(index);
        const tokenId = parseInt(getItem.tokenId.toString());

        const tokenUri = await NFT.tokenURI(tokenId);
        const meta = await axios.get(tokenUri);

        const item = {
          price: formatEther(getItem.price.toString()),
          itemId: getItem.itemId.toString(),
          tokenId: tokenId,
          seller: getItem.seller.toString().toLowerCase(),
          owner: getItem.owner.toString().toLowerCase(),
          image: meta.data.image,
          name: meta.data.name,
          category: meta.data.category,
          description: meta.data.description,
          nftContract: getItem.nftContract,
          sold: getItem.sold,
        };

        allItems.push(item);
      }
      setAllItems(allItems);
      console.log(allItems);
    } catch (error: any) {
      console.error("Error fetching items:", error);
    }
  };

  const createSale = async (url: string, price: string, category: string) => {
    try {
      let ethereum: any;
      let capturedTokenId: number | null = null;
      let priceInWei: bigint = parseUnits(price, 18);
      if (typeof window !== "undefined") {
        ethereum = (window as any).ethereum;
      }
      // Check if a wallet is connected
      if (!currentAccount) {
        toast({
          title: "No wallet connected",
          description: "Please connect your wallet first.",
        });
        return;
      }
      setIsLoading(true);
      // Create a provider
      const provider = new BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      // Create contract instances
      const Marketplace = new Contract(
        MarketPlaceContract,
        MarketplaceABI.abi,
        signer
      );
      const waitForListing = new Promise<void>((resolve) => {
        Marketplace.on("ItemListed", () => {
          toast({
            title: "NFT Created and Listed Successfully",
            description:
              "Your NFT has been successfully created and listed for sale.",
          });
          resolve();
        });
      });
      const Zether = new Contract(ZetherContract, ZetherABI.abi, signer);
      const NFT = new Contract(NftContract, NFTABI.abi, signer);
      const waitForEvent = new Promise<void>((resolve) => {
        NFT.on("NFTMinted", (tokenId) => {
          capturedTokenId = tokenId;
          resolve();
        });
      });
      toast({
        title: "Creating NFT",
        description:
          "Please wait while we create your NFT. This may take a moment.",
      });
      // Create the NFT
      const creation = await NFT.createNFT(url);
      await creation.wait();
      await waitForEvent;
      if (capturedTokenId !== null) {
        // Approve the NFT for listing
        const approval = await Zether.approve(
          MarketPlaceContract,
          BigInt(1 * 10 ** 18)
        );
        await approval.wait();
        toast({
          title: "Listing it on the marketplace",
          description:
            "Please wait while we list your NFT. This may take a moment.",
        });
        // List the NFT on the marketplace
        const listing = await Marketplace.listNFT(
          NftContract,
          capturedTokenId,
          priceInWei,
          category
        );
        await listing.wait();
        await waitForListing;
      }
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Something went wrong!",
        description: `${error.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const buyItem = async (itemId: number, price: string) => {
    try {
      let ethereum: any;
      let priceInWei: bigint = parseUnits(price, 18);

      if (typeof window !== "undefined") {
        ethereum = (window as any).ethereum;
      }
      // Check if a wallet is connected
      if (!currentAccount) {
        toast({
          title: "No wallet connected",
          description: "Please connect your wallet first.",
        });
        return;
      }
      setIsLoading(true);
      // Create a provider
      const provider = new BrowserProvider(ethereum);
      const signer = await provider.getSigner();

      // Create contract instances
      const Marketplace = new Contract(
        MarketPlaceContract,
        MarketplaceABI.abi,
        signer
      );

      const waitForEvent = new Promise<void>((resolve) => {
        Marketplace.on("ItemBought", () => {
          console.log("Item Bought");
        });
        resolve();
      });

      const Zether = new Contract(ZetherContract, ZetherABI.abi, signer);

      // Check the user's Zether balance
      const userZetherBalance = await Zether.balanceOf(currentAccount);
      if (userZetherBalance < priceInWei) {
        toast({
          title: "Insufficient Zether balance",
          description:
            "You don't have enough Zether tokens to make this purchase.",
        });
        return;
      }

      toast({
        title: "Processing Your Purchase",
        description: "Please wait while we process your purchase",
      });

      // Approve the Zether contract to spend the specified price
      const approval = await Zether.approve(MarketPlaceContract, priceInWei);
      await approval.wait();

      // Buy the NFT from the marketplace
      const buying = await Marketplace.buyNFT(itemId, NftContract, {
        value: 0,
        gasLimit: 200000,
      });
      await buying.wait();
      await waitForEvent;
    } catch (error: any) {
      toast({ title: `${error}` });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getBalance = async () => {
    if (currentAccount) {
      const provider = new BrowserProvider(eth);
      const Zether = new Contract(ZetherContract, ZetherABI.abi, provider);
      const userZetherBalance = await Zether.balanceOf(currentAccount);
      const userEtherBalance = await provider.getBalance(currentAccount);
      setEthBalance(formatEther(userEtherBalance).toString().substring(0, 6));
      setZthBalance(formatEther(userZetherBalance).toString().substring(0, 6));
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    getAllItems();
    getBalance();
  }, [currentAccount, isLoading]);

  return (
    <GlobalContext.Provider
      value={{
        connectWallet,
        currentAccount,
        ethBalance,
        zthBalance,
        allItems,
        createSale,
        buyItem,
        isLoading,
        uploadFileToIPFS,
        uploadNFTToIPFS,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
