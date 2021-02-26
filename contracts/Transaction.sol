pragma solidity >=0.4.25 <0.6.0;

contract Transaction {
    enum ContractState {
        WaitingSellerSignature,
        WaitingBuyerSignature,
        Finalized,
        Rejected
    }
    ContractState public contractState = ContractState.WaitingSellerSignature;

    address public seller;
    address payable public buyer;

    string public homeAddress;
    string public zip;
    string public city;
    uint256 public price;

    constructor(
        string memory _address,
        string memory _zip,
        string memory _city,
        uint256 _price,
        address _seller,
        address payable _buyer
    ) public {
        seller = _seller;
        buyer = _buyer;
        homeAddress = _address;
        zip = _zip;
        city = _city;
        price = _price;
    }

    function sellerSignContract() public {
        require(seller == msg.sender, "Only seller can sign contract");
        require(
            contractState == ContractState.WaitingSellerSignature,
            "Wrong contract state"
        );
        contractState = ContractState.WaitingBuyerSignature;
    }

    function buyerSignContractAndPay() public payable {
        require(buyer == msg.sender, "Only buyer can sign contract");
        require(
            contractState == ContractState.WaitingBuyerSignature,
            "Wrong contract state"
        );
        require(msg.value >= price, "Buyer need more for pay");
        buyer.transfer(price);
    }
}
