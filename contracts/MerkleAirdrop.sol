// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {MerkleProof} from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MerkleAirdrop {
    mapping(bytes32 => bool) _claimStatus;
    IERC20 private immutable _token;
    bytes32 private _merkleRoot;
    address private _owner;
    bool private active;

    error InvalidProof();
    error AlreadyClaimed();
    error NotOwner();
    error AirdropEnded();

    event AirdropClaim(address indexed account, uint256 indexed amount);

    constructor(address owner, address token, bytes32 merkleRoot) {
        _token = IERC20(token);
        _merkleRoot = merkleRoot;
        _owner = owner;
    }

    function checkOwner() private view {
        if (msg.sender != _owner) revert NotOwner();
    }

    function startAirdrop() external {
        checkOwner();
        active = true;
    }

    function endAirdrop() external {
        checkOwner();
        active = false;
    }

    function getLeafHash(
        address to,
        uint256 amount
    ) public pure returns (bytes32) {
        return keccak256(abi.encode(to, amount));
    }

    function claimAirdrop(
        bytes32[] memory proof,
        uint256 amount
    ) external returns (bool success) {
        bytes32 leaf = getLeafHash(msg.sender, amount);

        //checks
        if (_claimStatus[leaf]) revert AlreadyClaimed();
        if (!(MerkleProof.verify(proof, _merkleRoot, leaf)))
            revert InvalidProof();

        // mark as claimed
        _claimStatus[leaf] = true;

        // transfer tokens
        _token.transfer(msg.sender, amount);

        // return true
        success = true;

        // emit claim event
        emit AirdropClaim(msg.sender, amount);
    }

    function updateMerkleRoot(bytes32 newMerkleRoot) external {
        checkOwner();
        _merkleRoot = newMerkleRoot;
    }

    function withdraw() external {
        checkOwner();
        _token.transfer(msg.sender, _token.balanceOf(address(this)));
    }

    function isClaimed(bytes32 leaf) external view returns (bool) {
        return _claimStatus[leaf];
    }

    function getToken() external view returns (address) {
        return address(_token);
    }

    function getOwner() external view returns (address) {
        return _owner;
    }

    function verifyProof(
        bytes32[] memory proof,
        address to,
        uint256 amount
    ) external view returns (bool) {
        bytes32 leaf = getLeafHash(to, amount);
        return MerkleProof.verify(proof, _merkleRoot, leaf);
    }
}
