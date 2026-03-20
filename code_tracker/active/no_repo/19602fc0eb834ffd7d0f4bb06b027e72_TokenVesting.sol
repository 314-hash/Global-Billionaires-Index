ò// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title TokenVesting
 * @notice Locks allocated tokens and releases them linearly over 1 year.
 *         Used for Team, Advisors, Validators, Treasury, and Grants.
 *         Public sale tokens are NOT locked.
 */
contract TokenVesting is Ownable {
    IERC20 public immutable token;
    uint256 public immutable startTime;
    uint256 public constant DURATION = 365 days;

    struct Beneficiary {
        uint256 totalAllocation;
        uint256 released;
    }

    mapping(address => Beneficiary) public beneficiaries;

    event TokensReleased(address indexed beneficiary, uint256 amount);
    event BeneficiaryAdded(address indexed beneficiary, uint256 amount);

    constructor(address _token, uint256 _startTime, address initialOwner)
        Ownable(initialOwner)
    {
        require(_token != address(0), "Invalid token");
        token = IERC20(_token);
        startTime = _startTime;
    }

    /**
     * @notice Add or update vesting allocation for a beneficiary.
     * @dev Only owner (admin / treasury) can call.
     */
    function addBeneficiary(address _beneficiary, uint256 _amount)
        external
        onlyOwner
    {
        require(_beneficiary != address(0), "Invalid address");
        beneficiaries[_beneficiary].totalAllocation += _amount;
        emit BeneficiaryAdded(_beneficiary, _amount);
    }

    /**
     * @notice Releases vested tokens for caller.
     */
    function release() external {
        uint256 releasable = vestedAmount(msg.sender) - beneficiaries[msg.sender].released;
        require(releasable > 0, "No tokens to release");

        beneficiaries[msg.sender].released += releasable;
        token.transfer(msg.sender, releasable);

        emit TokensReleased(msg.sender, releasable);
    }

    /**
     * @notice Returns vested amount of tokens for an address.
     */
    function vestedAmount(address _beneficiary) public view returns (uint256) {
        Beneficiary memory b = beneficiaries[_beneficiary];
        if (block.timestamp < startTime) {
            return 0;
        } else if (block.timestamp >= startTime + DURATION) {
            return b.totalAllocation;
        } else {
            uint256 elapsed = block.timestamp - startTime;
            return (b.totalAllocation * elapsed) / DURATION;
        }
    }
}
ò26file:///c:/Users/mergetoken/contracts/TokenVesting.sol