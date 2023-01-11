const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = "mongodb://localhost:27017/";
// "mongodb+srv://sohail:sohailwebeng@techoverflow.qn9wl.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const db = client.db("testdb");

const collection = (name) => db.collection(name);

module.exports = {
  client,
  db,
  collection,
};
