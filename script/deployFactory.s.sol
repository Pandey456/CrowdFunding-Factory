// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {Factory} from "../src/factory.sol";

contract deployFactory is Script {
    function run() external returns (Factory) {
        vm.startBroadcast();
        Factory factory = new Factory();
        vm.stopBroadcast();
        return factory;
    }
}
