¦// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

interface IERC6909 {
    function mint(address to, uint256 id, uint256 amount) external;
    function burn(address from, uint256 id, uint256 amount) external;
    function balanceOf(address account, uint256 id) external view returns (uint256);
}

interface IERC7007 {
    function setMetadata(uint256 tokenId, string calldata metadataURI) external;
    function getMetadata(uint256 tokenId) external view returns (string memory);
}

contract CannaToken is Ownable, IERC6909, IERC7007 {
    using Strings for uint256;

    string public name = "Cannabis";
    string public symbol = "CANNA";

    mapping(uint256 => mapping(address => uint256)) private _balances;
    mapping(uint256 => string) private _metadata;
    mapping(uint256 => bool) public tokenExists;
    mapping(uint256 => uint256) public totalSupply;

    constructor(address initialOwner) Ownable(initialOwner) {
        // optionally mint initial supply to initialOwner
        // example: mint 200,000,000 of tokenId 1
        _balances[1][initialOwner] = 200_000_000 * 1e18;
        totalSupply[1] = 200_000_000 * 1e18;
        tokenExists[1] = true;
    }

    function mint(address to, uint256 id, uint256 amount) external override onlyOwner {
        require(to != address(0), "Cannot mint to zero");
        _balances[id][to] += amount;
        totalSupply[id] += amount;
        tokenExists[id] = true;
    }

    function burn(address from, uint256 id, uint256 amount) external override onlyOwner {
        require(_balances[id][from] >= amount, "Insufficient balance");
        _balances[id][from] -= amount;
        totalSupply[id] -= amount;
    }

    function balanceOf(address account, uint256 id) external view override returns (uint256) {
        return _balances[id][account];
    }

    function setMetadata(uint256 tokenId, string calldata metadataURI) external override onlyOwner {
        require(tokenExists[tokenId], "Token ID does not exist");
        _metadata[tokenId] = metadataURI;
    }

    function getMetadata(uint256 tokenId) external view override returns (string memory) {
        return _metadata[tokenId];
    }
}
¦"(451ef9bff17f1e842575f8a4116d19212b61d1a52Efile:///c:/Users/Janus/cannatoken/cannatoken/contracts/CannaToken.sol:file:///c:/Users/Janus