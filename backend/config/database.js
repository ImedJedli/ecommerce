const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectDatabase = () => {
  mongoose.connect(process.env.DB_LOCAL_URI).then((con) => {
    console.log(`MongoDB database connected with : ${con.connection.host}`);
  });
};

module.exports = connectDatabase;
