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
          "type": "string"
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
  address: "0x24cb04fea1333e40490f5b331e8bc2d011af1907",
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
  // this.loadHouseRegistration(); // call the loadHouseRegistration func to display the house registration list
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

  this.instance.purchaseProperty(purchaseOwner, purchaseWAddress, purchaseAmount, purchaseOwnerID, purchaseOwnerAge, purchaseAddress, purchaseAddresUnit, purchasePropertyCompletion,
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
        }
        else{
            $("#message").text("Registration Failed");
        }
      }
    }
  )
} 