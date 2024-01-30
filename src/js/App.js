$(document).ready(function(){
    $(".walletAddress").append(localStorage.getItem("CurrAddress"));
  });

// ===== ACTUALLY SEND ETH =====

// var price = $("#transferamount").val();
// var newprice = parseFloat(price);

// async function sendTransaction(){
//   let params = [{
//     "from": localStorage.getItem("CurrAddress").toString(16),
//     "to": "0x651bf48357bc2afc53adab4625e4d096eb207ac0", // non-checksummed works
//     "gas": Number(21000).toString(16),
//     "gasPrice": Number(2500000).toString(16),
//     "value": "0x" + Web3.utils.toBN(Web3.utils.toWei("0.05", "ether")).toString(16),
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
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_propertyID",
          "type": "uint256"
        }
      ],
      "name": "getProperty",
      "outputs": [
        {
          "internalType": "string",
          "name": "_street_address",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_unit",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_completion_date",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_owner_name",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_wallet_address",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "_sale",
          "type": "bool"
        },
        {
          "internalType": "string",
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
          "internalType": "address",
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "getUser",
      "outputs": [
        {
          "internalType": "string",
          "name": "_nric",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_email",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_wallet_address",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "pListID",
      "outputs": [
        {
          "internalType": "uint256",
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
          "internalType": "string",
          "name": "_owner",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_id",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_street_address",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_unit",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_completion_date",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_email",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "_sale",
          "type": "bool"
        },
        {
          "internalType": "string",
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
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "_nric",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_email",
          "type": "string"
        },
        {
          "internalType": "address",
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
          "internalType": "uint256",
          "name": "_propertyID",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_owner",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_id",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_street_address",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_unit",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_completion_date",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_email",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "_sale",
          "type": "bool"
        },
        {
          "internalType": "string",
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
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "userList",
      "outputs": [
        {
          "internalType": "string",
          "name": "id",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "email",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "wallet_address",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ],
  address: "0x0abc53c90bee9350ef485cdd628d47672a8cd345",
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
  this.loadOwnedPropertyList(); // call the loadHouseRegistration func to display the house registration list
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

OwnershipRegistrationApp.prototype.loadOwnedPropertyList = function () {
  var that = this;
  var a = 0;
  this.getpListID(function (error, pListID) {
    if (error) {
        console.log(error);
    }
    for (let i = 1; i <= pListID; i++) {
      var propertyNo = i;
      that.getProperty(propertyNo, function (error, property) {
        if (error) {
          console.log(error);
        }
        var ownerWallet = property[4];
        console.log(ownerWallet);
        var currentWallet = localStorage.getItem("CurrAddress").toLowerCase();
        if (ownerWallet == currentWallet){
          if (a > 1){
            var propertyAddress = property[0];
            var propertyUnit = property[1];
            var propertyLife = property[2];
            var propertySaleStats = property[5];
            var propertySalePrice = property[6];
            var ownedPropertyTemplate = '<div class="container d-flex justify-content-center align-items-center mt-5"><div class="container-flex col-xl-12 owned-property-list"><div class="py-5 px-5"><div class="row content d-flex justify-content-center align-items-center g-0"><div class="col"><div class="profile-owned-property-info"><div class="profile-streetaddress">' + propertyAddress + '</div></div></div><div class="col"><div class="profile-owned-property-info d-flex justify-content-end"><div class="profile-propertyid">' + '# ' + i + '</div></div></div></div><hr><div class="row content d-flex justify-content-center align-items-center g-0"><div class="mb-1"><div class="profile-owned-property-info"><div class="profile-propertyunit">' + '<b>Property Unit Number:</b> #' + propertyUnit + '</div></div></div></div><div class="row content d-flex justify-content-center align-items-center g-0"><div class="col"><div class="profile-owned-property-info"><div class="profile-propertylife">' + '<b>Property Lifespan: </b>' + propertyLife + '</div></div></div><div class="col"><div class="profile-owned-property-info"><div class="profile-propertysalestats">' + '<b>For Sale: </b>' + propertySaleStats + '</div></div></div><div class="col"><div class="profile-owned-property-info"><div class="profile-propertysaleprice">' + '<b>Sales Price:</b> ' + propertySalePrice + ' ETH' + '</div></div></div></div><div class="row content d-flex justify-content-center align-items-center g-0"><div class="profile-owned-property-info"><button class="btn btn-primary profile-updatestatus button-update-sales-status mt-4" onclick="updateStatus(' + i + ')">' + 'Update Sales Info' + '</button></div></div></div></div></div>';
            $("#OwnedPropertyList").append(ownedPropertyTemplate);
          }
          else{
            var propertyAddress = property[0];
            var propertyUnit = property[1];
            var propertyLife = property[2];
            var propertySaleStats = property[5];
            var propertySalePrice = property[6];
            var ownedPropertyTemplate = '<div class="container d-flex justify-content-center align-items-center mt-5"><div class="container-flex col-xl-12 owned-property-list"><div class="py-5 px-5"><div class="row content d-flex justify-content-center align-items-center g-0"><div class="col"><div class="profile-owned-property-info"><div class="profile-streetaddress">' + propertyAddress + '</div></div></div><div class="col"><div class="profile-owned-property-info d-flex justify-content-end"><div class="profile-propertyid">' + '# ' + i + '</div></div></div></div><hr><div class="row content d-flex justify-content-center align-items-center g-0"><div class="mb-1"><div class="profile-owned-property-info"><div class="profile-propertyunit">' + '<b>Property Unit Number:</b> #' + propertyUnit + '</div></div></div></div><div class="row content d-flex justify-content-center align-items-center g-0"><div class="col"><div class="profile-owned-property-info"><div class="profile-propertylife">' + '<b>Property Lifespan: </b>' + propertyLife + '</div></div></div><div class="col"><div class="profile-owned-property-info"><div class="profile-propertysalestats">' + '<b>For Sale: </b>' + propertySaleStats + '</div></div></div><div class="col"><div class="profile-owned-property-info"><div class="profile-propertysaleprice">' + '<b>Sales Price:</b> ' + propertySalePrice + ' ETH' + '</div></div></div></div><div class="row content d-flex justify-content-center align-items-center g-0"><div class="profile-owned-property-info"><button class="btn btn-primary profile-updatestatus button-update-sales-status mt-4" onclick="updateStatus(' + i + ')">' + 'Update Sales Info' + '</button></div></div></div></div></div>';
            $("#OwnedPropertyList").append(ownedPropertyTemplate);
            a += 1;
          }
        }
      });
    }
  });
}

OwnershipRegistrationApp.prototype.bindButtons = function(){
  var that = this;

  $(document).on("click", "#button-register-property", function(){
      that.registerProperty(); //call the registerNewHouse function when the button-register is clicked
  });
  $(document).on("click", "#button-register-user", function(){
      that.registerUser();
  });
  $(document).ready(function(){
    that.checkUserExist();
  });
  $(document).on("click", "#button-register-property-form", function(){
    var no_record = document.getElementById("no-record");
    var record = document.getElementById("record");
    var form = document.getElementById("register-property-form");
    no_record.style.display = "none";
    record.style.display = "none";
    form.style.display = "block";
  });
  $(document).on("click", ".button-update-sales-status", function(){
    that.loadUpdateStatus();
  })
  $(document).on("click", "#button-update-property-sales", function(){
    that.updateSales();
  })
};

// function to run check if user exists
OwnershipRegistrationApp.prototype.getUser = function(address, cb){
  this.instance.userList(address, function(error, result){
      cb(error, result)
  })
}

OwnershipRegistrationApp.prototype.checkUserExist = function(hash, cb){
  var address = localStorage.getItem("CurrAddress");
  this.getUser(address, function(error, info){
      if(error){
          console.log(error)
      }
      if(info[0] != ""){ // if not null, we display information
        var no_record = document.getElementById("no-record");
        var record = document.getElementById("record");
        no_record.style.display = "none";
        record.style.display = "block"; //============================================================================================================ BLOCK WHEN DONE
        var fname = info[1];
        var nric = info[0];
        var email = info[2];

        $("#fname").append(fname);
        $("#nric").append(nric);
        $("#email").append(email);
        localStorage.setItem("CurrName", fname);
        localStorage.setItem("CurrNRIC", nric);
        localStorage.setItem("CurrEmail", email);
      }
      else{
        $("#button-register-property-form").prop('disabled', true);
        $("#no-user-info-prompt").append("*Please register your information above before proceeding")
      }
  })
}

// register user on command only if user doesnt exist in mapping alr
OwnershipRegistrationApp.prototype.registerUser = function(){
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
        if (receipt != null){
            $("#fname-input").val("");
            $("#id-input").val("");
            $("#email-input").val("");
            that.checkUserExist();
        }
        else{
            $("#message").text("Registration Failed");
        } 
      }
    }
  )
}

OwnershipRegistrationApp.prototype.registerProperty = function(){
  var propertyAddress = $("#streetaddress-input").val();
  var propertyUnit = $("#unit-input").val();
  var propertyLife = $("#propertylife-input option:selected").text();
  var propertySaleStatus = $("input[name='salestatus']:checked").prop('value') === 'true';
  var propertySalePrice = $("#saleprice-input").val();
  var address = localStorage.getItem("CurrAddress");
  var propertyOwner = localStorage.getItem("CurrName");
  var propertyOwnerEmail = localStorage.getItem("CurrEmail");
  var propertyOwnerNRIC = localStorage.getItem("CurrNRIC");

  this.instance.registerProperty(propertyOwner, address, propertyOwnerNRIC, propertyAddress, propertyUnit, propertyLife, propertyOwnerEmail, propertySaleStatus, propertySalePrice,
    //gas required to execute the transaction
    { from: this.web3.eth.accounts[0], gas: 1000000, gasPrice: 1000000000, gasLimit: 1000000 },
    function(){
      if(error){
          console.log(error);
      }
      else{
        if (receipt.status == 1){
          window.location.href = "profile.html";
        }
        else{
          $("#message").text("Registration Failed");
        } 
      }
    }
  )
}

function updateStatus(propertyID){
  var property_id = parseInt(propertyID);
  localStorage.setItem("updateStatus", property_id);
  console.log(localStorage.getItem("updateStatus"));
}

OwnershipRegistrationApp.prototype.loadUpdateStatus = function(){
  var no_record = document.getElementById("no-record");
  var record = document.getElementById("record");
  var form = document.getElementById("register-property-form");
  var update = document.getElementById("update-property-form");
  var ownedlist = document.getElementById("profileProperty");
  var ownedlistHeader = document.getElementById("owned-property-list");
  no_record.style.display = "none";
  record.style.display = "none";
  form.style.display = "none";
  ownedlist.style.display = "none";
  ownedlistHeader.style.display = "none";
  update.style.display = "block";

  var that = this;
  var updateID = localStorage.getItem("updateStatus");

  this.getpListID(function (error, pListID) {
    if (error) {
        console.log(error);
    }
    for (let i = 1; i <= pListID; i++) {
      var propertyNo = i;
      if (propertyNo == updateID){
        that.getProperty(propertyNo, function(error, property){
          if (error){
            console.log(error);
          }
            $("#street-address").append(property[0]);
            $("#unit-no").append(property[1]);
            $("#lifespan").append(property[2]);
            localStorage.setItem("CurrStreetAdd", property[0]);
            localStorage.setItem("CurrUnitNo", property[1]);
            localStorage.setItem("CurrLifeSpan", property[2]);
        });
      }
    }
  });
}

OwnershipRegistrationApp.prototype.updateSales = function(){
  var that = this;
  var updateID = localStorage.getItem("updateStatus");
  var updateCurrStreetAdd = localStorage.getItem("CurrStreetAdd");
  var updateCurrUnitNo = localStorage.getItem("CurrUnitNo");
  var updateCurrLifeSpan = localStorage.getItem("CurrLifeSpan");
  var updateAddress = localStorage.getItem("CurrAddress");
  var updatePropertyOwner = localStorage.getItem("CurrName");
  var updatePropertyOwnerEmail = localStorage.getItem("CurrEmail");
  var updatePropertyOwnerNRIC = localStorage.getItem("CurrNRIC");
  var updatePropertySaleStatus = $("input[name='updatesalestatus']:checked").prop('value') === 'true';
  var updatePropertySales = $("#update-saleprice-input").val();

  this.instance.transferProperty(updateID, updatePropertyOwner, updateAddress, updatePropertyOwnerNRIC, updateCurrStreetAdd, updateCurrUnitNo, updateCurrLifeSpan, updatePropertyOwnerEmail, updatePropertySaleStatus, updatePropertySales,
      // gas required to execure the transcation
      { from: this.web3.eth.accounts[0], gas: 1000000, gasPrice: 1000000000, gasLimit: 1000000},
      function(){
          if(error){
              console.log(error);
          }
          else{
              if(receipt.status == 1) {
                  that.loadHouseRegistration();
              }
              else{
                  $("#message").text("Transfer Failed");
              }
          }
      })
}