$(document).ready(function(){
    $(".walletAddress").append(localStorage.getItem("CurrAddress"));
  });

// ===== RETURN FUNCTIONS =====

function returnRegister(){
  var record = document.getElementById("record");
  var form = document.getElementById("register-property-form");
  record.style.display = "block";
  form.style.display = "none";
}

function returnUpdate(){
  var record = document.getElementById("record");
  var update = document.getElementById("update-property-form");
  var ownedlist = document.getElementById("profileProperty");
  var ownedlistHeader = document.getElementById("owned-property-list");
  record.style.display = "block";
  ownedlist.style.display = "block";
  ownedlistHeader.style.display = "block";
  update.style.display = "none";
}

// ===== OBTAIN METAMASK ACCOUNT BALANCE =====

OwnershipRegistrationApp.prototype.userBalance = async function() {
  var currentadd = localStorage.getItem("CurrAddress");
  var balanceHEX = await window.ethereum.request({ "method": "eth_getBalance", "params": [currentadd, "latest"]});
  var balanceWEI = parseInt(balanceHEX, 16);
  var balanceLong = balanceWEI / 10e17
  var balance = parseFloat(balanceLong).toFixed(4);
  $(".ethbalance").append('<svg xmlns="http://www.w3.org/2000/svg" width="0.63em" height="1em" viewBox="0 0 320 512"><path fill="currentColor" d="M311.9 260.8L160 353.6L8 260.8L160 0zM160 383.4L8 290.6L160 512l152-221.4z"/></svg>&nbsp' + balance)
}

// ===== ACTUALLY SEND ETH =====

OwnershipRegistrationApp.prototype.sendTransaction = function() {
  var that = this;
  var price = localStorage.getItem("purchasePrice");
  var receiver = localStorage.getItem("purchaseReceiver");

  let params = [{
    "from": localStorage.getItem("CurrAddress").toString(16),
    "to": receiver,
    "gas": Number(21000).toString(16),
    "gasPrice": Number(2500000).toString(16),
    "value": Number(price*10e17).toString(16),
  }];

  try {
    let result = window.ethereum.request({ method: "eth_sendTransaction", params });
    // process the result if needed
    that.transferOwnership();
  } catch (err) {
    console.log(err);
  }
}

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
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    }
  ],
  address: "0xc3044c6aacb89e45321dab1c49c859e6e63e065a",
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
  this.loadOwnedPropertyList();
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
        var status = property[5];
        var currentWallet = localStorage.getItem("CurrAddress").toLowerCase();
        if (ownerWallet == currentWallet){
          if (status){
            var propertyAddress = property[0];
            var propertyUnit = property[1];
            var propertyLife = property[2];
            var propertySaleStats = property[5];
            var propertySalePrice = property[6];
            var ownedPropertyTemplate = '<div class="container d-flex justify-content-center align-items-center mt-5"><div class="container-flex col-xl-12 owned-property-list-true"><div class="py-5 px-5"><div class="row content d-flex justify-content-center align-items-center g-0"><div class="col"><div class="profile-owned-property-info"><div class="profile-streetaddress">' + propertyAddress + '</div></div></div><div class="col"><div class="profile-owned-property-info d-flex justify-content-end"><div class="profile-propertyid">' + '# ' + i + '</div></div></div></div><hr><div class="row content d-flex justify-content-center align-items-center g-0"><div class="mb-1"><div class="profile-owned-property-info"><div class="profile-propertyunit">' + '<b>Property Unit Number:</b> #' + propertyUnit + '</div></div></div></div><div class="row content d-flex justify-content-center align-items-center g-0"><div class="col"><div class="profile-owned-property-info"><div class="profile-propertylife">' + '<b>Property Lifespan: </b>' + propertyLife + '</div></div></div><div class="col"><div class="profile-owned-property-info"><div class="profile-propertysalestats">' + '<b>For Sale: </b>' + propertySaleStats + '</div></div></div><div class="col"><div class="profile-owned-property-info"><div class="profile-propertysaleprice">' + '<b>Sales Price:</b> ' + propertySalePrice + ' ETH' + '</div></div></div></div><div class="row content d-flex justify-content-center align-items-center g-0"><div class="profile-owned-property-info"><button class="btn btn-primary profile-updatestatus button-update-sales-status mt-4" onclick="updateStatus(' + i + ')">' + 'Update Sales Info' + '</button></div></div></div></div></div>';
            $("#OwnedPropertyList").append(ownedPropertyTemplate);
          }
          else{
            var propertyAddress = property[0];
            var propertyUnit = property[1];
            var propertyLife = property[2];
            var propertySaleStats = property[5];
            var propertySalePrice = property[6];
            var ownedPropertyTemplate = '<div class="container d-flex justify-content-center align-items-center mt-5"><div class="container-flex col-xl-12 owned-property-list-false"><div class="py-5 px-5"><div class="row content d-flex justify-content-center align-items-center g-0"><div class="col"><div class="profile-owned-property-info"><div class="profile-streetaddress">' + propertyAddress + '</div></div></div><div class="col"><div class="profile-owned-property-info d-flex justify-content-end"><div class="profile-propertyid">' + '# ' + i + '</div></div></div></div><hr><div class="row content d-flex justify-content-center align-items-center g-0"><div class="mb-1"><div class="profile-owned-property-info"><div class="profile-propertyunit">' + '<b>Property Unit Number:</b> #' + propertyUnit + '</div></div></div></div><div class="row content d-flex justify-content-center align-items-center g-0"><div class="col"><div class="profile-owned-property-info"><div class="profile-propertylife">' + '<b>Property Lifespan: </b>' + propertyLife + '</div></div></div><div class="col"><div class="profile-owned-property-info"><div class="profile-propertysalestats">' + '<b>For Sale: </b>' + propertySaleStats + '</div></div></div><div class="col"><div class="profile-owned-property-info"><div class="profile-propertysaleprice">' + '<b>Sales Price:</b> ' + propertySalePrice + ' ETH' + '</div></div></div></div><div class="row content d-flex justify-content-center align-items-center g-0"><div class="profile-owned-property-info"><button class="btn btn-primary profile-updatestatus button-update-sales-status mt-4" onclick="updateStatus(' + i + ')">' + 'Update Sales Info' + '</button></div></div></div></div></div>';
            $("#OwnedPropertyList").append(ownedPropertyTemplate);
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
  });
  $(document).on("click", "#button-update-property-sales", function(){
    that.updateSales();
  });
  $(document).ready(function(){
    that.loadSales();
  });
  $(document).on("click", ".button-sale", function(){
    that.getPropertyPrice();
  });
  $(document).on("click", "#button-purchase-property", function(){
    that.sendTransaction();
  });
  $(document).ready(function(){
    that.userBalance();
  });
  $(document).ready(function(){
    that.loadPurchaseConfirmation();
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
  this.instance.getUser(address, function(error, info){
      if(error){
          console.log(error)
      }
      if(info[0] != ""){ // if not null, we display information
        var no_record = document.getElementById("no-record");
        var record = document.getElementById("record");
        no_record.style.display = "none";
        record.style.display = "block";
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
                  
              }
              else{
                  $("#message").text("Transfer Failed");
              }
          }
      })
}

function purchaseProperty(propertyID){
  var property_id = parseInt(propertyID);
  localStorage.setItem("purchaseProp", property_id);
}

OwnershipRegistrationApp.prototype.getPropertyPrice =  function() {
  var that = this;
  this.getpListID(function (error, pListID) {
    if (error) {
      console.log(error);
    }
    for (let i = 1; i <= pListID; i++) {
      var propertyNo = i;
      var property_ID = localStorage.getItem("purchaseProp");
      
      if (propertyNo == property_ID){
        that.getProperty(propertyNo, function (error, property) {
          if (error) {
            console.log(error);
          }
          var saleprice = property[6];
          var saleperson = property[4];
          var saleowner = property[3];
          var saleaddress = property[0];
          var saleunit = property[1];
          var salelife = property[2];
          localStorage.setItem("purchasePrice", saleprice);
          localStorage.setItem("purchaseReceiver", saleperson);
          localStorage.setItem("purchaseOwner", saleowner);
          localStorage.setItem("purchaseAddress", saleaddress);
          localStorage.setItem("purchaseUnit", saleunit);
          localStorage.setItem("purchaseLife", salelife);
          window.location.replace("payment.html");
        });
      }
    }
  });
}

OwnershipRegistrationApp.prototype.loadSales = function () {
  var that = this;
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
        var sale = property[5];
        if (sale){
          var propertyAddress = property[0];
          var propertyUnit = property[1];
          var propertyLife = property[2];
          var propertySaleStats = property[5];
          var propertySalePrice = property[6];
          var salePropertyTemplate = '<div class="container d-flex justify-content-center align-items-center mt-5"><div class="container-flex col-xl-12 sale-property-list"><div class="py-5 px-5"><div class="row content d-flex justify-content-center align-items-center g-0"><div class=""><div class="sale-property-info d-flex justify-content-center align-items-center"><img src="src/img/logo.png" alt="" style="max-width: 200px;"></div></div></div><div class="row content d-flex justify-content-center align-items-center g-0"><div class="col"><div class="sale-property-info"><div class="sale-streetaddress">' + propertyAddress + '</div></div></div><div class="col"><div class="sale-property-info d-flex justify-content-end"><div class="sale-propertyid">' + '# ' + i + '</div></div></div></div><hr><div class="row content d-flex justify-content-center align-items-center g-0"><div class="mb-1"><div class="sale-property-info"><div class="sale-propertyunit">' + '<b>Property Unit Number:</b> #' + propertyUnit + '</div></div></div></div><div class="row content d-flex justify-content-center align-items-center g-0"><div class="col"><div class="sale-property-info"><div class="sale-propertylife">' + '<b>Property Lifespan: </b>' + propertyLife + '</div></div></div><div class="col"><div class="sale-property-info"><div class="sale-propertysalestats">' + '<b>For Sale: </b>' + propertySaleStats + '</div></div></div><div class="col"><div class="sale-property-info"><div class="sale-propertysaleprice">' + '<b>Sales Price:</b> ' + propertySalePrice + ' ETH' + '</div></div></div></div><div class="row content d-flex justify-content-center align-items-center g-0"><div class="sale-property-info"><button class="btn btn-primary button-sale mt-4" id="button-sale-transfer" onclick="purchaseProperty(' + i + ')">' + 'Purchase' + '</button></div></div></div></div></div>';
          $("#cataloglist").append(salePropertyTemplate);
        }
      });
    }
  });
}

OwnershipRegistrationApp.prototype.transferOwnership = function() {
  var that = this;
  var address = localStorage.getItem("CurrAddress");
  var soldpropertyid = localStorage.getItem("purchaseProp");

  this.getUser(address, function(error, info){
    if(error){
        console.log(error)
    }
    if(info[0] != ""){ // if not null, let's transfer ownership
      var newfname = info[1];
      var newnric = info[0];
      var newemail = info[2];
      var newaddress = info[3];
      localStorage.setItem("successPropertyOwner", newfname);
      localStorage.setItem("successPropertyNRIC", newnric);
      localStorage.setItem("successPropertyEmail", newemail);
      localStorage.setItem("successPropertyWallet", newaddress);
      that.instance.getProperty(soldpropertyid, function(error, property){
        if(error){
          console.log(error)
        }
        var salePropertyAddress = property[0];
        var salePropertyUnit = property[1];
        var salePropertyLife = property[2];
        localStorage.setItem("successPropertyAddress", salePropertyAddress);
        localStorage.setItem("successPropertyUnit", salePropertyUnit);
        localStorage.setItem("successPropertyLife", salePropertyLife);
        that.officialTransfer();
      })
    }
  })
}

OwnershipRegistrationApp.prototype.officialTransfer = function(){
  var soldPropertyID = localStorage.getItem("purchaseProp");
  var soldPropertyOwner = localStorage.getItem("successPropertyOwner");
  var soldPropertyWallet = localStorage.getItem("successPropertyWallet");
  var soldPropertyNRIC = localStorage.getItem("successPropertyNRIC");
  var soldPropertyAddress = localStorage.getItem("successPropertyAddress");
  var soldPropertyUnit = localStorage.getItem("successPropertyUnit");
  var soldPropertyLife = localStorage.getItem("successPropertyLife");
  var soldPropertyEmail = localStorage.getItem("successPropertyEmail");
  var soldPropertySaleStatus = false;
  var soldPropertySalePrice = "0";

  this.instance.transferProperty(soldPropertyID, soldPropertyOwner, soldPropertyWallet, soldPropertyNRIC, soldPropertyAddress, soldPropertyUnit, soldPropertyLife, soldPropertyEmail, soldPropertySaleStatus, soldPropertySalePrice,
    // gas required to execure the transcation
    { from: this.web3.eth.accounts[0], gas: 1000000, gasPrice: 1000000000, gasLimit: 1000000},
    function(){
      if(error){
        console.log(error);
      }
      else{
        if(receipt.status == 1){

        }
        else{
          $("#message").text("Transfer Failed");
        }
      }
    }
  )
}

OwnershipRegistrationApp.prototype.loadPurchaseConfirmation = function(){
  // var saleprice = property[6];
  // var saleperson = property[4];
  // var saleowner = property[3];
  // var saleaddress = property[0];
  // var saleunit = property[1];
  // var salelife = property[2];
  // localStorage.setItem("purchasePrice", saleprice);
  // localStorage.setItem("purchaseReceiver", saleperson);
  // localStorage.setItem("purchaseOwner", saleowner);
  // localStorage.setItem("purchaseAddress", saleaddress);
  // localStorage.setItem("purchaseUnit", saleunit);
  // localStorage.setItem("purchaseLife", salelife);
  var confirmAddress = localStorage.getItem("purchaseAddress");
  var confirm
}