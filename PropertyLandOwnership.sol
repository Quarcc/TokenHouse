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
        User owner;
        Sale sale;
    }

    struct Sale{
        bool for_sale;
        string sale_price;
    }

    // Read/write Users
    mapping(address => User) public userList;

    // Read/write Properties
    mapping(uint => Property) private propertyList; 
    uint public pListID;

    // Registers User an account with wallet address
    function registerUser (string memory _nric, string memory _name, string memory _email, address _wallet_address) public {
        userList[_wallet_address] = User(_nric, _name, _email, _wallet_address);
    }

    // Claiming a property with solidity ethereum
    function registerProperty (string memory _owner, address _address, string memory _id, string memory _street_address, string memory _unit, string memory _completion_date, string memory _email, bool _sale, string memory _sale_price) public{
        pListID ++;

        PropertyLandContract.Sale memory forSale = Sale(_sale, _sale_price);
        PropertyLandContract.User memory newOwner = User(_id, _owner, _email, _address);
        propertyList[pListID] = Property(pListID, _street_address, _unit, _completion_date, newOwner, forSale); // Registers a new owner into a property and stores into a list
    }

    // Transferring ownership of a property, all user information parsed must be buyer's info.
    function transferProperty (uint _propertyID, string memory _owner, address _address, string memory _id, string memory _street_address, string memory _unit, string memory _completion_date, string memory _email, bool _sale, string memory _sale_price) public {
        
        PropertyLandContract.Sale memory forSale = Sale(_sale, _sale_price);
        PropertyLandContract.User memory newOwner = User(_id, _owner, _email, _address);
        propertyList[_propertyID] = Property(_propertyID, _street_address, _unit, _completion_date, newOwner, forSale);
    }

    function getProperty (uint _propertyID) public view returns (string memory _street_address, string memory _unit, string memory _completion_date, string memory _owner_name, address _wallet_address, bool _sale, string memory _sale_price) {
        return (propertyList[_propertyID].street_address, propertyList[_propertyID].unit, propertyList[_propertyID].completion_date, propertyList[_propertyID].owner.name, propertyList[_propertyID].owner.wallet_address, propertyList[_propertyID].sale.for_sale, propertyList[_propertyID].sale.sale_price);
    }

    function getUser (address _address) public view returns (string memory _nric, string memory _name, string memory _email, address _wallet_address){
        return (userList[_address].id, userList[_address].name, userList[_address].email, userList[_address].wallet_address);
    }

    // constructor() public{
    //     registerUser("T1111111A", "Dannie", "danniealaqif0907@gmail.com", 0x651BF48357bc2afC53ADAb4625E4D096eB207aC0);
    //     registerProperty("Dannie", 0x651BF48357bc2afC53ADAb4625E4D096eB207aC0, "T1111111A", "Ang Mo Kio Street 66", "04-01", "99 Years", "danniealaqif0907@gmail.com", false, "0.0");
    //     registerProperty("Dannie", 0x651BF48357bc2afC53ADAb4625E4D096eB207aC0, "T1111111A", "Sembawang Drive", "08-341", "99 Years", "danniealaqif0907@gmail.com", true, "0.01");
    // }
}