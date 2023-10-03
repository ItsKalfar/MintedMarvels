// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Zether is ERC20 {
    constructor() ERC20("Zether", "ZTH") {
        _mint(msg.sender, 100000000 * 10 ** 18);
    }
}
