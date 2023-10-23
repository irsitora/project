const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
  mongoose.set('strictQuery', false);
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(colors.blue.bold.underline('MongoDB connected....'));
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = connectDB;
