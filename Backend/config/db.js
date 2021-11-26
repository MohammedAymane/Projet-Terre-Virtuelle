const mongoose = require("mongoose");
const mongoRUI = require("./key.json").mongoURI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoRUI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
