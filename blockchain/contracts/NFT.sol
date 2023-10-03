// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address public marketplaceAddress;

    event NFTMinted(uint256 indexed tokenId);

    constructor(address _marketplaceAddress) ERC721("Marketplace", "MP") {
        marketplaceAddress = _marketplaceAddress;
    }

    function createNFT(string memory tokenURI) external returns (uint256) {
        _tokenIds.increment();
        uint256 currentId = _tokenIds.current();
        _safeMint(msg.sender, currentId);
        _setTokenURI(currentId, tokenURI);
        setApprovalForAll(marketplaceAddress, true);

        emit NFTMinted(currentId);

        return currentId;
    }
}
