$(document).ready(function(){
    $(".walletAddress").append(localStorage.getItem("CurrAddress"));
  });

// ===== ACTUALLY SEND ETH =====

// var price = $("#amount").val().toString();

// async function sendTransaction(){
//   let params = [{
//     "from": localStorage.getItem("CurrAddress").toString(16),
//     "to": $("#receiverAdd").val(),
//     "gas": Number(21000).toString(16),
//     "gasPrice": Number(2500000).toString(16),
//     "value": "0x" + Web3.utils.toBN(Web3.utils.toWei(price, "ether")).toString(16),
//   }];

//   let result = await window.ethereum.request({method: "eth_sendTransaction", params}).catch((err)=>{
//     console.log(err);
//   });
// }

// ===== BLOCKCHAIN RELATED JS =====

// The object 'Contracts" will be injected here which contains the ABI, address of your deployed contract and endpoint 
var Contracts = { OwnershipContract:  {
  abi: [
    {
      "constant": true,
      "inputs": [],
      "name": "pListID",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_propertyID",
          "type": "uint256"
        },
        {
          "name": "_owner",
          "type": "string"
        },
        {
          "name": "_address",
          "type": "address"
        },
        {
          "name": "_id",
          "type": "string"
        },
        {
          "name": "_street_address",
          "type": "string"
        },
        {
          "name": "_unit",
          "type": "string"
        },
        {
          "name": "_completion_date",
          "type": "string"
        },
        {
          "name": "_email",
          "type": "string"
        },
        {
          "name": "_sale",
          "type": "bool"
        },
        {
          "name": "_sale_price",
          "type": "string"
        }
      ],
      "name": "transferProperty",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "userList",
      "outputs": [
        {
          "name": "id",
          "type": "string"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "email",
          "type": "string"
        },
        {
          "name": "wallet_address",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_owner",
          "type": "string"
        },
        {
          "name": "_address",
          "type": "address"
        },
        {
          "name": "_id",
          "type": "string"
        },
        {
          "name": "_street_address",
          "type": "string"
        },
        {
          "name": "_unit",
          "type": "string"
        },
        {
          "name": "_completion_date",
          "type": "string"
        },
        {
          "name": "_email",
          "type": "string"
        },
        {
          "name": "_sale",
          "type": "bool"
        },
        {
          "name": "_sale_price",
          "type": "string"
        }
      ],
      "name": "registerProperty",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_propertyID",
          "type": "uint256"
        }
      ],
      "name": "getProperty",
      "outputs": [
        {
          "name": "_street_address",
          "type": "string"
        },
        {
          "name": "_unit",
          "type": "string"
        },
        {
          "name": "_completion_date",
          "type": "string"
        },
        {
          "name": "_owner_name",
          "type": "string"
        },
        {
          "name": "_wallet_address",
          "type": "address"
        },
        {
          "name": "_sale",
          "type": "bool"
        },
        {
          "name": "_sale_price",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "getUser",
      "outputs": [
        {
          "name": "_nric",
          "type": "string"
        },
        {
          "name": "_name",
          "type": "string"
        },
        {
          "name": "_email",
          "type": "string"
        },
        {
          "name": "_wallet_address",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_nric",
          "type": "string"
        },
        {
          "name": "_name",
          "type": "string"
        },
        {
          "name": "_email",
          "type": "string"
        },
        {
          "name": "_wallet_address",
          "type": "address"
        }
      ],
      "name": "registerUser",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  address: "0x5a2c79ef88732b57771671f2d03840a4d96a247b",
  endpoint: "https://sepolia.infura.io/v3/"
 }}

  function OwnershipRegistrationApp(Contract) {
  this.web3 = null;
  this.instance = null;
  this.Contract = Contract;
}

OwnershipRegistrationApp.prototype.onReady = function() {
  this.init(function () {
      $('#message').append("DApp loaded successfully.");
  });
  this.bindButtons();
  this.loadPropertyList(); // call the loadHouseRegistration func to display the house registration list
}

OwnershipRegistrationApp.prototype.init = function(cb) {
      // enable and connect to MetaMask
      if (window.ethereum) {
          this.web3 = new Web3(ethereum);
      try {
          ethereum.enable();
      } catch (error) {
      }
       }  
  
      // Create the contract interface using the ABI provided in the configuration.
      var contract_interface = this.web3.eth.contract(this.Contract.abi);
  
      // Create the contract instance for the specific address provided in the configuration.
      this.instance = contract_interface.at(this.Contract.address);
  
      cb();
  }

if(typeof(Contracts) === "undefined") var Contracts={ OwnershipContract: { abi: [] }};
var ownershipRegistrationApp = new OwnershipRegistrationApp(Contracts['OwnershipContract']);

$(document).ready(function() {
  ownershipRegistrationApp.onReady();
});

OwnershipRegistrationApp.prototype.getpListID = function (cb) {
  this.instance.pListID(function (error, pListID) {
      cb(error, pListID);
  });
};

OwnershipRegistrationApp.prototype.getProperty = function (propertyNo, cb) {
  this.instance.getProperty(propertyNo, function (error, property) {
      cb(error, property);
  });
};

OwnershipRegistrationApp.prototype.loadPropertyList = function () {
  var that = this;

  this.getpListID(function (error, pListID) {
    if (error) {
        console.log(error);
    }
    $("#message").text("Property Count: " + pListID);
    $("#propertyListResult").empty(); //empty the house registration list table
    for (let i = 1; i <= pListID; i++) {
      var propertyNo = i;
      that.getProperty(propertyNo, function (error, property) {
        if (error) {
          console.log(error);
        }
        var Address = property[0];
        var Unit = property[1];
        var Completion = property[2];
        var Latest = property[3];
        var Owner = property[4];
        var Wallet = property[5];
        var propertyTemplate = "<tr><td>" + Address + "</td><td>" + Unit + "</td><td>" + Completion + "</td><td>" + Latest + "</td><td>" + Owner + "</td><td>" + Wallet + "</td></tr>";
        $("#propertyListResult").append(propertyTemplate);
        $("#walletAddress").append(localStorage.getItem("CurrAddress"));
      });
    }
  });
}

OwnershipRegistrationApp.prototype.bindButtons = function(){
  var that = this;

  $(document).on("click", "#button-purchase", function(){
      that.registerProperty(); //call the registerNewHouse function when the button-register is clicked
  });
  $(document).on("click", "#button-register-user", function(){
      that.registerUser();
  });
  $(document).on("click", "#button-balance", function(){
      that.checkUserExist();
  });
};

// function to run check if user exists
OwnershipRegistrationApp.prototype.getUser = function(address, cb){
  this.instance.userList(address, function(error, result){
      cb(error, result)
  })
}

OwnershipRegistrationApp.prototype.checkUserExist = function(hash, cb){
  var that = this;
  var address = localStorage.getItem("CurrAddress");

  this.getUser(address, function(error, info){
      if(error){
          console.log(error)
      }
      if(info[0] == ""){ // if null, then we register, after register must run load
        that.registerUser();
      }
      else{
        alert("LOL"); // if user exists, deny input and just load info
      }
  })
}

// register user on command only if user doesnt exist
OwnershipRegistrationApp.prototype.registerUser = function(){
  // Get input for house number and owner
  var userName = $("#fname-input").val();
  var userIC = $("#id-input").val();
  var userEmail = $("#email-input").val();
  var userAddress = localStorage.getItem("CurrAddress");
  
  this.instance.registerUser(userIC, userName, userEmail, userAddress,
    //gas required to execute the transaction
    { from: this.web3.eth.accounts[0], gas: 1000000, gasPrice: 1000000000, gasLimit: 1000000 },
    function(){
      if(error){
          console.log(error);
      }
      else{
        if (receipt.status == 1){
            $("#fname-input").val("");
            $("#id-input").val("");
            $("#email-input").val("");
        }
        else{
            $("#message").text("Registration Failed");
        } 
      }
    }
  )
}


OwnershipRegistrationApp.prototype.registerProperty = function(){
  // Get input for house number and owner
  var purchaseOwner = $("#purchaseOwner").val();
  var purchaseWAddress = $("#purchaseWAddress").val();
  var purchaseAmount = $("#purchaseAmount").val();
  var purchaseOwnerID = $("#purchaseOwnerID").val();
  var purchaseOwnerAge = $("#purchaseOwnerAge").val();
  var purchaseAddress = $("#purchaseAddress").val();
  var purchaseAddresUnit = $("#purchaseAddresUnit").val();
  var purchasePropertyCompletion = $("#purchasePropertyCompletion").val();
  var purchaseLastTransaction = $("#purchaseLastTransaction").val();
  var purchaseEmail = $("#purchaseEmail").val();

  this.instance.registerProperty(purchaseOwner, purchaseWAddress, purchaseAmount, purchaseOwnerID, purchaseOwnerAge, purchaseAddress, purchaseAddresUnit, purchasePropertyCompletion, purchaseLastTransaction, purchaseEmail,
    //gas required to execute the transaction
    { from: this.web3.eth.accounts[0], gas: 1000000, gasPrice: 1000000000, gasLimit: 1000000 },
    function(){
      if(error){
          console.log(error);
      }
      else{
        if (receipt.status == 1){
            $("#purchaseOwner").val("");
            $("#purchaseWAddress").val("");
            $("#purchaseAmount").val("");
            $("#purchaseOwnerID").val("");
            $("#purchaseOwnerAge").val("");
            $("#purchaseAddress").val("");
            $("#purchaseAddresUnit").val("");
            $("#purchasePropertyCompletion").val("");
            $("#purchaseLastTransaction").val("");
            $("#purchaseEmail").val("");
        }
        else{
            $("#message").text("Registration Failed");
        } 
      }
    }
  )
}