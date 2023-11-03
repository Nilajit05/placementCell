// requiring the library
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

//connecting to the database
mongoose.connect(
  "mongodb+srv://placement123:987654321@cluster0.tp5xdt5.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// acquiring the connection to check if it is succesfull
const db = mongoose.connection;

// checking for the error
db.on("error", console.error.bind(console, "error in connecting the database"));

// up and running then print the statement
db.once("open", () => {
  console.log("succesfully connected to database");
});

// exporting the connection
module.exports = db;
