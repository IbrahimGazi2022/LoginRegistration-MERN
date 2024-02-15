const mongoose = require("mongoose");
const colors = require("colors");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDb Connect Successfull`.bgYellow.bold);
  } catch (error) {
    console.log(`MongoDb Connect Error`.bgYellow.bold);
  }
};

module.exports = connectDb;
