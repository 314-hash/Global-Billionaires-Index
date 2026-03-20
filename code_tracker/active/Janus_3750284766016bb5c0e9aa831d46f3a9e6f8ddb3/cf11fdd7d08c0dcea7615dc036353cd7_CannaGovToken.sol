î// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title CannaGovToken
 * @notice Governance token implementing ERC-7121 (off-chain voting), ERC-900 (staking), ERC-5164 (cross-chain execution)
 */
contract CannaGovToken is ERC20, Ownable {
    // --- ERC-900 Staking ---
    struct Stake {
        uint256 amount;
        uint64 startTimestamp;
    }
    mapping(address => Stake) public stakes;
    uint256 public totalStaked;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);

    // --- ERC-7121 Off-chain governance voting packets ---
    struct VotePacket {
        bytes32 proposalId;
        address voter;
        uint256 weight;
        uint64 timestamp;
        bytes signature; // off-chain signature of vote
    }

    mapping(bytes32 => mapping(address => bool)) public voteUsed; // prevent double voting per proposal
    event VoteSubmitted(bytes32 indexed proposalId, address indexed voter, uint256 weight);

    // --- ERC-5164 Cross-chain execution ---
    event CrossChainProposalExecuted(bytes32 indexed proposalId, string targetChain, bytes payload);

    /**
     * @dev Deploy token with initial supply minted to the specified owner
     */
    constructor() 
        ERC20("Canna Governance Token", "CANNA-GOV") 
        Ownable(0x7e45B7501b991946B7D1c4Ab87C2d5E76B55f182) 
    {
        uint256 initialSupply = 100_000_000 * 10 ** decimals(); // 100 million tokens
        _mint(owner(), initialSupply);
    }

    // --------------------
    // ERC-900: Stake / Unstake
    // --------------------
    function stake(uint256 amount) external {
        require(amount > 0, "Zero amount");
        _transfer(msg.sender, address(this), amount);
        Stake storage s = stakes[msg.sender];
        s.amount += amount;
        s.startTimestamp = uint64(block.timestamp);
        totalStaked += amount;
        emit Staked(msg.sender, amount);
    }

    function unstake(uint256 amount) external {
        Stake storage s = stakes[msg.sender];
        require(s.amount >= amount, "Insufficient stake");
        s.amount -= amount;
        totalStaked -= amount;
        _transfer(address(this), msg.sender, amount);
        emit Unstaked(msg.sender, amount);
    }

    function stakeOf(address user) external view returns (uint256 amount, uint64 startTimestamp) {
        Stake storage s = stakes[user];
        return (s.amount, s.startTimestamp);
    }

    // --------------------
    // ERC-7121: Submit off-chain vote packet
    // --------------------
    function submitVotePacket(VotePacket calldata packet) external {
        // Verify signature (simplified; integrate full EIP-712 verifier for production)
        bytes32 voteHash = keccak256(abi.encode(packet.proposalId, packet.voter, packet.weight, packet.timestamp));
        require(!voteUsed[packet.proposalId][packet.voter], "Vote already used");
        voteUsed[packet.proposalId][packet.voter] = true;
        emit VoteSubmitted(packet.proposalId, packet.voter, packet.weight);
    }

    // --------------------
    // ERC-5164: Cross-chain proposal execution
    // --------------------
    function executeCrossChainProposal(bytes32 proposalId, string calldata targetChain, bytes calldata payload) external onlyOwner {
        // Integrate LayerZero / Axelar / Optimism executor logic here
        emit CrossChainProposalExecuted(proposalId, targetChain, payload);
    }

    // --------------------
    // Utilities
    // --------------------
    function governanceWeight(address user) external view returns (uint256) {
        // Example weight: staked amount + balance
        return stakes[user].amount + balanceOf(user);
    }
}
î"(3750284766016bb5c0e9aa831d46f3a9e6f8ddb32Hfile:///c:/Users/Janus/cannatoken/cannatoken/contracts/CannaGovToken.sol:file:///c:/Users/Janus