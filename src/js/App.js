$(document).ready(function(){
    $(".walletAddress").append(localStorage.getItem("CurrAddress"));
  });

// ===== Validation =====

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const validatePrice = (price) => {
  return price.match(
    /^\d{1,3}(?:\.\d{1,2})?$|^\.\d{1,4}$/
  );
};

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

function returnCatalog(){
  window.location.replace('catalog.html');
}

// ===== OBTAIN METAMASK ACCOUNT BALANCE =====

OwnershipRegistrationApp.prototype.userBalance = async function() {
  var currentadd = localStorage.getItem("CurrAddress");
  var balanceHEX = await window.ethereum.request({ "method": "eth_getBalance", "params": [currentadd, "latest"]});
  var balanceWEI = parseInt(balanceHEX, 16);
  var balanceLong = balanceWEI / 10e17
  var balance = parseFloat(balanceLong).toFixed(4);
  localStorage.setItem("CurrentUserBalance", balance);
  $(".ethbalance").append('<svg xmlns="http://www.w3.org/2000/svg" width="0.63em" height="1em" viewBox="0 0 320 512"><path fill="currentColor" d="M311.9 260.8L160 353.6L8 260.8L160 0zM160 383.4L8 290.6L160 512l152-221.4z"/></svg>&nbsp' + balance)
}

// ===== ACTUALLY SEND ETH =====

OwnershipRegistrationApp.prototype.sendTransaction = async function() {
  var that = this;
  var price = localStorage.getItem("purchasePrice");
  var receiver = localStorage.getItem("purchaseReceiver");
  var salePrice = localStorage.getItem("purchasePrice");
  var currBalance = localStorage.getItem("CurrentUserBalance");
  var error_display = document.getElementById("error-message-banner-purchase-property");
  var finalPrice = parseInt(salePrice);
  var finalBalance = parseInt(currBalance);

  if(finalPrice <= finalBalance){
    let params = [{
      "from": localStorage.getItem("CurrAddress").toString(16),
      "to": receiver,
      "gas": Number(21000).toString(16),
      "gasPrice": Number(2500000).toString(16),
      "value": Number(price*10e17).toString(16),
    }];
  
    try {
      var result = await window.ethereum.request({ method: "eth_sendTransaction", params });
      // process the result if needed
      that.transferOwnership();
    } catch (err) {
      console.log(err);
      error_display.style.display = "block";
      $("#error-message-purchase-property").append("Transaction failed, please try again!");
    }
  }
  else{
    error_display.style.display = "block";
    $("#error-message-purchase-property").append("You balance is too low for this purchase!");
  }
}

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
  address: "0x4c932887e70cdd131ebfa4757bc4f895d49ab16d",
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
  });
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
  document.getElementById("error-message-register-user").innerHTML = "";
  var userName = $("#fname-input").val();
  var userIC = $("#id-input").val();
  var userEmail = $("#email-input").val();
  var userAddress = localStorage.getItem("CurrAddress");
  var error_display = document.getElementById("error-message-banner-register-user");
  
  if(userName == ""){
    error_display.style.display = "block";
    $("#error-message-register-user").append('Please enter your full name!');
  }
  else{
    if(userIC == ""){
      error_display.style.display = "block";
      $("#error-message-register-user").append('Please enter identification number!');
    }
    else{
      if(userEmail == ""){
        error_display.style.display = "block";
        $("#error-message-register-user").append('Please enter email address!');
      }
      else{
        if(validateEmail(userEmail)){
          error_display.style.display = "none";
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
                  that.checkUserExist();
                }
                else{
                  $("#error-message-register-user").append('Transaction failed, please try again!');
                } 
              }
            }
          )
        }
        else{
          error_display.style.display = "block";
          $("#error-message-register-user").append('Please enter a valid email address!');
        }
      }
    }
  }
}

OwnershipRegistrationApp.prototype.registerProperty = function(){
  document.getElementById("error-message-register-property").innerHTML = "";
  var propertyAddress = $("#streetaddress-input").val();
  var propertyUnit = $("#unit-input").val();
  var propertyLife = $("#propertylife-input option:selected").text();
  var propertySaleStatus = $("input[name='salestatus']:checked").prop('value') === 'true';
  var propertySalePrice = $("#saleprice-input").val();
  var propertyImg = document.getElementById("register-property-file");
  var address = localStorage.getItem("CurrAddress");
  var propertyOwner = localStorage.getItem("CurrName");
  var propertyOwnerEmail = localStorage.getItem("CurrEmail");
  var propertyOwnerNRIC = localStorage.getItem("CurrNRIC");
  var error_display = document.getElementById("error-message-banner-register-property")

  if(propertyAddress == ""){
    error_display.style.display = "block";
    $("#error-message-register-property").append('Please enter a Street Address');
  }
  else{
    if(propertyUnit == ""){
      error_display.style.display = "block";
      $("#error-message-register-property").append('Please enter a Unit Number');
    }
    else{
      if(propertySalePrice == ""){
        error_display.style.display = "block";
        $("#error-message-register-property").append('Please enter a Sale Price, 0 for property not for sale');
      }
      else{
        if(validatePrice(propertySalePrice)){
          if(propertyImg.value != ""){
            const fr = new FileReader();

            fr.readAsDataURL(propertyImg.files[0]);

            fr.addEventListener('load', () => {
              const url = fr.result;
              
              var i = 1;
              do {
                i += 1;
              }while(localStorage.getItem("PropertyImg"+i) != null);

              localStorage.setItem("PropertyImg"+i, url);
            })
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
                    $("#error-message-register-property").append('Transaction failed, please try again!');
                  } 
                }
              }
            )
          }
          else{
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
                    $("#error-message-register-property").append('Transaction failed, please try again!');
                  } 
                }
              }
            )
          }
        }
        else{
          error_display.style.display = "block";
          $("#error-message-register-property").append('Please enter a Sale Price, 0 for property not for sale');
        }
      }
    }
  }
}

function updateStatus(propertyID){
  var property_id = parseInt(propertyID);
  localStorage.setItem("updateStatus", property_id);
  console.log(localStorage.getItem("updateStatus"));
}

OwnershipRegistrationApp.prototype.loadUpdateStatus = function(){
  document.getElementById("street-address").innerHTML = "";
  document.getElementById("unit-no").innerHTML = "";
  document.getElementById("lifespan").innerHTML = "";
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
            $("#unit-no").append('#' + property[1]);
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
  document.getElementById("error-message-update-property").innerHTML = "";
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
  var updatePropertyImg = document.getElementById("update-property-file");
  var error_display = document.getElementById("error-message-banner-update-property");

  if(updatePropertySales == ""){
    error_display.style.display = "block";
    $("#error-message-update-property").append('Please enter a Sale Price, 0 for property not for sale');
  }
  else{
    if(validatePrice(updatePropertySales)){
      if(updatePropertyImg.value != ""){
        const fr = new FileReader();

        fr.readAsDataURL(propertyImg.files[0]);

        fr.addEventListener('load', () => {
          const url = fr.result;

          localStorage.setItem("PropertyImg"+updateID, url);
        })
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
                $("#error-message-update-property").append("Transaction failed, please try again!");
              }
            }
          }
        )
      }
      else{
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
                $("#error-message-update-property").append("Transaction failed, please try again!");
              }
            }
          }
        )
      }
    }
    else{
      error_display.style.display = "block";
      $("#error-message-update-property").append('Please enter a Sale Price, 0 for property not for sale');
    }
  }
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
          that.getUser(saleperson,  function(error, info){
            if(error){
              console.log(error)
            }
            if(info[0] != null){
              var saleemail = info[2];
              localStorage.setItem("purchaseEmail", saleemail);
              window.location.replace("payment.html");
            }
          })
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
          var propertyOwner = property[4];
          var currentUser = localStorage.getItem("CurrAddress");
          const url = localStorage.getItem("PropertyImg"+i);
          if (propertyOwner = currentUser){
            var salePropertyTemplate = '<div class="container d-flex justify-content-center align-items-center mt-5"><div class="container-flex col-xl-12 sale-property-list"><div class="pt-3 pb-5 px-5"><div class="row content d-flex justify-content-center align-items-center g-0"><div class=""><div class="sale-property-info d-flex justify-content-center align-items-center"><img src="'+url+'" alt="" style="max-width: 150px;"></div></div></div><div class="row content d-flex justify-content-center align-items-center g-0"><div class="col"><div class="sale-property-info"><div class="sale-streetaddress">' + propertyAddress + '</div></div></div><div class="col"><div class="sale-property-info d-flex justify-content-end"><div class="sale-propertyid">' + '# ' + i + '</div></div></div></div><hr><div class="row content d-flex justify-content-center align-items-center g-0"><div class="mb-1"><div class="sale-property-info"><div class="sale-propertyunit">' + '<b>Property Unit Number:</b> #' + propertyUnit + '</div></div></div></div><div class="row content d-flex justify-content-center align-items-center g-0"><div class="col"><div class="sale-property-info"><div class="sale-propertylife">' + '<b>Property Lifespan: </b>' + propertyLife + '</div></div></div><div class="col"><div class="sale-property-info"><div class="sale-propertysalestats">' + '<b>For Sale: </b>' + propertySaleStats + '</div></div></div><div class="col"><div class="sale-property-info"><div class="sale-propertysaleprice">' + '<b>Sales Price:</b> ' + propertySalePrice + ' ETH' + '</div></div></div></div><div class="row content d-flex justify-content-center align-items-center g-0"><div class="sale-property-info"><button class="btn btn-primary button-sale mt-4" id="button-sale-transfer" onclick="purchaseProperty(' + i + ')" disabled>' + 'Purchase' + '</button></div></div></div></div></div>';
            $("#cataloglist").append(salePropertyTemplate);
          }
          else{
            var salePropertyTemplate = '<div class="container d-flex justify-content-center align-items-center mt-5"><div class="container-flex col-xl-12 sale-property-list"><div class="pt-3 pb-5 px-5"><div class="row content d-flex justify-content-center align-items-center g-0"><div class=""><div class="sale-property-info d-flex justify-content-center align-items-center"><img src="'+url+'" alt="" style="max-width: 150px;"></div></div></div><div class="row content d-flex justify-content-center align-items-center g-0"><div class="col"><div class="sale-property-info"><div class="sale-streetaddress">' + propertyAddress + '</div></div></div><div class="col"><div class="sale-property-info d-flex justify-content-end"><div class="sale-propertyid">' + '# ' + i + '</div></div></div></div><hr><div class="row content d-flex justify-content-center align-items-center g-0"><div class="mb-1"><div class="sale-property-info"><div class="sale-propertyunit">' + '<b>Property Unit Number:</b> #' + propertyUnit + '</div></div></div></div><div class="row content d-flex justify-content-center align-items-center g-0"><div class="col"><div class="sale-property-info"><div class="sale-propertylife">' + '<b>Property Lifespan: </b>' + propertyLife + '</div></div></div><div class="col"><div class="sale-property-info"><div class="sale-propertysalestats">' + '<b>For Sale: </b>' + propertySaleStats + '</div></div></div><div class="col"><div class="sale-property-info"><div class="sale-propertysaleprice">' + '<b>Sales Price:</b> ' + propertySalePrice + ' ETH' + '</div></div></div></div><div class="row content d-flex justify-content-center align-items-center g-0"><div class="sale-property-info"><button class="btn btn-primary button-sale mt-4" id="button-sale-transfer" onclick="purchaseProperty(' + i + ')">' + 'Purchase' + '</button></div></div></div></div></div>';
            $("#cataloglist").append(salePropertyTemplate);
          }
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
  document.getElementById("error-message-purchase-property").innerHTML = "";
  var confirmAddress = localStorage.getItem("purchaseAddress");
  var confirmUnit = localStorage.getItem("purchaseUnit");
  var confirmPropertyID = localStorage.getItem("purchaseProp");
  var confirmPrice = localStorage.getItem("purchasePrice");
  var confirmLifespan = localStorage.getItem("purchaseLife");
  var confirmName = localStorage.getItem("purchaseOwner");
  var confirmEmail = localStorage.getItem("purchaseEmail");
  var confirmWallet = localStorage.getItem("purchaseReceiver");
  const url = localStorage.getItem("PropertyImg"+confirmPropertyID);
  
  $(".paymentImg").html('<img src="'+url+'" style="max-width: 150px;">');
  $(".paymentAddress").append(confirmAddress + '&nbsp<div class="paymentAddressUnit">#' + confirmUnit + '</div>');
  $(".paymentAddressID").append('# ' + confirmPropertyID);
  $(".paymentAmountEth").append('&nbsp&nbsp&nbsp<svg xmlns="http://www.w3.org/2000/svg" width="0.63em" height="1em" viewBox="0 0 320 512"><path fill="currentColor" d="M311.9 260.8L160 353.6L8 260.8L160 0zM160 383.4L8 290.6L160 512l152-221.4z"/></svg>&nbsp' + confirmPrice + '</div>');
  $(".paymentLifespan").append('Property Lifespan: ' + confirmLifespan);
  $(".paymentOwnerNameResult").append(confirmName);
  $(".paymentOwnerEmailResult").append(confirmEmail);
  $(".paymentOwnerWalletResult").append(confirmWallet);
}