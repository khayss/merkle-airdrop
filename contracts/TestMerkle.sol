// SPDX-License-Identifier: M
pragma solidity ^0.8.20;

import {MerkleProof} from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract TestMerkle {
    bytes32 _merkleRoot;

    constructor(bytes32 merkleRoot) {
        _merkleRoot = merkleRoot;
    }

    function verifyProof(
        bytes32[] memory proof,
        bytes32 leaf
    ) public view returns (bool) {
        return MerkleProof.verify(proof, _merkleRoot, leaf);
    }
}
