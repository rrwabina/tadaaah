function handleLoginStatus(message) {
  const messageElement = document.getElementById('message');
  if (message.loggedIn) {
    // Cookie exists, the user is logged in
    messageElement.textContent = 'Cookie exists: ' + message.cookieName;
  } else {
    // Cookie does not exist, the user is not logged in
    messageElement.textContent = 'Cookie does not exist';
  }
}

// Send a message to the service worker to check login status
function sendLoginStatusRequest() {
  chrome.runtime.sendMessage({ checkLoginStatus: true });
}

// Listen for messages from the service worker
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.hasOwnProperty('loggedIn')) {
    handleLoginStatus(message);
  }
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('exportButton').addEventListener('click', exportDataToCSV);
    showLatestTransactions();
    document.getElementById('deleteButton').addEventListener('click', deleteAllData);
    sendLoginStatusRequest();
  });
  
  
  function exportDataToCSV() {
    const dbName = 'Tadahh_log';
    const objectStoreName = 'logs';
  
    const request = indexedDB.open(dbName);
  
    request.onerror = function(event) {
      console.error('Error opening database:', event.target.error);
    };
  
    request.onsuccess = function(event) {
      const db = event.target.result;
      const transaction = db.transaction(objectStoreName, 'readonly');
      const objectStore = transaction.objectStore(objectStoreName);
      const getAllRequest = objectStore.getAll();
  
      getAllRequest.onsuccess = function() {
        const logsData = getAllRequest.result;
        const csvContent = convertToCSV(logsData);
  
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
  
        chrome.downloads.download({
          url: url,
          filename: 'logs.csv',
          saveAs: true
        });
      };
  
      transaction.onerror = function() {
        console.error('Transaction error:', transaction.error);
      };
  
      db.close();
    };
  }
  
  function convertToCSV(data) {
    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));
  
    for (const row of data) {
      const values = headers.map(header => {
        const escaped = ('' + row[header]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    }
  
    return csvRows.join('\n');
  }

  function deleteAllData() {
    const dbName = 'Tadahh_log';
    const request = indexedDB.deleteDatabase(dbName);
  
    request.onerror = function(event) {
      console.error('Error deleting database:', event.target.error);
    };
  
    request.onsuccess = function(event) {
      console.log('Database deleted successfully.');
      // Update the UI or perform any other actions after deletion.
      // showLatestTransactions();
    };
  };

  function showLatestTransactions() {
    const dbName = 'Tadahh_log';
    const objectStoreName = 'logs';
  
    const request = indexedDB.open(dbName);
  
    request.onerror = function(event) {
      console.error('Error opening database:', event.target.error);
    };
  
    request.onsuccess = function(event) {
      const db = event.target.result;

      if (db.objectStoreNames.contains(objectStoreName)) {
        const transaction = db.transaction(objectStoreName, 'readonly');
        const objectStore = transaction.objectStore(objectStoreName);
        const getAllRequest = objectStore.getAll();
  
        getAllRequest.onsuccess = function() {
          const logsData = getAllRequest.result;
          const latestTransactions = logsData.slice(-10).reverse();
  
          const transactionsContainer = document.getElementById('transactionsContainer');
          transactionsContainer.innerHTML = '';
  
          for (const transaction of latestTransactions) {
            const transactionElement = document.createElement('div');
            transactionElement.textContent = JSON.stringify(transaction);
            transactionsContainer.appendChild(transactionElement);
          }
        };
  
        transaction.onerror = function() {
          console.error('Transaction error:', transaction.error);
        };
      } else {
        console.log('Object store does not exist.');
      }
  
      db.close();
    };


}


