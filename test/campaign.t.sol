// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {Factory} from "../src/factory.sol";
import {quickStarter} from "../src/quickStarter.sol";

contract CounterTest is Test {
    Factory public factory;
    address public USER;
    address public DONOR;
    quickStarter public quickstarter;

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

    function testDonateFunction() public {
        vm.prank(USER);
        factory.CreateACampaign(10 ether, "This is test 1 campaign");

        address[] memory userCampaign = factory.getuserCampaign(USER);
        address campaignCA = userCampaign[0];
        quickStarter qs = quickStarter(campaignCA);
        hoax(DONOR, 10 ether);
        qs.donate{value: 1 ether}();

        uint256 donated = qs.donarRecords(DONOR);
        assertEq(donated, 1 ether);
    }

    function testWithdrawFunction() public {
        vm.prank(USER);
        factory.CreateACampaign(10 ether, "This is test 1 campaign");
        address[] memory userCampaign = factory.getuserCampaign(USER);
        address campaignCA = userCampaign[0];
        quickStarter qs = quickStarter(campaignCA);
        hoax(DONOR, 10 ether);
        qs.donate{value: 1 ether}();
        vm.prank(USER);
        qs.withdraw();
        uint256 balance = address(qs).balance;
        assertEq(balance, 0);
    }

    function testWithdrawOnlyOwnerFunction() public {
        vm.prank(USER);
        factory.CreateACampaign(10 ether, "This is test 1 campaign");
        address[] memory userCampaign = factory.getuserCampaign(USER);
        address campaignCA = userCampaign[0];
        quickStarter qs = quickStarter(campaignCA);
        hoax(DONOR, 10 ether);
        qs.donate{value: 1 ether}();
        vm.expectRevert("only owner can perfrom this action");
        vm.prank(DONOR);
        qs.withdraw();
    }

    function testGetAllCampaignsAndGlobalPush() public {
        vm.prank(USER);
        factory.CreateACampaign(5 ether, "User Campaign");

        vm.prank(DONOR);
        factory.CreateACampaign(2 ether, "Donor Campaign");

        address[] memory allCampaigns = factory.getAllCampaign();

        assertEq(
            allCampaigns.length,
            2,
            "Global campaign array length mismatch"
        );

        address expectedUserCampaign = factory.getuserCampaign(USER)[0];
        address expectedDonorCampaign = factory.getuserCampaign(DONOR)[0];

        assertEq(
            allCampaigns[0],
            expectedUserCampaign,
            "First campaign address mismatch"
        );
        assertEq(
            allCampaigns[1],
            expectedDonorCampaign,
            "Second campaign address mismatch"
        );
    }
}
