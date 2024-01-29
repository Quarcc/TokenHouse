// pragma solidity ^0.5.10;

contract PropertyLandContract{

    struct User{
        string id;
        string name;
        string email;
        address wallet_address; 
    }

    struct Property{
        uint property_id;
        string street_address;
        string unit;
        string completion_date;
        string transaction_date;
        User owner;
    }

    struct Land{
        string street_address;
        string unit;
        string completion_date;
        User owner;
    }

    // Read/write Users
    mapping(address => User) public userList;

    // Read/write Properties
    mapping(uint => Property) private propertyList; 
    uint public pListID;

    // Read/write Land
    mapping(string => Land) private landList; 

    // Creating a balance mapping, address to the value (concept is the same as a key-value in a dictionary[python])
    mapping(address => uint) public balance;

    // Registers User an account with wallet address
    function registerUser (string memory _nric, string memory _name, string memory _email, address _wallet_address) public {
        userList[_wallet_address] = User(_nric, _name, _email, _wallet_address);
    }

    // Claiming a property with solidity ethereum
    function registerProperty (string memory _owner, address _address, uint _amount, string memory _id, string memory _street_address, string memory _unit, string memory _completion_date, string memory _transaction_date, string memory _email) public{
        // deduct balance from buyer's wallet
        balance[_address] -= _amount;
        
        pListID ++;
        // register buyer
        PropertyLandContract.User memory newOwner = User(_id, _owner, _email, _address);
        propertyList[pListID] = Property(pListID, _street_address, _unit, _completion_date, _transaction_date, newOwner); // Registers a new owner into a property and stores into a list
    }

    // Transferring ownership of a property, all user information parsed must be buyer's info.
    function transferProperty (uint _propertyID, string memory _owner, address _address, uint _amount, string memory _id, string memory _street_address, string memory _unit, string memory _completion_date, string memory _transaction_date, string memory _email) public {
        address receiver = propertyList[_propertyID].owner.wallet_address;
        sendCoins(_address, receiver, _amount);

        PropertyLandContract.User memory newOwner = User(_id, _owner, _email, _address);
        propertyList[_propertyID] = Property(_propertyID, _street_address, _unit, _completion_date, _transaction_date, newOwner);
    }

    function getProperty (uint _propertyID) public view returns (string memory _street_address, string memory _unit, string memory _completion_date, string memory _transaction_date, string memory _owner_name, address _wallet_address) {
        return (propertyList[_propertyID].street_address, propertyList[_propertyID].unit, propertyList[_propertyID].completion_date, propertyList[_propertyID].transaction_date, propertyList[_propertyID].owner.name, propertyList[_propertyID].owner.wallet_address);
    }

    function getUser (address _address) public view returns (string memory _nric, string memory _name, string memory _email, address _wallet_address){
        return (userList[_address].id, userList[_address].name, userList[_address].email, userList[_address].wallet_address);
    }
    
    // send specified amount of coins from sender to receiver
    function sendCoins(address sender, address receiver, uint amount) public {
        require(amount <= balance[sender], "insufficient balance.");
        balance[sender] -= amount;
        balance[receiver] += amount;    
    }

    // ===== JUST A MONETARY VALUE TO FACILIATE TRANSACTIONS ON WEB APP =====

    // add specified amount of coins into specified receiver's wallet address
    function mintCoins(address receiver, uint amount) public {
        balance[receiver] += amount;
    }

    // constructor() public {
    //     mintCoins(0xee439FC34Ef3Df8aA8c73D9690C4B9eEffE59eC4, 5000); // add 5000 coins into 1st wallet
    //     mintCoins(0x651BF48357bc2afC53ADAb4625E4D096eB207aC0, 10000); // add 10000 coins into 2nd wallet
    // }
}