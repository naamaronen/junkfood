//Restaurant model
const Restaurant = require("../model/Restaurant");

//@route GET api/restaurants
//@desc get all restaurants
//access public
module.exports = app => {
  app.get("/api/restaurants", function(req, res) {
    console.log("Restaurant.get/api/restaurants");
    Restaurant.find()
      .sort({ date: -1 })
      .populate("reviews")
      .then(rests => {
        rests.map(rest => {
          const numOfRev = rest.reviews.length;
          var currRate = 0;
          rest.reviews.map(review => {
            currRate = currRate + review.averageRate;
          });
          var avgRate = 0;
          if (numOfRev != 0) avgRate = currRate / numOfRev;
          rest.averageRate = avgRate;
          rest.save();
        });
        res.json(rests);
        res.end();
      })
      .catch(e => console.log(e));
  });

  //@route POST api/restaurants
  //@desc Create a Post
  //access public
  app.post("/api/restaurants", (req, res) => {
    let reply = { success: false };
    if (!req.body.name || !req.body.location) {
      reply.msg = "Please enter all fields";
      return res.status(400).send(reply);
    }
    let restDetails = req.body;
    Restaurant.findOne(restDetails).then(rest => {
      if (rest) {
        reply.msg = "Restaurant already in database";
        return res.status(400).send(reply);
      }
      restDetails.date = Date.now();
      const newRestaurant = new Restaurant(restDetails);
      newRestaurant.stringDate = newRestaurant.date.toLocaleString();
      newRestaurant.save().then(restaurant => {
        reply.success = true;
        reply.restaurant = restaurant;
        res.json(reply);
      });
    });
  });

  app.post("/api/restaurant/reviews", function(req, res) {
    const { name } = req.body;
    Restaurant.findOne({ name })
      .populate({
        path: "reviews",
        populate: { path: "user", model: "User" }
      })
      .populate({
        path: "reviews",
        populate: { path: "pictures", model: "Image" }
      })
      .then(restaurant => {
        res.json(restaurant);
        res.end();
      });
  });

  app.post("/api/search_rest", (req, res) => {
    const { name, location, rate } = req.body;
    if (location != "" && name != "") {
      Restaurant.find({
        name: new RegExp(`^${name}`, "i"),
        location: new RegExp(`${location}`, "i")
      })
        .populate("reviews")
        .then(rests => {
          res.json(rests);
          res.end();
        });
    } else if (location != "" && rate === null) {
      Restaurant.find({
        location: new RegExp(`${location}`, "i")
      })
        .sort({ name: 1 })
        .populate("reviews")
        .then(rests => {
          res.json(rests);
          res.end();
        });
    } else if (location != "" && rate != null) {
      Restaurant.find({
        location: new RegExp(`${location}`, "i")
      })
        .populate("reviews")
        .then(rests => {
          const Rests = [];
          rests.map(rest => {
            const numOfRev = rest.reviews.length;
            var currRate = 0;
            rest.reviews.map(review => {
              currRate = currRate + review.averageRate;
            });
            const avgRate = currRate / numOfRev;
            if (avgRate >= Number(rate)) {
              Rests.push(rest);
            }
          });
          res.json(Rests);
          res.end();
        })
        .catch(e => console.log(e));
    } else if (rate != null) {
      Restaurant.find({
        name: new RegExp(`^${name}`, "i")
      })
        .populate("reviews")
        .then(rests => {
          const Rests = [];
          rests.map(rest => {
            const numOfRev = rest.reviews.length;
            var currRate = 0;
            rest.reviews.map(review => {
              currRate = currRate + review.averageRate;
            });
            const avgRate = currRate / numOfRev;
            if (avgRate >= Number(rate)) {
              Rests.push(rest);
            }
          });
          res.json(Rests);
          res.end();
        })
        .catch(e => console.log(e));
    } else {
      Restaurant.find({
        name: new RegExp(`^${name}`, "i")
      })
        .populate("reviews")
        .then(rests => {
          res.json(rests);
          res.end();
        });
    }
  });
};
