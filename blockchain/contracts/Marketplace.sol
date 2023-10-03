// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";

error PriceMustNotZero();
error PayListingFees();
error PriceNotMet();
error NotListed();
error NotOwner();
error NotEnoughBalance();
error AlreadySold();

contract Marketplace is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter public _itemIds;
    Counters.Counter public _itemSold;
    using Address for address payable;

    // State Variables
    struct Item {
        uint256 itemId; // Id for listed item on marketplace
        address nftContract;
        uint256 tokenId; // Token id of the NFT
        string category;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    // Owner of the contract who makes some commission on listing
    address payable owner;
    //Mapping to keep track of the NFT with its TokenId
    mapping(uint256 => Item) public s_allListings;
    IERC20 public zetherToken;
    uint256 public listingFees;

    event ItemListed();
    event ItemCanceled();
    event ItemBought();
    event Received(address, uint);

    constructor(address _zetherToken) {
        // Owner of the contract is the one who deploys it.
        owner = payable(msg.sender);
        zetherToken = IERC20(_zetherToken);
        listingFees = 1 * 10 ** 18; // 1 Zether token as commission
    }

    // Functions
    /// @notice List the item on the marketplace by paying listing fees
    /// @param _nftContract - The contract address of the nft
    /// @param _price - Price on which to sell the NFT
    /// @param _itemCategory - Type of NFT. For ex. Music, Art, Illustration, etc.

    function listNFT(
        address _nftContract,
        uint256 _tokenId,
        uint256 _price,
        string memory _itemCategory
    ) external payable nonReentrant {
        if (_price <= 0) {
            revert PriceMustNotZero();
        }
        if (zetherToken.balanceOf(msg.sender) < listingFees) {
            revert NotEnoughBalance();
        }
        IERC721 nft = IERC721(_nftContract);
        if (nft.ownerOf(_tokenId) != msg.sender) {
            revert NotOwner();
        }
        _itemIds.increment();
        uint256 currentId = _itemIds.current();
        s_allListings[currentId] = Item(
            currentId,
            _nftContract,
            _tokenId,
            _itemCategory,
            payable(msg.sender),
            payable(address(0)),
            _price,
            false
        );
        nft.transferFrom(msg.sender, address(this), _tokenId);
        zetherToken.transferFrom(msg.sender, address(this), listingFees);
        emit ItemListed();
    }

    /// @notice Buy the Item
    /// @param itemId - The token id of the Item to buy
    function buyNFT(
        uint256 itemId,
        address _nftContract
    ) external payable nonReentrant {
        Item storage item = s_allListings[itemId];
        if (item.itemId == 0) {
            revert NotListed();
        }
        if (item.sold) {
            revert AlreadySold();
        }
        if (zetherToken.balanceOf(msg.sender) < item.price) {
            revert NotEnoughBalance();
        }
        item.owner = payable(msg.sender);
        item.sold = true;
        _itemSold.increment();
        IERC721 nft = IERC721(_nftContract);
        nft.transferFrom(address(this), msg.sender, item.tokenId);
        zetherToken.transferFrom(msg.sender, item.seller, item.price);
        item.seller = payable(address(0));
        emit ItemBought();
    }

    function getListing(uint256 itemId) external view returns (Item memory) {
        return s_allListings[itemId];
    }

    function getitemId() external view returns (uint256) {
        return _itemIds.current();
    }

    function getItemSold() external view returns (uint256) {
        return _itemSold.current();
    }

    function getListingPrice() external view returns (uint256) {
        return listingFees;
    }

    function getContractOwner() external view returns (address) {
        return owner;
    }

    function getEarnings() external view returns (uint256) {
        return address(this).balance;
    }

    function withdrawCommisson() external payable {
        require(owner == msg.sender, "Not owner");
        zetherToken.transferFrom(
            address(this),
            msg.sender,
            zetherToken.balanceOf(address(this))
        );
    }
}
