±// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./EntropyPool.sol";
import "./IQRHRPVerifier.sol";

/**
 * @title MergeCoreManager
 * @notice Handles coordination between MergeToken, EntropyPool, and verification layers.
 * @dev Integrates quantum-resistant verification and entropy commitment.
 */
contract MergeCoreManager is AccessControl, ReentrancyGuard {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    EntropyPool public entropyPool;
    IQRHRPVerifier public verifier;
    IERC20 public mergToken;

    event EntropyCommitted(address indexed user, bytes32 root);
    event Verified(address indexed user, bool success);
    event PoolUpdated(address entropyPool);
    event VerifierUpdated(address verifier);

    constructor(
        address admin,
        address _entropyPool,
        address _verifier,
        address _mergToken
    ) {
        require(admin != address(0), "Invalid admin address");
        require(_entropyPool != address(0), "Invalid entropy pool");
        require(_verifier != address(0), "Invalid verifier");
        require(_mergToken != address(0), "Invalid token");

        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(ADMIN_ROLE, admin);

        entropyPool = EntropyPool(_entropyPool);
        verifier = IQRHRPVerifier(_verifier);
        mergToken = IERC20(_mergToken);
    }

    /**
     * @notice Commits entropy from the user into the entropy pool.
     * @param root The Merkle root or entropy commitment.
     * @param proof The zero-knowledge proof bytes for quantum-safe validation.
     */
    function commitEntropy(
        bytes32 root,
        bytes calldata proof
    ) external nonReentrant {
        require(root != bytes32(0), "Invalid root");
        require(proof.length > 0, "Invalid proof");

        bool verified = verifier.verifyProof(msg.sender, root, proof);
        require(verified, "Verification failed");

        // Explicitly check the return value of commitEntropy for robustness.
        // Assuming commitEntropy returns a boolean indicating success.
        require(
            entropyPool.commitEntropy(root, proof),
            "Entropy commit failed"
        );

        emit EntropyCommitted(msg.sender, root);
        emit Verified(msg.sender, verified);
    }

    /**
     * @notice Allows admin to update the entropy pool contract.
     */
    function setEntropyPool(address _newPool) external onlyRole(ADMIN_ROLE) {
        require(_newPool != address(0), "Invalid pool address");
        entropyPool = EntropyPool(_newPool);
        emit PoolUpdated(_newPool);
    }

    /**
     * @notice Allows admin to update the verifier contract.
     */
    function setVerifier(address _newVerifier) external onlyRole(ADMIN_ROLE) {
        require(_newVerifier != address(0), "Invalid verifier address");
        verifier = IQRHRPVerifier(_newVerifier);
        emit VerifierUpdated(_newVerifier);
    }

    /**
     * @notice Withdraw Merge tokens for operations or rewards.
     * @dev This function is modified to only allow withdrawal to the contract itself
     *      to prevent arbitrary draining by a compromised admin key. For actual external
     *      withdrawals, a more secure, multi-sig or time-locked mechanism should be used.
     * @param to The address to send tokens to (restricted to `address(this)`).
     * @param amount The amount of tokens to withdraw.
     */
    function withdrawTokens(
        address to,
        uint256 amount
    ) external onlyRole(ADMIN_ROLE) {
        require(to == address(this), "Withdrawal target must be this contract"); // Restrict 'to' address
        require(amount > 0, "Invalid amount");
        mergToken.transfer(to, amount);
    }
}
±*cascade082:file:///c:/Users/mergetoken/contracts/MergeCoreManager.sol