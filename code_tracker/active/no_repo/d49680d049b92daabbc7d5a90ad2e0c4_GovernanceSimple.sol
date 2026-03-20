Ï#// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract GovernanceSimple is AccessControl {
    bytes32 public constant PROPOSER = keccak256("PROPOSER");
    bytes32 public constant EXECUTOR = keccak256("EXECUTOR");
    bytes32 public constant VOTER_ROLE = keccak256("VOTER_ROLE"); // New role for voters

    uint256 public MIN_QUORUM; // adjustable governance parameter

    struct Proposal {
        address proposer;
        address target;
        bytes callData;
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 endBlock;
        bool executed;
    }

    Proposal[] public proposals;

    // proposalId => voter => voted
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    event ProposalCreated(
        uint256 indexed id,
        address indexed proposer,
        address target
    );
    event Voted(uint256 indexed id, address indexed voter, bool support);
    event Executed(uint256 indexed id);
    event QuorumUpdated(uint256 oldQuorum, uint256 newQuorum);

    constructor(address admin) {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(PROPOSER, admin);
        _grantRole(EXECUTOR, admin);
        _grantRole(VOTER_ROLE, admin); // Grant admin the voter role initially
        MIN_QUORUM = 3; // Initial value
    }

    function setMinQuorum(
        uint256 newQuorum
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(newQuorum > 0, "Quorum must be greater than 0");
        emit QuorumUpdated(MIN_QUORUM, newQuorum);
        MIN_QUORUM = newQuorum;
    }

    function propose(
        address target,
        bytes calldata callData,
        uint256 durationBlocks
    ) external onlyRole(PROPOSER) returns (uint256) {
        require(target != address(0), "invalid target");
        require(durationBlocks > 0, "invalid duration");

        Proposal memory newProposal = Proposal({
            proposer: msg.sender,
            target: target,
            callData: callData,
            votesFor: 0,
            votesAgainst: 0,
            endBlock: block.number + durationBlocks,
            executed: false
        });

        proposals.push(newProposal);

        uint256 id = proposals.length - 1;
        emit ProposalCreated(id, msg.sender, target);
        return id;
    }

    function vote(uint256 id, bool support) external onlyRole(VOTER_ROLE) {
        // Added access control
        require(id < proposals.length, "Invalid proposal ID"); // Input validation
        Proposal storage p = proposals[id];

        require(block.number <= p.endBlock, "voting ended");
        require(!hasVoted[id][msg.sender], "already voted");

        hasVoted[id][msg.sender] = true;

        if (support) {
            p.votesFor++;
        } else {
            p.votesAgainst++;
        }

        emit Voted(id, msg.sender, support);
    }

    function execute(uint256 id) external onlyRole(EXECUTOR) {
        require(id < proposals.length, "Invalid proposal ID"); // Input validation
        Proposal storage p = proposals[id];

        require(block.number > p.endBlock, "proposal active");
        require(!p.executed, "already executed");
        require(
            p.votesFor + p.votesAgainst >= MIN_QUORUM,
            "quorum not reached"
        );
        require(p.votesFor > p.votesAgainst, "proposal failed");

        // Effects before interaction (CEI pattern)
        p.executed = true;

        (bool success, bytes memory returndata) = p.target.call(p.callData);

        // The current check `if (!success)` is a basic check. For critical operations,
        // consider adding more robust checks on the return data or state changes in the target contract if possible,
        // or ensure that the `callData` is crafted to include internal checks within the target contract.
        // However, given the nature of `callData`, this is often difficult to do generically.
        // The primary fix is to ensure that the `callData` itself is safe and that the target contract's function being called is designed to revert on failure.
        if (!success) {
            if (returndata.length > 0) {
                assembly {
                    revert(add(returndata, 32), mload(returndata))
                }
            } else {
                revert("execution failed");
            }
        }

        emit Executed(id);
    }
}
Ï#*cascade082:file:///c:/Users/mergetoken/contracts/GovernanceSimple.sol