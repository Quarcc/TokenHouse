// pragma solidity ^0.5.10;

contract PropertyLandContract{

    struct User{
        string id;
        string name;
        uint age;
        address walletaddress; 
    }

    struct Property{
        string street_address;
        string unit;
        string length_of_ownership;
        string date;
        uint last_transaction;
        User owner;
    }

    struct Land{
        string street_address;
        string unit;
        string length_of_ownership;
        string date;
        uint last_transaction;
        User owner;
    }

    // Creating a balance mapping, address to the value (concept is the same as a key-value in a dictionary[python])
    mapping(address => uint) public balance;
}