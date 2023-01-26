const { ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');

module.exports = function connectDB() {
    try {
        mongoose.set('strictQuery', false);
        const uri = "mongodb://localhost:27017/";
        mongoose.connect(uri, {
           useNewUrlParser: true,
           useUnifiedTopology: true,
           serverApi: ServerApiVersion.v1,
         })
   
         console.log("Database Connected");
    } catch (error) {
        console.log(error);
        process.exit();
    }
}