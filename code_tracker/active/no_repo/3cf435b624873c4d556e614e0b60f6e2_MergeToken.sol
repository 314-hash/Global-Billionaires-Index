þ	// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title MERGToken
 * @dev MergeCore Token â€” fixed 100,000,000 total supply with role-based mint/burn control.
 */
contract MERGToken is ERC20, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    uint256 public constant MAX_SUPPLY = 100_000_000 * 10 ** 18; // 100 million MERG

    constructor(address admin) ERC20("MergeCore Token", "MERG") {
        // Grant admin role
        _grantRole(DEFAULT_ADMIN_ROLE, admin);

        // Mint full supply to admin
        _mint(admin, MAX_SUPPLY);
    }

    /**
     * @notice Mint new tokens up to MAX_SUPPLY.
     */
    function mint(address to, uint256 amount)
        external
        onlyRole(MINTER_ROLE)
    {
        require(totalSupply() + amount <= MAX_SUPPLY, "Max supply exceeded");
        _mint(to, amount);
    }

    /**
     * @notice Burn tokens from an account (with role control).
     */
    function burn(address from, uint256 amount)
        external
        onlyRole(BURNER_ROLE)
    {
        _burn(from, amount);
    }
}
þ	24file:///c:/Users/mergetoken/contracts/MergeToken.sol