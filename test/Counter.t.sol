// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {Factory} from "../src/factory.sol";
import {quickStarter} from "../src/quickStarter.sol";

contract CounterTest is Test {
    Factory public factory;
    address public USER;
    address public DONOR;

    function setUp() external {
        factory = new Factory();
        USER = makeAddr("user");
        DONOR = makeAddr("donor");
    }

    function testCreatingACampaign() public {
        vm.prank(USER);
        factory.CreateACampaign(10 ether, "This is test 1 campaign");
        address[] memory userCampaign = factory.getuserCampaign(USER);
        assertEq(userCampaign.length, 1);
    }
}
