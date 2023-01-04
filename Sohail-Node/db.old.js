const { MongoClient, ServerApiVersion } = require("mongodb");

let connection;

module.exports = {
  connectToServer(callback) {
    const uri =
      "mongodb+srv://sohail:sohailwebeng@techoverflow.qn9wl.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    });

    client.connect((err, client) => {
      connection = client;

      return callback(err);
    });
  },

  getDB() {
    return connection.db("web-class-db");
  },

  getCollection(name) {
    return this.getDB().collection(name);
  },

  closeConnection() {
    connection.close();
  },
};
