$(document).ready(function() {
  $("#confirmedAddress").append(localStorage.getItem("CurrAddress"));
});

// ===== OBTAIN WALLET ADDRESS =====

document.addEventListener("DOMContentLoaded", function () {
    // Check if Web3 is injected by Metamask
    if (typeof web3 !== 'undefined') {
        // Use the injected provider
        web3 = new Web3(web3.currentProvider);
  
        // Update the wallet address on page load
        updateWalletAddress();
  
        // Set up an event listener for account changes
        window.ethereum.on('accountsChanged', function (accounts) {
            // Update the wallet address when the account changes
            updateWalletAddress();
        });
    } else {
        // Metamask not detected
        displayWalletAddress("Metamask not detected. Please install Metamask to use this feature.");
    }
  });
  
  function updateWalletAddress() {
    // Get the current Ethereum address
    web3.eth.getAccounts().then(function (accounts) {
        var currentAddress = accounts[0];
        displayWalletAddress(currentAddress);
        localStorage.setItem("CurrAddress", currentAddress)
    });
  };
  
  function displayWalletAddress(address) {
    var walletAddressElement = document.getElementById('walletAddress');
    walletAddressElement.textContent = address || "Not connected to Metamask";
  };
