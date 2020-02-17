const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
const ReviewSchema = new Schema({
  userReview: { ref: "User", type: Schema.Types.ObjectId },
  restaurantReview: { ref: "Restaurant", type: Schema.Types.ObjectId },
  picture: {
    type: String,
    required: false
  },
  rates: {
    type: {
      BathroomQuality: 0,
      StaffKindness: 0,
      Cleanliness: 0,
      DriveThruQuality: 0,
      DeliverySpeed: 0,
      FoodQuality: 0
    },
    required: false
  },

  averageRate: 0,

  restaurantName: {
    type: String,
    required: false
  },

  date: {
    type: Date,
    default: Date.now()
  },

  stringDate: {
    type: String,
    default: ""
  }
});

module.exports = Review = mongoose.model("Review", ReviewSchema);
