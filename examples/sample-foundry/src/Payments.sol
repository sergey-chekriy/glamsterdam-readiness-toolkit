// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Payments {
    event Paid(address indexed to, uint256 amount);
    function pay(address payable to) external payable {
        (bool ok,) = to.call{value: msg.value}("");
        require(ok, "payment failed");
        emit Paid(to, msg.value);
    }
}
