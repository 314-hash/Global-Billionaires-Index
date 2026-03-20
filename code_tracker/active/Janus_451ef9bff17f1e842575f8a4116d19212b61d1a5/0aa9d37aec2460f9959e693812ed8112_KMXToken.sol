ª	// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title KMXToken
 * @notice ERC20 token with role-based minting, fixed max supply, and vesting-ready
 */
contract KMXToken is ERC20, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    // Maximum total supply: 200,000,000 tokens
    uint256 public immutable maxSupply = 200_000_000 * 10**18;

    /**
     * @param admin Address that receives admin and minter roles
     */
    constructor(address admin) ERC20("KMX Token", "KMX") {
        require(admin != address(0), "Invalid admin address");

        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(MINTER_ROLE, admin);
    }

    /**
     * @notice Mint new tokens to a recipient
     * @dev Can only be called by an account with MINTER_ROLE
     * @param to Recipient address
     * @param amount Amount to mint
     */
    function mint(address to, uint256 amount) external onlyRole(MINTER_ROLE) {
        require(totalSupply() + amount <= maxSupply, "Exceeds max supply");
        _mint(to, amount);
    }
}
 ª	"(451ef9bff17f1e842575f8a4116d19212b61d1a526file:///c:/Users/Janus/KMXToken/contracts/KMXToken.sol:file:///c:/Users/Janus