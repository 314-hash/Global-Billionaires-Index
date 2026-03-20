ý// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./NamespacedStorage.sol";

library PoCareStorage {
    bytes32 internal constant NAMESPACE = keccak256("kanna.consensus.pocare");

    struct CareRecord {
        uint256 safetyScore;     // e.g., 0..10000
        uint16 incidentsReported;
        uint8 complianceLevel;   // e.g., 0 = none, 1 = basic, 2 = certified
        uint64 lastAuditTimestamp;
        bytes32 auditReportCID; // IPFS/Arweave hash for audit report
    }

    struct Layout {
        mapping(bytes32 => CareRecord) merchantCare; // businessId -> care record
        address incidentReporter;                   // role permitted to report incidents
    }

    function layout() internal pure returns (Layout storage l) {
        bytes32 slot = NamespacedStorage.getStorage(NAMESPACE);
        assembly { l.slot := slot }
    }
}
ý"(451ef9bff17f1e842575f8a4116d19212b61d1a52Zfile:///c:/Users/Janus/cannatoken/cannatoken/contracts/consensus/storage/PoCareStorage.sol:file:///c:/Users/Janus