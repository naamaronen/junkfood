const mongoose = require("mongoose");
//Review model
const Review = require("../model/Review");
const User = require("../model/User");
const Restaurant = require("../model/Restaurant");

module.exports = app => {
  app.get("/api/reviews", function(req, res) {
    console.log("Review.get/api/reviews");
    Review.find().then(reviews => {
      res.json(reviews);
      res.end();
    });
  });

  app.post("/api/reviews", (req, res) => {
    const newReview = new Review({
      picture: req.body.picture,
      rates: {
        BathroomQuality: req.body.BathroomQuality,
        StaffKindness: req.body.StaffKindness,
        Cleanliness: req.body.Cleanliness,
        DriveThruQuality: req.body.DriveThruQuality,
        DeliverySpeed: req.body.DeliverySpeed,
        FoodQuality: req.body.FoodQuality
      },
      averageRate: req.body.averageRate,
      restaurantName: req.body.restaurantName,
      _id: new mongoose.Types.ObjectId()
    });

    newReview.save(function() {
      User.findOne({ username: req.body.userReview }).then(user => {
        user.reviews.push(newReview);
        user.save(() => {
          newReview.userReview = user;

          Restaurant.findOne({ name: req.body.restaurantName }).then(
            restaurant => {
              restaurant.reviews.push(newReview);
              restaurant.save(() => {
                newReview.restaurantReview = restaurant;
                newReview.save();
              });
            }
          );
        });
      });

      return res.send({
        succsees: true,
        message: "review added",
        review: newReview
      });
    });
  });

  app.delete("/api/reviews:id", (req, res) => {
    Review.findById(req.params.id)
      .then(review => review.remove().then(() => res.json({ success: true })))
      .catch(err => res.status(404).json({ success: false }));
  });
};
