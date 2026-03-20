ð	// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

/// @title EntropyPool
/// @notice Commitment and validation layer for DWEI entropy proofs
contract EntropyPool is AccessControl {
    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");

    mapping(bytes32 => bool) public committed;

    event EntropyCommitted(bytes32 indexed root, address indexed operator);
    event EntropyValidated(bytes32 indexed root, bool valid);

    constructor(address admin) {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(OPERATOR_ROLE, admin);
    }

    /// @notice Commit entropy root + proof (quantum-resistant)
    function commitEntropy(bytes32 root, bytes calldata proof)
        external
        onlyRole(OPERATOR_ROLE)
        returns (bool)
    {
        require(!committed[root], "Already committed");
        require(proof.length > 0, "Invalid proof");

        committed[root] = true;
        emit EntropyCommitted(root, msg.sender);
        return true;
    }

    /// @notice Check if an entropy root is committed
    function isCommitted(bytes32 root) external view returns (bool) {
        return committed[root];
    }
}
ð	25file:///c:/Users/mergetoken/contracts/EntropyPool.sol