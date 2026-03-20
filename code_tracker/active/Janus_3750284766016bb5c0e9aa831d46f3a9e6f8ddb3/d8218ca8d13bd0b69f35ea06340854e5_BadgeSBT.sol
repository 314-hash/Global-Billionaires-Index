î// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { LibBadgeSBT } from "./libraries/LibBadgeSBT.sol";

contract BadgeSBTFacet {
    using LibBadgeSBT for LibBadgeSBT.StorageStruct;

    /* ---------------------- MINT ---------------------- */

    function mintSBT(address to, uint256 tokenId, string memory uri) external {
        LibBadgeSBT.StorageStruct storage ds = LibBadgeSBT.diamondStorage();
        ds._mint(to, tokenId, uri);
    }

    function batchMintSBT(
        address[] calldata tos,
        uint256[] calldata ids,
        string[] calldata uris
    ) external {
        require(tos.length == ids.length && ids.length == uris.length, "Length mismatch");

        LibBadgeSBT.StorageStruct storage ds = LibBadgeSBT.diamondStorage();

        for (uint256 i = 0; i < tos.length; i++) {
            ds._mint(tos[i], ids[i], uris[i]);
        }
    }

    /* ---------------------- REVOKE ---------------------- */

    function revokeSBT(uint256 tokenId) external {
        LibBadgeSBT.StorageStruct storage ds = LibBadgeSBT.diamondStorage();
        ds._revoke(tokenId);
    }

    function batchRevokeSBT(uint256[] calldata tokenIds) external {
        LibBadgeSBT.StorageStruct storage ds = LibBadgeSBT.diamondStorage();

        for (uint256 i = 0; i < tokenIds.length; i++) {
            ds._revoke(tokenIds[i]);
        }
    }

    /* ---------------------- VIEW ---------------------- */

    function ownerOf(uint256 tokenId) external view returns (address) {
        return LibBadgeSBT.diamondStorage().owners[tokenId];
    }

    function tokenURI(uint256 tokenId) external view returns (string memory) {
        return LibBadgeSBT.diamondStorage().tokenURIs[tokenId];
    }
}
î"(3750284766016bb5c0e9aa831d46f3a9e6f8ddb32Cfile:///c:/Users/Janus/cannatoken/cannatoken/contracts/BadgeSBT.sol:file:///c:/Users/Janus