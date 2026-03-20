“// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title KMXVesting
 * @notice Token vesting contract with secure claim functionality and admin-controlled allocations.
 */
contract KMXVesting is Ownable, ReentrancyGuard {
    IERC20 public immutable token;
    uint256 public immutable releaseTime;

    // Private mapping to prevent exposing sensitive allocations publicly
    mapping(address => uint256) private _allocations;

    // Events
    event TokensAllocated(address indexed beneficiary, uint256 amount);
    event TokensClaimed(address indexed beneficiary, uint256 amount);

    constructor(address tokenAddress, uint256 _releaseTime) Ownable(msg.sender) {
        require(tokenAddress != address(0), "Invalid token");
        require(_releaseTime > block.timestamp, "Release time must be future");

        token = IERC20(tokenAddress);
        releaseTime = _releaseTime;
    }

    /**
     * @notice Sets or updates allocation for a beneficiary
     * @dev Only callable by the contract owner
     */
    function setAllocation(address beneficiary, uint256 amount) external onlyOwner {
        require(beneficiary != address(0), "Invalid address");
        _allocations[beneficiary] = amount;

        emit TokensAllocated(beneficiary, amount);
    }

    /**
     * @notice Returns allocation of a given address
     */
    function allocationOf(address beneficiary) external view returns (uint256) {
        return _allocations[beneficiary];
    }

    /**
     * @notice Claim vested tokens after release time
     * @dev Uses Checks-Effects-Interactions + ReentrancyGuard
     */
    function claim() external nonReentrant {
        require(block.timestamp >= releaseTime, "Not released");

        uint256 amount = _allocations[msg.sender];
        require(amount > 0, "No tokens to claim");

        // âœ… Effects first: prevent reentrancy
        _allocations[msg.sender] = 0;

        // âœ… Interactions last
        require(token.transfer(msg.sender, amount), "Token transfer failed");

        emit TokensClaimed(msg.sender, amount);
    }
}
 “*cascade08"(451ef9bff17f1e842575f8a4116d19212b61d1a528file:///c:/Users/Janus/KMXToken/contracts/KMXVesting.sol:file:///c:/Users/Janus