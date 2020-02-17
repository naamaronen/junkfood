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
    newReview.stringDate = newReview.date.toLocaleString();
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

  // app.delete("/api/reviews/:id", (req, res) => {
  //   Review.findById(req.params.id)
  //     .then(review => review.remove().then(() => res.json({ success: true })))
  //     .catch(err => res.status(404).json({ success: false }));
  // });

  app.post("/api/reviews/field_sort", function(req, res) {
    console.log("Review.sort/api/reviews/field_sort");
    const { sortField, name } = req.body;
    console.log(req.body);
    const sortBy = `rates.${sortField}`;
    Review.find({ restaurantName: name })
      .populate("userReview")
      .sort({ [sortBy]: -1 })
      .then(reviews => {
        res.json(reviews);
        res.end();
      });
  });

  app.post("/api/reviews/time_sort", function(req, res) {
    console.log("Review.sort/api/reviews/time_sort");
    const { sortTime, name } = req.body;
    console.log(req.body);
    if (sortTime === "newest") {
      Review.find({ restaurantName: name })
        .populate("userReview")
        .sort({ date: -1 })
        .then(reviews => {
          res.json(reviews);
          res.end();
        });
    }

    if (sortTime === "oldest") {
      Review.find({ restaurantName: name })
        .populate("userReview")
        .sort({ date: 1 })
        .then(reviews => {
          res.json(reviews);
          res.end();
        });
    }
    if (sortTime === "lastWeek") {
      Review.find({
        restaurantName: name,
        date: { $gte: new Date(new Date().setDate(new Date().getDate() - 7)) }
      })
        .populate("userReview")
        .then(reviews => {
          res.json(reviews);
          res.end();
        });
    }

    if (sortTime === "lastMonth") {
      Review.find({
        restaurantName: name,
        date: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)) }
      })
        .populate("userReview")
        .then(reviews => {
          res.json(reviews);
          res.end();
        });
    }

    if (sortTime === "lastYear") {
      Review.find({
        restaurantName: name,
        date: {
          $gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1))
        }
      })
        .populate("userReview")
        .then(reviews => {
          res.json(reviews);
          res.end();
        });
    }
  });
};
