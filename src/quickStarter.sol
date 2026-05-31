// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract quickStarter {
    address owner;
    struct campaignData {
        address owner;
        uint256 goalAmount;
        string title;
    }
    campaignData public campaign;

    mapping(address donar => uint256 amt) public donarRecords;

    constructor(address _sender, uint256 amount, string memory _title) {
        owner = _sender;
        campaign.owner = _sender;
        campaign.goalAmount = amount;
        campaign.title = _title;
    }

    function donate() public payable {
        require(msg.value > 0, "must be more than 0");
        donarRecords[msg.sender] += msg.value;
    }

    function withdraw() public {
        require(msg.sender == owner, "only owner can perfrom this action");
        (bool success, ) = campaign.owner.call{value: address(this).balance}(
            ""
        );
        require(success, "WithDraw Failed");
    }
}
