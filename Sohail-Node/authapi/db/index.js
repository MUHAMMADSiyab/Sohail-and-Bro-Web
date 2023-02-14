const { ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");
const config = require("config");

module.exports = function connectDB() {
  try {
    mongoose.set("strictQuery", false);
    const uri = config.get("dbConfig.mongoUri");
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    });

    console.log("Database Connected");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};
