const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
const UserSessionSchema = new Schema({
  userId: {
    type: String,
    default: ""
  },
  username: {
    type: String,
    default: ""
  },
  timestamp: {
    type: Date,
    default: Date.now()
  }
});

module.exports = UserSession = mongoose.model("UserSession", UserSessionSchema);
