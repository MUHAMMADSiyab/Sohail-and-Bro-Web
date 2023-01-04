const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://sohail:sohailwebeng@techoverflow.qn9wl.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const db = client.db("web-class-db");

const collection = (name) => db.collection(name);

module.exports = {
  client,
  db,
  collection,
};
