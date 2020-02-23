const mongoose = require("mongoose");
//Review model
const Review = require("../model/Review");
const User = require("../model/User");
const Restaurant = require("../model/Restaurant");
const Image = require("../model/Image");
const upload = require("../image");

module.exports = app => {
  app.get("/api/reviews", function(req, res) {
    console.log("Review.get/api/reviews");
    Review.find()
      .populate("pictures")
      .then(reviews => {
        res.json(reviews);
        res.end();
      });
  });

  app.post("/api/reviews", upload.array("pictures"), (req, res) => {
    console.log("Review.post/api/reviews");
    let newImages = req.files.map(file => {
      let newImage = new Image({ imageData: file.path });
      newImage.save();
      console.log(newImage);
      return newImage;
    });
    const newReview = new Review({
      pictures: newImages,
      rates: {
        BathroomQuality: parseInt(req.body.BathroomQuality),
        StaffKindness: parseInt(req.body.StaffKindness),
        Cleanliness: parseInt(req.body.Cleanliness),
        DriveThruQuality: parseInt(req.body.DriveThruQuality),
        DeliverySpeed: parseInt(req.body.DeliverySpeed),
        FoodQuality: parseInt(req.body.FoodQuality)
      },
      averageRate: parseFloat(req.body.averageRate),
      restaurantName: req.body.restaurantName,
      _id: new mongoose.Types.ObjectId()
    });
    newReview.stringDate = newReview.date.toLocaleString();
    newReview.save(function() {
      User.findOne({ username: req.body.user }).then(user => {
        user.reviews.push(newReview);
        user.save(() => {
          newReview.user = user;

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
        success: true,
        message: "review added",
        review: newReview
      });
    });
  });

  app.post("/api/reviews/update", (req, res) => {
    let { _id, picture, averageRate } = req.body;
    let {
      BathroomQuality,
      StaffKindness,
      Cleanliness,
      DriveThruQuality,
      DeliverySpeed,
      FoodQuality
    } = req.body;
    let rates = {
      BathroomQuality,
      StaffKindness,
      Cleanliness,
      DriveThruQuality,
      DeliverySpeed,
      FoodQuality
    };
    Review.findOneAndUpdate({ _id }, { rates, picture, averageRate }).then(
      review => {
        review.save(function() {
          return res.send({
            succsees: true,
            message: "review added",
            review: review
          });
        });
      }
    );
  });

  app.delete("/api/reviews/:id", (req, res) => {
    const id = req.params.id;
    Review.findOneAndDelete({ _id: id })
      .populate({
        path: "user",
        populate: { path: "reviews" }
      })
      .populate({
        path: "restaurantReview",
        populate: { path: "reviews" }
      })
      .then(review => {
        const userId = review.user._id;
        const restId = review.restaurantReview._id;
        User.findById(userId)
          .populate("reviews")
          .then(user => {
            for (var i = 0; i < user.reviews.length; i++) {
              if (`${user.reviews[i]._id}` === id) {
                user.reviews.splice(i, 1);
              }
            }
            user.save();
          })
          .catch(err => console.log(err));
        Restaurant.findById(restId)
          .populate("reviews")
          .then(rest => {
            for (var i = 0; i < rest.reviews.length; i++) {
              if (`${rest.reviews[i]._id}` === id) {
                rest.reviews.splice(i, 1);
              }
            }
            rest.save();
          })
          .catch(err => console.log(err));
      });
  });

  app.post("/api/reviews/field_sort", function(req, res) {
    console.log("Review.sort/api/reviews/field_sort");
    const { sortField, name } = req.body;
    console.log(req.body);
    const sortBy = `rates.${sortField}`;
    Review.find({ restaurantName: name })
      .populate("user")
      .populate("pictures")
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
    let sortType = null,
      dateQuery = null;
    switch (sortTime) {
      case "newest":
        sortType = { date: -1 };
        break;
      case "oldest":
        sortType = { date: 1 };
        break;
      case "lastWeek":
        dateQuery = new Date(new Date().setDate(new Date().getDate() - 7));
        break;
      case "lastMonth":
        dateQuery = new Date(new Date().setMonth(new Date().getMonth() - 1));
        break;
      case "lastYear":
        dateQuery = new Date(
          new Date().setFullYear(new Date().getFullYear() - 1)
        );
        break;
    }

    if (sortType) {
      Review.find({ restaurantName: name })
        .populate("user")
        .populate("pictures")
        .sort(sortType)
        .then(reviews => {
          res.json(reviews);
          res.end();
        });
    }
    if (dateQuery) {
      Review.find({
        restaurantName: name,
        date: { $gte: dateQuery }
      })
        .populate("user")
        .populate("pictures")
        .then(reviews => {
          res.json(reviews);
          res.end();
        });
    }
  });
};
