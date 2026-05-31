// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {quickStarter} from "./quickStarter.sol";

contract Factory {
    mapping(address owner => address[] campaign) public campaigns;

    function CreateACampaign(
        uint256 fee,
        //uint256 date,
        string memory title
    ) public {
        //require(block.timestamp < date);
        require(fee > 0);
        address owner = msg.sender;
        quickStarter qs = new quickStarter(owner, fee, title);
        campaigns[msg.sender].push(address(qs));
    }

    //helper
    function getuserCampaign(
        address _user
    ) public view returns (address[] memory) {
        return campaigns[_user];
    }
}
