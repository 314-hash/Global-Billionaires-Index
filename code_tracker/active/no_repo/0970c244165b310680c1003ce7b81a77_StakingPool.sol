ª'// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract StakingPool is ReentrancyGuard, AccessControl {
    bytes32 public constant REWARD_DISTRIBUTOR_ROLE =
        keccak256("REWARD_DISTRIBUTOR_ROLE");

    IERC20 public stakingToken;
    IERC20 public rewardToken;

    uint256 public rewardRate; // reward tokens per block
    uint256 public lastUpdateBlock;
    uint256 public rewardPerTokenStored;

    mapping(address => uint256) public userRewardPerTokenPaid;
    mapping(address => uint256) public rewards;
    mapping(address => uint256) public balances;

    uint256 private _totalSupply;

    // Added a constant for maximum reward rate to prevent excessively high values
    uint256 public constant MAX_REWARD_RATE = 1000000000000000000000000; // Example: 10^24, adjust as needed

    constructor(
        address _stakingToken,
        address _rewardToken,
        address admin,
        uint256 _rewardRate
    ) {
        require(
            _stakingToken != address(0) && _rewardToken != address(0),
            "Invalid token address"
        );
        stakingToken = IERC20(_stakingToken);
        rewardToken = IERC20(_rewardToken);
        require(_rewardRate <= MAX_REWARD_RATE, "Initial reward rate too high"); // Check initial rate
        rewardRate = _rewardRate;

        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        lastUpdateBlock = block.number;
    }

    modifier updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateBlock = block.number;

        if (account != address(0)) {
            rewards[account] = earned(account);
            userRewardPerTokenPaid[account] = rewardPerTokenStored;
        }
        _;
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view returns (uint256) {
        return balances[account];
    }

    function rewardPerToken() public view returns (uint256) {
        if (_totalSupply == 0) return rewardPerTokenStored;
        return
            rewardPerTokenStored +
            ((rewardRate * (block.number - lastUpdateBlock) * 1e18) /
                _totalSupply);
    }

    function earned(address account) public view returns (uint256) {
        return
            ((balances[account] *
                (rewardPerToken() - userRewardPerTokenPaid[account])) / 1e18) +
            rewards[account];
    }

    function stake(
        uint256 amount
    ) external nonReentrant updateReward(msg.sender) {
        require(amount > 0, "Cannot stake 0");
        _totalSupply += amount;
        balances[msg.sender] += amount;
        // FIX: Added require to check return value of transferFrom
        require(
            stakingToken.transferFrom(msg.sender, address(this), amount),
            "TransferFrom failed"
        );
    }

    function withdraw(
        uint256 amount
    ) external nonReentrant updateReward(msg.sender) {
        require(amount > 0, "Cannot withdraw 0");
        require(balances[msg.sender] >= amount, "Insufficient balance"); // Added check for sufficient balance
        _totalSupply -= amount;
        balances[msg.sender] -= amount;
        // FIX: Added require to check return value of transfer
        require(
            stakingToken.transfer(msg.sender, amount),
            "Staking token transfer failed"
        );
    }

    function claimReward() external nonReentrant updateReward(msg.sender) {
        uint256 reward = rewards[msg.sender];
        if (reward > 0) {
            rewards[msg.sender] = 0;
            // FIX: Added require to check return value of transfer
            require(
                rewardToken.transfer(msg.sender, reward),
                "Reward token transfer failed"
            );
        }
    }

    function setRewardRate(
        uint256 _rate
    ) external onlyRole(REWARD_DISTRIBUTOR_ROLE) {
        // FIX: Added check for MAX_REWARD_RATE
        require(_rate <= MAX_REWARD_RATE, "Reward rate too high");
        rewardRate = _rate;
    }

    function recoverERC20(
        address tokenAddress,
        uint256 tokenAmount
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        // FIX: Prevent recovery of stakingToken or rewardToken
        require(
            tokenAddress != address(stakingToken),
            "Cannot recover staking token"
        );
        require(
            tokenAddress != address(rewardToken),
            "Cannot recover reward token"
        );
        // FIX: Added require to check return value of transfer
        require(
            IERC20(tokenAddress).transfer(msg.sender, tokenAmount),
            "Token recovery transfer failed"
        );
    }
}
ª'*cascade0825file:///c:/Users/mergetoken/contracts/StakingPool.sol