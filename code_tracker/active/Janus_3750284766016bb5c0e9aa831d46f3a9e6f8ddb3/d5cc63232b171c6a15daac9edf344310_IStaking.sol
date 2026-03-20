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
ö"(3750284766016bb5c0e9aa831d46f3a9e6f8ddb32Xfile:///c:/Users/Janus/cannatoken/cannatoken/contracts/consensus/interfaces/IStaking.sol:file:///c:/Users/Janus