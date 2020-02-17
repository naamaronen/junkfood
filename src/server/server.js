const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const { resolve } = require("path");
const fs = require("fs");
const path = require("path");


const config = {
  mongoURL:
    process.env.MONGO_URL ||
    "mongodb+srv://naama:n7711543@cluster0-5e7d1.mongodb.net/test?retryWrites=true&w=majority",
  port: 5000
};

//setup database
mongoose.Promise = global.Promise;
// MongoDB Connection
if (process.env.NODE_ENV !== "test") {
  mongoose.connect(config.mongoURL, { useNewUrlParser: true }, error => {
    if (error) {
      console.error("Please make sure Mongodb is installed and running!");
      throw error;
    } else console.log("connected to database!");
  });
}

const app = express();

app.use('/source/images', express.static('images'))
//body parser for json. must be done before API routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); //handle body requests
console.log(__dirname);
app.use(express.static(path.join(__dirname, "public")));

// Add backend api routes
fs.readdirSync(__dirname + "/api").forEach(file => {
  require(`./api/${file.substr(0, file.indexOf("."))}`)(app);
});

app.listen(config.port || 5000, () =>
  console.log(`Listening on port ${process.env.PORT || 5000}!`)
);
