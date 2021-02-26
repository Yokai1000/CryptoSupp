pragma solidity >=0.4.25 <0.6.0;

import "./Transaction.sol";

contract Estate {
    Transaction[] contracts;

    function create(
        string memory _address,
        string memory _zip,
        string memory _city,
        uint256 _price,
        address payable _buyer
    ) public returns (Transaction transaction) {
        transaction = new Transaction(
            _address,
            _zip,
            _city,
            _price,
            msg.sender,
            _buyer
        );
        contracts.push(transaction);
    }

    function getInstance(uint256 index)
        public
        view
        returns (Transaction instance)
    {
        require(index < contracts.length, "index out of range");

        instance = contracts[index];
    }

    function getInstances()
        public
        view
        returns (Transaction[] memory instances)
    {
        instances = contracts;
    }

    function getInstanceCount() public view returns (uint256 count) {
        count = contracts.length;
    }
}
