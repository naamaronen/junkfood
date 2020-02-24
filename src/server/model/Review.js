const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
const ReviewSchema = new Schema({
  user: { ref: "User", type: Schema.Types.ObjectId },
  restaurantReview: { ref: "Restaurant", type: Schema.Types.ObjectId },
  pictures: [{ ref: "Image", type: Schema.Types.ObjectId }],
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
    type: Date
  },

  stringDate: {
    type: String,
    default: ""
  }
});

module.exports = Review = mongoose.model("Review", ReviewSchema);
