—// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MergAirdrop is Ownable {
    IERC20 public mergToken;
    uint256 public claimAmount;
    mapping(address => bool) public hasClaimed;

    event Claimed(address indexed user, uint256 amount);
    event ClaimAmountUpdated(uint256 newAmount);

    constructor(address _mergToken, uint256 _claimAmount, address initialOwner)
        Ownable(initialOwner) // âœ… pass owner to base constructor
    {
        mergToken = IERC20(_mergToken);
        claimAmount = _claimAmount;
    }

    function setClaimAmount(uint256 _newAmount) external onlyOwner {
        claimAmount = _newAmount;
        emit ClaimAmountUpdated(_newAmount);
    }

    function claim() external {
        require(!hasClaimed[msg.sender], "Already claimed");
        require(claimAmount > 0, "Claim disabled");

        hasClaimed[msg.sender] = true;
        require(
            mergToken.transfer(msg.sender, claimAmount),
            "Transfer failed"
        );

        emit Claimed(msg.sender, claimAmount);
    }

    function withdrawUnclaimed(address to) external onlyOwner {
        uint256 balance = mergToken.balanceOf(address(this));
        require(balance > 0, "No balance");
        mergToken.transfer(to, balance);
    }
}
—25file:///c:/Users/mergetoken/contracts/MergAirdrop.sol