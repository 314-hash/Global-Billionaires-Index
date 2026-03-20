ö// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IStaking {
    // --- Stake ---
    function stake(uint256 amount, uint64 lockDuration) external;
    function stakeFor(address user, uint256 amount, uint64 lockDuration) external;

    // --- Unstake ---
    function unstake(uint256 amount) external;
    function unstakeFor(address user, uint256 amount) external;

    // --- Delegation ---
    function delegate(address from, address to) external;

    // --- Views ---
    function stakeOf(address user) external view returns (
        uint256 amount,
        uint64 startTimestamp,
        uint64 lockEndTimestamp,
        address delegatee
    );

    function votingPower(address user) external view returns (uint256);

    // Optional: controller management
    function setController(address controller, bool approved) external;
}
ö"(451ef9bff17f1e842575f8a4116d19212b61d1a52Xfile:///c:/Users/Janus/cannatoken/cannatoken/contracts/consensus/interfaces/IStaking.sol:file:///c:/Users/Janus