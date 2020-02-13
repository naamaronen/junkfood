const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
const RestaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  averageRate: 0,

  date: {
    type: Date,
    default: Date.now
  },
  reviews: [{ ref: "Review", type: Schema.Types.ObjectId }]
});

module.exports = Restaurant = mongoose.model("Restaurant", RestaurantSchema);
