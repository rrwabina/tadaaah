export default function logEvent(eventName, eventDetailed) { 
    const logEntry = {
        eventName,
        eventDetailed,
        timestamp: new Date().getTime()
      };
    
    const dbName=  'Tadahh_log';
    const objectStoreName = 'logs';


    const request = indexedDB.open(dbName);
    
    request.onerror = function(event) {
        console.error('Error opening database:', event.target.error);
      };

    request.onupgradeneeded = function(event) {
      const db = event.target.result;

    if (!db.objectStoreNames.contains('logs')) {
        const objectStore = db.createObjectStore('logs', { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex('timestamp', 'timestamp', { unique: false });
    }
    };

    request.onsuccess = function(event) {
      const db = event.target.result;
  
      if (db.objectStoreNames.contains(objectStoreName)) {
        performTransaction(db, logEntry);
      } else {
        createObjectStore(db);
      }
  
      db.close();
    };

    function createObjectStore(db) {
      const version = db.version + 1;
  
      db.close();
  
      const request = indexedDB.open(dbName, version);
  
      request.onupgradeneeded = function(event) {
        const db = event.target.result;
        db.createObjectStore(objectStoreName, { keyPath: 'id', autoIncrement: true });
      };
  
      request.onsuccess = function(event) {
        const db = event.target.result;
        performTransaction(db);
      };
  
      request.onerror = function(event) {
        console.error('Error creating object store:', event.target.error);
      };
    }
  
    function performTransaction(db) {
      const transaction = db.transaction([objectStoreName], 'readwrite');
      const objectStore = transaction.objectStore(objectStoreName);
      const addRequest = objectStore.add({ logEntry });
  
      addRequest.onsuccess = function() {
        console.log('Log event stored successfully.');
      };
  
      transaction.onerror = function() {
        console.error('Transaction error:', transaction.error);
      };
    }

    }