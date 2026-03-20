’'// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

interface IERC6909 {
    function mint(address to, uint256 id, uint256 amount) external;

    function burn(address from, uint256 id, uint256 amount) external;

    function balanceOf(
        address account,
        uint256 id
    ) external view returns (uint256);
}

interface IERC7007 {
    function setMetadata(uint256 tokenId, string calldata metadataURI) external;

    function getMetadata(uint256 tokenId) external view returns (string memory);
}

contract CannaTokenV2 is Ownable, IERC6909, IERC7007 {
    using Strings for uint256;

    string public name = "Cannabis";
    string public symbol = "CANNA";

    mapping(uint256 => mapping(address => uint256)) private _balances;
    mapping(uint256 => string) private _metadata;
    mapping(uint256 => bool) public tokenExists;
    mapping(uint256 => uint256) public totalSupply;

    // Operator system for controlled access
    mapping(address => bool) public operators;

    event OperatorSet(address indexed operator, bool status);
    event TokenMinted(address indexed to, uint256 indexed id, uint256 amount);
    event TokenBurned(address indexed from, uint256 indexed id, uint256 amount);
    event MetadataSet(uint256 indexed tokenId, string metadataURI);

    modifier onlyOperatorOrOwner() {
        require(
            msg.sender == owner() || operators[msg.sender],
            "CannaTokenV2: caller is not operator or owner"
        );
        _;
    }

    constructor(address initialOwner) Ownable(initialOwner) {
        // Mint initial supply to initialOwner
        // 200,000,000 of tokenId 1
        _balances[1][initialOwner] = 200_000_000 * 1e18;
        totalSupply[1] = 200_000_000 * 1e18;
        tokenExists[1] = true;

        emit TokenMinted(initialOwner, 1, 200_000_000 * 1e18);
    }

    /**
     * @notice Set operator status for an address
     * @param operator Address to grant/revoke operator status
     * @param status True to grant, false to revoke
     */
    function setOperator(address operator, bool status) external onlyOwner {
        require(
            operator != address(0),
            "CannaTokenV2: operator is zero address"
        );
        operators[operator] = status;
        emit OperatorSet(operator, status);
    }

    /**
     * @notice Mint tokens - can be called by owner or authorized operators
     * @param to Address to mint to
     * @param id Token ID
     * @param amount Amount to mint
     */
    function mint(
        address to,
        uint256 id,
        uint256 amount
    ) external override onlyOperatorOrOwner {
        require(to != address(0), "CannaTokenV2: cannot mint to zero address");
        _balances[id][to] += amount;
        totalSupply[id] += amount;
        tokenExists[id] = true;

        emit TokenMinted(to, id, amount);
    }

    /**
     * @notice Burn tokens - can be called by owner or authorized operators
     * @param from Address to burn from
     * @param id Token ID
     * @param amount Amount to burn
     */
    function burn(
        address from,
        uint256 id,
        uint256 amount
    ) external override onlyOperatorOrOwner {
        require(
            _balances[id][from] >= amount,
            "CannaTokenV2: insufficient balance"
        );
        _balances[id][from] -= amount;
        totalSupply[id] -= amount;

        emit TokenBurned(from, id, amount);
    }

    /**
     * @notice Get balance of an account for a specific token ID
     * @param account Address to check
     * @param id Token ID
     * @return Balance of the account
     */
    function balanceOf(
        address account,
        uint256 id
    ) external view override returns (uint256) {
        return _balances[id][account];
    }

    /**
     * @notice Set metadata URI for a token ID
     * @param tokenId Token ID
     * @param metadataURI Metadata URI
     */
    function setMetadata(
        uint256 tokenId,
        string calldata metadataURI
    ) external override onlyOwner {
        require(tokenExists[tokenId], "CannaTokenV2: token ID does not exist");
        _metadata[tokenId] = metadataURI;

        emit MetadataSet(tokenId, metadataURI);
    }

    /**
     * @notice Get metadata URI for a token ID
     * @param tokenId Token ID
     * @return Metadata URI
     */
    function getMetadata(
        uint256 tokenId
    ) external view override returns (string memory) {
        return _metadata[tokenId];
    }

    /**
     * @notice Check if an address is an operator
     * @param account Address to check
     * @return True if the address is an operator
     */
    function isOperator(address account) external view returns (bool) {
        return operators[account];
    }
}
’'*cascade08"(451ef9bff17f1e842575f8a4116d19212b61d1a52Gfile:///c:/Users/Janus/cannatoken/cannatoken/contracts/CannaTokenV2.sol:file:///c:/Users/Janus