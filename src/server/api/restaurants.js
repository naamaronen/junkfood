//const auth = require("../../middleware/auth");

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
      .then(restaurants => {
        res.json(restaurants);
        res.end();
      });
  });

  //@route POST api/restaurants
  //@desc Create a Post
  //access public
  app.post("/api/restaurants", (req, res) => {
    const newRestaurant = new Restaurant({
      name: req.body.name,
      location: req.body.location
    });
    newRestaurant.stringDate = newRestaurant.date.toLocaleString();
    newRestaurant.save().then(restaurant => res.json(restaurant));
  });

  //@route DELETE api/restaurants/id
  //@desc Delete a restaurant
  //access public
  app.delete("/api/restaurants:id", (req, res) => {
    Restaurant.findById(req.params.id)
      .then(restaurant =>
        restaurant.remove().then(() => res.json({ success: true }))
      )
      .catch(err => res.status(404).json({ success: false }));
  });

  app.post("/api/restaurant/reviews", function(req, res) {
    const { name } = req.body;
    Restaurant.findOne({ name })
      .populate({
        path: "reviews",
        populate: { path: "userReview", model: "User" }
      })
      .then(restaurant => {
        res.json(restaurant);
        res.end();
      });
  });

  app.post("/api/search_rest", (req, res) => {
    console.log("api/search_rest");
    const { name, location, rate } = req.body;
    console.log(req.body);
    if (location != null && name != null && name != "") {
      Restaurant.find({
        name: new RegExp(`^${name}$`, "i"),
        location: new RegExp(`^${location}$`, "i")
      })
        .sort({ name: 1 })
        .populate("reviews")
        .then(rests => {
          res.json(rests);
          res.end();
        });
    } else if (location != null && rate === null) {
      console.log(`search for location: ${location}`);
      Restaurant.find({
        location: new RegExp(`^${location}$`, "i")
      })
        .sort({ name: 1 })
        .populate("reviews")
        .then(rests => {
          res.json(rests);
          res.end();
        });
    } else if (location != null && rate != null) {
      Restaurant.find({
        location: new RegExp(`^${location}$`, "i"),
        averageRate: rate
      })
        .sort({ name: 1 })
        .populate("reviews")
        .then(rests => {
          res.json(rests);
          res.end();
        });
    } else if (rate != null) {
      Restaurant.find({
        name: new RegExp(`^${name}$`, "i"),
        averageRate: rate
      })
        .sort({ name: 1 })
        .populate("reviews")
        .then(rests => {
          res.json(rests);
          res.end();
        });
    } else {
      Restaurant.find({
        name: new RegExp(`^${name}$`, "i")
      })
        .sort({ name: 1 })
        .populate("reviews")
        .then(rests => {
          res.json(rests);
          res.end();
        });
    }
  });
};
