µ// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "../interfaces/IStaking.sol";
import "../interfaces/ISBT.sol";
import "../interfaces/IDAO.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ConsensusAdapter is Ownable {
    IStaking public staking;
    ISBT public sbt;
    IDAO public dao;

    constructor(
        address initialOwner,
        address stakingAddress,
        address sbtAddress,
        address daoAddress
    ) Ownable(initialOwner) {
        staking = IStaking(stakingAddress);
        sbt = ISBT(sbtAddress);
        dao = IDAO(daoAddress);
    }

    // ---------------------------------------------------------------------
    //  STAKING DELEGATION
    // ---------------------------------------------------------------------

    function delegateVoting(address from, address to) external {
        require(msg.sender == from, "Not authorized");
        staking.delegate(from, to);
    }

    // ---------------------------------------------------------------------
    //  MINT SBT
    // ---------------------------------------------------------------------

    function mintCredential(
        address to,
        uint256 tokenId,
        string calldata uri
    ) external onlyOwner {
        // Your SBT only accepts (address,uint256,string)
        sbt.mintSBT(to, tokenId, uri);
    }

    // ---------------------------------------------------------------------
    //  SET USER / RENTAL-LIKE RIGHTS (ERC-4907 STYLE)
    // ---------------------------------------------------------------------

    // function assignUserRights(
    //    uint256 tokenId,
    //    address user,
    //    uint64 expiresAt
    // ) external onlyOwner {
    //    // Your SBT does NOT use setLease()
    //    // It uses ERC-4907's setUser(tokenId,user,expiresAt)
    //    sbt.setUser(tokenId, user, expiresAt);
    // }

    // ---------------------------------------------------------------------
    //  CONTROLLER CHECK (used for permission gating)
    // ---------------------------------------------------------------------

    function isApprovedController(address who) external view returns (bool) {
        return sbt.controllers(who);
    }

    // ---------------------------------------------------------------------
    //  DAO VOTING PACKET
    // ---------------------------------------------------------------------

    function submitVotePacket(
        bytes32 proposalId,
        address voter,
        uint256 weight,
        uint64 timestamp,
        bytes calldata signature
    ) external {
        IDAO.VotePacket memory packet = IDAO.VotePacket({
            proposalId: proposalId,
            voter: voter,
            weight: weight,
            timestamp: timestamp,
            signature: signature
        });
        dao.submitVotePacket(packet);
    }

    // ---------------------------------------------------------------------
    //  CROSS-CHAIN PROPOSAL EXECUTION
    // ---------------------------------------------------------------------

    function executeCrossChainProposal(
        bytes32 proposalId,
        string calldata targetChain,
        bytes calldata payload
    ) external onlyOwner {
        dao.executeCrossChainProposal(proposalId, targetChain, payload);
    }
}
µ"(3750284766016bb5c0e9aa831d46f3a9e6f8ddb32Ufile:///c:/Users/Janus/cannatoken/cannatoken/contracts/consensus/ConsensusAdapter.sol:file:///c:/Users/Janus