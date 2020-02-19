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

  app.post("/api/reviews", upload.array('pictures'), (req, res) => {
    console.log("Review.post/api/reviews");
    let newImages = req.files.map( file => {
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
        succsees: true,
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
      .populate("user")
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
        .populate("user")
        .sort({ date: -1 })
        .then(reviews => {
          res.json(reviews);
          res.end();
        });
    }

    if (sortTime === "oldest") {
      Review.find({ restaurantName: name })
        .populate("user")
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
        .populate("user")
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
        .populate("user")
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
        .populate("user")
        .then(reviews => {
          res.json(reviews);
          res.end();
        });
    }
  });
};
