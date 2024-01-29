$(document).ready(function(){
    $("#mm-login").click(function(){
      window.location.href='catalog.html';
    });
  });

$(document).ready(function(){
  $("#mm-logout").click(function(){
    window.location.href='index.html';
  });
});

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
          "name": "_nric",
          "type": "string"
        },
        {
          "name": "_name",
          "type": "string"
        },
        {
          "name": "_age",
          "type": "uint256"
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
          "name": "_amount",
          "type": "uint256"
        },
        {
          "name": "_id",
          "type": "string"
        },
        {
          "name": "_age",
          "type": "uint256"
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
          "name": "_transaction_date",
          "type": "string"
        },
        {
          "name": "_email",
          "type": "string"
        }
      ],
      "name": "purchaseProperty",
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
          "name": "_transaction_date",
          "type": "string"
        },
        {
          "name": "_owner_name",
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
          "name": "sender",
          "type": "address"
        },
        {
          "name": "receiver",
          "type": "address"
        },
        {
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "sendCoins",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
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
          "name": "_age",
          "type": "uint256"
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
          "name": "_amount",
          "type": "uint256"
        },
        {
          "name": "_id",
          "type": "string"
        },
        {
          "name": "_age",
          "type": "uint256"
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
          "name": "_transaction_date",
          "type": "string"
        },
        {
          "name": "_email",
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
      "constant": false,
      "inputs": [
        {
          "name": "receiver",
          "type": "address"
        },
        {
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "mintCoins",
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
      "name": "balance",
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
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    }
  ],
  address: "0x6b9899bf5b06d5c9a9a811a50ce8e9fbbf10fed0",
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
      that.purchaseProperty(); //call the registerNewHouse function when the button-register is clicked
  });
};

OwnershipRegistrationApp.prototype.purchaseProperty = function(){
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

  this.instance.purchaseProperty(purchaseOwner, purchaseWAddress, purchaseAmount, purchaseOwnerID, purchaseOwnerAge, purchaseAddress, purchaseAddresUnit, purchasePropertyCompletion, purchaseLastTransaction, purchaseEmail,
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