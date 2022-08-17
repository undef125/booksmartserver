const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config({ path: './.env' }); //giving location of .env file

const dbUrl = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@ac-gpr1fb2-shard-00-00.qhn3vk2.mongodb.net:27017,ac-gpr1fb2-shard-00-01.qhn3vk2.mongodb.net:27017,ac-gpr1fb2-shard-00-02.qhn3vk2.mongodb.net:27017/?ssl=true&replicaSet=atlas-zeqhuh-shard-0&authSource=admin&retryWrites=true&w=majority`;
// const dbUrl = `mongodb://localhost:27017`;
const ConnectDB = async() => {
    try {
        await mongoose.connect(dbUrl, { useNewUrlParser: true});
        console.log("database connected successfully!!");
    } catch (error) {
        console.log("Error while connecting: " + error);
    }
}
module.exports = ConnectDB;  //exporting connection function