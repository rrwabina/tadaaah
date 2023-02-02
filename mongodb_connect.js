const MongoClient = require("mongodb").MongoClient;

const uri = "mongodb+srv://rrwabina:Carpediem13@cluster.mongodb.net/test?retryWrites=true&w=majority";

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
