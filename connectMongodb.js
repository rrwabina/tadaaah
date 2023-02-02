// THIS IS FINAL

const {MongClient, MongoClient, Db} = require('mongodb')
const url = 'mongodb+srv://rrwabina:Carpediem13@maindb.ium16x6.mongodb.net/?retryWrites=true&w=majority';
const databaseName = 'maindb'
const client = new MongoClient(url);


async function dbConnect() { 
    let result = await client.connect();
    db = result.db(databaseName);
    return db.collection('cookiedb');

}
module.exports = dbConnect;
