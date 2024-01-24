// pragma solidity ^0.5.10;

contract HouseRegistrationContract{
    // Model a house
    struct House{
        uint houseNo;
        Owner owner;
    }

    // Model an Owner
    struct Owner{
        string name;
        address walletAddress;
    }

    // Read/write houses
    mapping(uint => House) private houseList; 
    uint public houseCount;

    // Read/write balances
    mapping(address => uint) public balances;

    // register new house to new owner for a specified amount of coins
    function registerNewHouse (string memory _owner, address _address, uint _amount) public{
        // deduct balance from buyer;s wallet
        balances[_address] -= _amount;
        
        // register buyer
        houseCount ++;
        HouseRegistrationContract.Owner memory newOwner = Owner(_owner, _address);
        houseList[houseCount] = House(houseCount, newOwner); // Creates a new house and stores it into a houseList
    }

    function transferHouse (uint _houseNo, string memory _owner, address _address, uint _amount) public {
        // deduct from buyer's wallet & add to seller's wallet
        address receiver = houseList[_houseNo].owner.walletAddress;
        sendCoins(_address, receiver, _amount);

        // transfer houseList
        HouseRegistrationContract.Owner memory newOwner = Owner(_owner, _address);
        houseList[_houseNo] = House(_houseNo, newOwner); //create a new house and update the houseList with new owner
    }

    // Get owner details
    function getOwner (uint _houseNo) public view returns (uint houseNo, string memory ownerName, address walletAddress){
        return (houseList[_houseNo].houseNo, houseList[_houseNo].owner.name, houseList[_houseNo].owner.walletAddress);
    }

    // add specified amount of coins into specified receiver's wallet address
    function mintCoins(address receiver, uint amount) public {
        balances[receiver] += amount;
    }

    // send specified amount of coins from sender to receiver
    function sendCoins(address sender, address receiver, uint amount) public {
        require(amount <= balances[sender], "insufficient balance.");
        balances[sender] -= amount;
        balances[receiver] += amount;
    }
    
    // constructor() public {
    //     mintCoins(0x8849101C29CF67E7aF7b71d5B11747E53057e393, 5000); // add 5000 coins into 1st wallet
    //     mintCoins(0x66D980e2373a362fb4b86e7E4CCA8A13e7cB7121, 10000); // add 10000 coins into 2nd wallet

    //     // register 1st house to Owner 1 for 1000 coins
    //     registerNewHouse("Owner 1", 0x8849101C29CF67E7aF7b71d5B11747E53057e393, 1000);
    //     // register 2nd house to Owner 2 for 1000 coins
    //     registerNewHouse("Owner 2", 0x66D980e2373a362fb4b86e7E4CCA8A13e7cB7121, 1000);
    // }
}

