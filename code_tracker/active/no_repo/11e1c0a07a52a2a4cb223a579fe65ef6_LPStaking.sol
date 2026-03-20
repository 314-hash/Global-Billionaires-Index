¨(// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LPStaking is Ownable, ReentrancyGuard {
    IERC20 public immutable stakingToken; // Pancake LP token
    IERC20 public immutable rewardToken; // MERG token

    uint256 public rewardRate; // MERG per second
    uint256 public lastUpdateTime;
    uint256 public rewardPerTokenStored;

    mapping(address => uint256) public userRewardPerTokenPaid;
    mapping(address => uint256) public rewards;
    mapping(address => uint256) public stakedBalance;

    uint256 private _totalStaked;

    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);
    event RewardRateUpdated(uint256 newRate);

    // ------------------------------------------------------
    // Constructor FIXED (Ownable requires address)
    // ------------------------------------------------------
    constructor(
        address _stakingToken, // PCS LP token
        address _rewardToken, // MERG token
        uint256 _rewardRate, // MERG per second
        address admin // owner
    ) Ownable(admin) {
        require(_stakingToken != address(0), "Invalid LP token");
        require(_rewardToken != address(0), "Invalid reward token");

        stakingToken = IERC20(_stakingToken);
        rewardToken = IERC20(_rewardToken);

        rewardRate = _rewardRate;
        lastUpdateTime = block.timestamp;
    }

    // ------------------------------------------------------
    // Reward calculation
    // ------------------------------------------------------
    modifier updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;

        if (account != address(0)) {
            rewards[account] = earned(account);
            userRewardPerTokenPaid[account] = rewardPerTokenStored;
        }
        _;
    }

    function totalStaked() public view returns (uint256) {
        return _totalStaked;
    }

    function rewardPerToken() public view returns (uint256) {
        if (_totalStaked == 0) return rewardPerTokenStored;

        return
            rewardPerTokenStored +
            ((rewardRate * (block.timestamp - lastUpdateTime) * 1e18) /
                _totalStaked);
    }

    function earned(address account) public view returns (uint256) {
        return
            (stakedBalance[account] *
                (rewardPerToken() - userRewardPerTokenPaid[account])) /
            1e18 +
            rewards[account];
    }

    // ------------------------------------------------------
    // Stake / Withdraw / Claim
    // ------------------------------------------------------
    function stake(
        uint256 amount
    ) external nonReentrant updateReward(msg.sender) {
        require(amount > 0, "Cannot stake 0");
        require(
            stakingToken.transferFrom(msg.sender, address(this), amount),
            "TransferFrom failed"
        );

        _totalStaked += amount;
        stakedBalance[msg.sender] += amount;

        emit Staked(msg.sender, amount);
    }

    function withdraw(
        uint256 amount
    ) external nonReentrant updateReward(msg.sender) {
        require(amount > 0, "Cannot withdraw 0");
        require(stakedBalance[msg.sender] >= amount, "Insufficient balance");

        _totalStaked -= amount;
        stakedBalance[msg.sender] -= amount;

        require(stakingToken.transfer(msg.sender, amount), "Transfer failed");

        emit Withdrawn(msg.sender, amount);
    }

    function claimReward() external nonReentrant updateReward(msg.sender) {
        uint256 reward = rewards[msg.sender];
        require(reward > 0, "No reward");

        rewards[msg.sender] = 0;
        require(
            rewardToken.transfer(msg.sender, reward),
            "Reward transfer failed"
        );

        emit RewardPaid(msg.sender, reward);
    }

    // ------------------------------------------------------
    // Admin controls
    // ------------------------------------------------------
    function setRewardRate(
        uint256 newRate
    ) external onlyOwner updateReward(address(0)) {
        rewardRate = newRate;
        emit RewardRateUpdated(newRate);
    }

    // Emergency withdraw (no rewards)
    function emergencyWithdraw() external nonReentrant {
        uint256 amount = stakedBalance[msg.sender];
        require(amount > 0, "Nothing staked");

        stakedBalance[msg.sender] = 0;
        _totalStaked -= amount;

        // FIX: Added require to check return value of transfer
        require(
            stakingToken.transfer(msg.sender, amount),
            "Emergency transfer failed"
        );
        // FIX: Added event emission for emergency withdrawal
        emit Withdrawn(msg.sender, amount);
    }
}
¨(*cascade0823file:///c:/Users/mergetoken/contracts/LPStaking.sol