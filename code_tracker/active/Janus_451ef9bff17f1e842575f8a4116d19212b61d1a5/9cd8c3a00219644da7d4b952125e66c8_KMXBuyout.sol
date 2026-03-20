¥// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./KMXNFT.sol";

contract KMXBuyout is ReentrancyGuard, Ownable {
    KMXNFT public immutable nft;
    address public treasury;

    event TreasuryUpdated(
        address indexed oldTreasury,
        address indexed newTreasury
    );

    constructor(address nftAddress, address _treasury) Ownable(msg.sender) {
        require(nftAddress != address(0), "Invalid NFT address");
        require(_treasury != address(0), "Invalid treasury address");
        nft = KMXNFT(nftAddress);
        treasury = _treasury;
    }

    function setTreasury(address _treasury) external onlyOwner {
        require(_treasury != address(0), "Invalid treasury address");
        emit TreasuryUpdated(treasury, _treasury);
        treasury = _treasury;
    }

    function executeBuyout(uint256 tokenId) external payable nonReentrant {
        require(msg.value > 0, "Invalid value");

        address owner = nft.ownerOf(tokenId);
        require(msg.sender == owner, "Not NFT owner");

        // Execute buyout on NFT contract
        nft.executeBuyout(tokenId, msg.value);

        // Transfer funds to treasury
        (bool sent, ) = payable(treasury).call{value: msg.value}("");
        require(sent, "ETH transfer failed");
    }
}
¥*cascade08"(451ef9bff17f1e842575f8a4116d19212b61d1a527file:///c:/Users/Janus/KMXToken/contracts/KMXBuyout.sol:file:///c:/Users/Janus