¢ // SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title CannaStaking
 * @notice Hybrid PoS + Time-Lock Staking + Penalty-Less Delegation
 */
contract CannaStaking is Ownable {
    IERC20 public stakingToken;

    struct Stake {
        uint256 amount;
        uint64 startTimestamp;
        uint64 lockEndTimestamp;  // optional time-lock
        address delegatee;
    }

    mapping(address => Stake) public stakes;
    uint256 public totalStaked;

    // Approved controllers (facets or governance) can act on behalf of users
    mapping(address => bool) public controllers;

    event Staked(address indexed user, uint256 amount, uint64 lockEnd);
    event Unstaked(address indexed user, uint256 amount);
    event Delegated(address indexed from, address indexed to);
    event ControllerSet(address controller, bool approved);

    constructor(address tokenAddress, address initialOwner) Ownable(initialOwner) {
        stakingToken = IERC20(tokenAddress);
    }

    // --- Controller management ---
    function setController(address controller, bool approved) external onlyOwner {
        controllers[controller] = approved;
        emit ControllerSet(controller, approved);
    }

    // --- Stake with optional time-lock ---
    function stake(uint256 amount, uint64 lockDuration) external {
        _stake(msg.sender, amount, lockDuration);
    }

    // --- Stake on behalf of user (controller/facet call) ---
    function stakeFor(address user, uint256 amount, uint64 lockDuration) external {
        require(controllers[msg.sender] || msg.sender == owner(), "Not authorized");
        _stake(user, amount, lockDuration);
    }

    function _stake(address user, uint256 amount, uint64 lockDuration) internal {
        require(amount > 0, "Zero amount");
        stakingToken.transferFrom(user, address(this), amount);

        Stake storage s = stakes[user];
        s.amount += amount;
        s.startTimestamp = uint64(block.timestamp);
        s.lockEndTimestamp = lockDuration > 0 ? uint64(block.timestamp) + lockDuration : 0;

        totalStaked += amount;
        emit Staked(user, amount, s.lockEndTimestamp);
    }

    // --- Unstake ---
    function unstake(uint256 amount) external {
        _unstake(msg.sender, amount);
    }

    // --- Unstake on behalf (controller/facet call) ---
    function unstakeFor(address user, uint256 amount) external {
        require(controllers[msg.sender] || msg.sender == owner(), "Not authorized");
        _unstake(user, amount);
    }

    function _unstake(address user, uint256 amount) internal {
        Stake storage s = stakes[user];
        require(s.amount >= amount, "Insufficient stake");
        if (s.lockEndTimestamp > block.timestamp) {
            revert("Stake is time-locked");
        }

        s.amount -= amount;
        totalStaked -= amount;
        stakingToken.transfer(user, amount);
        emit Unstaked(user, amount);
    }

    // --- Delegation ---
    function delegate(address from, address to) external {
        require(msg.sender == from || controllers[msg.sender] || msg.sender == owner(), "Not authorized");
        stakes[from].delegatee = to;
        emit Delegated(from, to);
    }

    // --- View functions ---
    function stakeOf(address user) external view returns (uint256 amount, uint64 startTimestamp, uint64 lockEnd, address delegatee) {
        Stake storage s = stakes[user];
        return (s.amount, s.startTimestamp, s.lockEndTimestamp, s.delegatee);
    }

    // Calculate voting power: amount + time-lock boost
    function votingPower(address user) external view returns (uint256) {
        Stake storage s = stakes[user];
        if (s.amount == 0) return 0;

        uint256 boost = 1e18; // base multiplier
        if (s.lockEndTimestamp > block.timestamp) {
            uint256 lockDuration = s.lockEndTimestamp - s.startTimestamp;
            boost += lockDuration / 1 days * 1e16; // simple APR boost: 1% per day
        }

        return (s.amount * boost) / 1e18;
    }
}
¢ "(451ef9bff17f1e842575f8a4116d19212b61d1a52Gfile:///c:/Users/Janus/cannatoken/cannatoken/contracts/CannaStaking.sol:file:///c:/Users/Janus