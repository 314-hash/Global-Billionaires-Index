²// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface ICannaTokenV2 {
    function balanceOf(
        address account,
        uint256 id
    ) external view returns (uint256);

    function mint(address to, uint256 id, uint256 amount) external;

    function burn(address from, uint256 id, uint256 amount) external;

    function isOperator(address account) external view returns (bool);
}

/**
 * @title WrappedCannaV2
 * @notice ERC-20 wrapper for CannaTokenV2 tokenId=1
 * @dev Allows wrapping/unwrapping between ERC6909 tokenId=1 and standard ERC-20
 */
contract WrappedCannaV2 is ERC20, Ownable {
    ICannaTokenV2 public immutable cannaTokenV2;
    uint256 public constant TOKEN_ID = 1;

    event Wrapped(address indexed user, uint256 amount);
    event Unwrapped(address indexed user, uint256 amount);

    constructor(
        address _cannaTokenV2,
        address initialOwner
    ) ERC20("Wrapped Cannabis V2", "wCANNA") Ownable(initialOwner) {
        require(_cannaTokenV2 != address(0), "Invalid CannaTokenV2 address");
        cannaTokenV2 = ICannaTokenV2(_cannaTokenV2);
    }

    /**
     * @notice Wrap CannaTokenV2 tokenId=1 to get ERC-20 wCANNA
     * @param amount Amount to wrap
     */
    function wrap(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");

        // Verify this contract is authorized as operator
        require(
            cannaTokenV2.isOperator(address(this)),
            "WrappedCannaV2: not authorized as operator"
        );

        // Burn user's CannaTokenV2 tokenId=1
        cannaTokenV2.burn(msg.sender, TOKEN_ID, amount);

        // Mint equivalent wCANNA
        _mint(msg.sender, amount);

        emit Wrapped(msg.sender, amount);
    }

    /**
     * @notice Unwrap wCANNA to get back CannaTokenV2 tokenId=1
     * @param amount Amount to unwrap
     */
    function unwrap(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");

        // Verify this contract is authorized as operator
        require(
            cannaTokenV2.isOperator(address(this)),
            "WrappedCannaV2: not authorized as operator"
        );

        // Burn user's wCANNA
        _burn(msg.sender, amount);

        // Mint back CannaTokenV2 tokenId=1
        cannaTokenV2.mint(msg.sender, TOKEN_ID, amount);

        emit Unwrapped(msg.sender, amount);
    }

    /**
     * @notice Get the CannaTokenV2 balance for a user
     * @param account User address
     * @return balance User's CannaTokenV2 tokenId=1 balance
     */
    function getUnderlyingBalance(
        address account
    ) external view returns (uint256) {
        return cannaTokenV2.balanceOf(account, TOKEN_ID);
    }

    /**
     * @notice Check if this contract is authorized as operator
     * @return True if authorized
     */
    function isAuthorized() external view returns (bool) {
        return cannaTokenV2.isOperator(address(this));
    }
}
²*cascade08"(451ef9bff17f1e842575f8a4116d19212b61d1a52Ifile:///c:/Users/Janus/cannatoken/cannatoken/contracts/WrappedCannaV2.sol:file:///c:/Users/Janus