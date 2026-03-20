é$// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title MerkleBooster
/// @notice One-time Merkle-proof based booster reward distributor for staking pools
/// - Admin publishes a Merkle root per epoch (uint256 epoch)
/// - Each leaf = keccak256(abi.encodePacked(index, account, amount))
/// - Users call `claim(epoch, index, account, amount, proof)` to receive the allocated booster amount
contract MerkleBooster is AccessControl, ReentrancyGuard {
    bytes32 public constant ROOT_MANAGER_ROLE = keccak256("ROOT_MANAGER_ROLE");

    IERC20 public immutable rewardToken; // e.g., MERG token
    address public admin;

    // epoch => merkle root
    mapping(uint256 => bytes32) public merkleRoot;

    // epoch => claimed bitmap (index => bool stored as bits)
    mapping(uint256 => mapping(uint256 => uint256)) private claimedBitMap;

    event MerkleRootSet(
        uint256 indexed epoch,
        bytes32 indexed root,
        address indexed setter
    );
    event Claimed(
        uint256 indexed epoch,
        uint256 index,
        address indexed account,
        uint256 amount
    );

    constructor(address _rewardToken, address _admin) {
        require(_rewardToken != address(0), "Invalid reward token");
        require(_admin != address(0), "Invalid admin");
        rewardToken = IERC20(_rewardToken);
        admin = _admin;

        _grantRole(DEFAULT_ADMIN_ROLE, _admin);
        _grantRole(ROOT_MANAGER_ROLE, _admin);
    }

    /// @notice Set Merkle root for an epoch
    /// @dev Only addresses with ROOT_MANAGER_ROLE can set roots
    function setMerkleRoot(
        uint256 epoch,
        bytes32 root
    ) external onlyRole(ROOT_MANAGER_ROLE) {
        merkleRoot[epoch] = root;
        emit MerkleRootSet(epoch, root, msg.sender);
    }

    /// @notice Check whether an index has been claimed in an epoch
    function isClaimed(
        uint256 epoch,
        uint256 index
    ) public view returns (bool) {
        uint256 wordIndex = index >> 8; // 256 bits per word -> >> 8 because 2^8 = 256
        uint256 bitIndex = index & 0xff;
        uint256 word = claimedBitMap[epoch][wordIndex];
        uint256 mask = (1 << bitIndex);
        return (word & mask) != 0;
    }

    /// @notice Claim allocated amount by providing a Merkle proof
    /// @param epoch distribution epoch id
    /// @param index index of the leaf in the original dataset
    /// @param account address to claim for (should be msg.sender in typical flows)
    /// @param amount token amount allocated (in token's smallest unit)
    /// @param merkleProof array of sibling nodes from leaf to root
    function claim(
        uint256 epoch,
        uint256 index,
        address account,
        uint256 amount,
        bytes32[] calldata merkleProof
    ) external nonReentrant {
        require(!isClaimed(epoch, index), "Already claimed");
        require(amount > 0, "Zero amount");

        bytes32 root = merkleRoot[epoch];
        require(root != bytes32(0), "Root not set");

        // Recreate leaf node
        bytes32 node = keccak256(abi.encodePacked(index, account, amount));
        require(MerkleProof.verify(merkleProof, root, node), "Invalid proof");

        // Mark claimed
        _setClaimed(epoch, index);

        // Transfer reward token
        require(rewardToken.transfer(account, amount), "Token transfer failed");

        emit Claimed(epoch, index, account, amount);
    }

    function _setClaimed(uint256 epoch, uint256 index) private {
        uint256 wordIndex = index >> 8;
        uint256 bitIndex = index & 0xff;
        claimedBitMap[epoch][wordIndex] =
            claimedBitMap[epoch][wordIndex] |
            (1 << bitIndex);
    }

    /// @notice Admin can fund the contract by transferring reward tokens directly or via this helper (approve first)
    function fund(uint256 amount) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(amount > 0, "Zero amount");
        require(
            rewardToken.transferFrom(msg.sender, address(this), amount),
            "TransferFrom failed"
        );
    }

    /// @notice Recover accidental ERC20 transfers (admin only)
    function recoverERC20(
        address tokenAddress,
        uint256 tokenAmount
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        IERC20(tokenAddress).transfer(msg.sender, tokenAmount);
    }
}
é$*cascade0827file:///c:/Users/mergetoken/contracts/MerkleBooster.sol