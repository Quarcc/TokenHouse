// pragma solidity ^0.5.10;

contract PropertyLandContract{

    struct User{
        string id;
        string name;
        uint age;
        address wallet_address; 
    }

    struct Property{
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

    string public pListID;

    // Read/write Users
    mapping(address => User) private userList;

    // Read/write Properties
    mapping(string => Property) private propertyList; 

    // Read/write Land
    mapping(string => Land) private landList; 

    // Creating a balance mapping, address to the value (concept is the same as a key-value in a dictionary[python])
    mapping(address => uint) public balance;

    // Registers User an account with wallet address
    function registerUser (string memory _nric, string memory _name, uint _age, address _wallet_address) public {
        userList[_wallet_address] = User(_nric, _name, _age, _wallet_address);
    }

    // Claiming a property with solidity ethereum
    function purchaseProperty (string memory _owner, address _address, uint _amount, string memory _id, uint _age, string memory _street_address, string memory _unit, string memory _completion_date, string memory _transaction_date) public{
        // deduct balance from buyer's wallet
        balance[_address] -= _amount;
        
        // creating a unique ID
         pListID = string(abi.encodePacked(_street_address, _unit));

        // register buyer
        PropertyLandContract.User memory newOwner = User(_id, _owner, _age, _address);
        propertyList[pListID] = Property(_street_address, _unit, _completion_date, _transaction_date, newOwner); // Registers a new owner into a property and stores into a list
    }

    // Transferring ownership of a property, all user information parsed must be buyer's info.
    function transferProperty (string memory _propertyID, string memory _owner, address _address, uint _amount, string memory _id, uint _age, string memory _street_address, string memory _unit, string memory _completion_date, string memory _transaction_date) public {
        address receiver = propertyList[_propertyID].owner.wallet_address;
        sendCoins(_address, receiver, _amount);

        PropertyLandContract.User memory newOwner = User(_id, _owner, _age, _address);
        propertyList[_propertyID] = Property(_street_address, _unit, _completion_date, _transaction_date, newOwner);
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
    //     mintCoins(0x88152De02a041Ff5028F0104cBB1d99aE7C80D62, 10000); // add 10000 coins into 2nd wallet
    // }
}