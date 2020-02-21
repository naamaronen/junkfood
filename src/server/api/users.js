//User model
const User = require("../model/User");
const Image = require("../model/Image");
const bcrypt = require("bcryptjs");
const upload = require("../image");

//@route POST api/users
//@desc Register new user
//access public
module.exports = app => {
  app.post("/api/register", upload.single("imageData"), (req, res) => {
    console.log("User.post/api/account/register");
    const reply = {success: false};
    //Simple validation
    if (!req.body.fullName || !req.body.username || !req.body.password) {
      reply.msg = "Please enter all fields";
      return res.status(400).send(reply);
    }
    //Check for existing user - by username
    User.findOne({ username: req.body.username }).then(user => {
      if (user) {
        reply.msg = "Username already in use! Please choose another";
        return res.status(400).send(reply);
      }
      // valid query. register the user
      let newImage = null;
      if (req.file) {
        newImage = new Image({
          imageData: req.file.path
        });
        newImage.save();
      }

      req.body.password = bcrypt.hashSync(req.body.password, 10);
      const newUser = new User({
        fullName: req.body.fullName,
        username: req.body.username,
        location: req.body.location,
        picture: newImage,
        password: req.body.password
      });
      newUser.save().then(user => {
        reply.success=true;
        reply.user = user;
        res.json(reply);
        res.end();
      });
    });
  });

  app.get("/api/register", (req, res) => {
    console.log("User.get/api/account/register");
    User.find()
      .sort({ fullName: 1 })
      .select("-password")
      .then(users => {
        res.json(users);
        res.end();
      });
  });

  app.post("/api/register/update", upload.single("imageData"), (req, res) => {
    console.log("User.get/users/api/register/update");
    const reply = {success: false};
    //Simple validation
    if (!req.body.fullName || !req.body.location) {
      reply.msg = "Can't enter empty name or location.";
      return res.status(400).send(reply);
    }
    let newImage = null;
    if (req.file) {
      newImage = new Image({
        imageData: req.file.path
      });
      newImage.save();
    }
    let username = req.body.username;
    User.findOne({ username })
      .populate("reviews")
      .then(user => {
        user.fullName = req.body.fullName;
        user.location = req.body.location;
        if (newImage != null) user.picture = newImage;
        user.save();
        reply.user = user;
        reply.username = username;
        reply.success = true;
        res.json(reply);
        res.end();
      });

    app.post("/api/users/getProfile", (req, res) => {
      console.log("users.post/api/users/getProfile");
      User.findOne({ username: req.body.username })
        .select("-password")
        .populate("reviews")
        .populate({
          path: "reviews",
          populate: { path: "pictures", model: "Image" }
        })
        .then(user => {
          res.json(user);
          res.end();
        });
    });
  });

  app.get("/api/users/fetch", function(req, res) {
    console.log("/api/users/fetch");
    User.find()
      .populate("reviews")
      .then(users => {
        res.json(users);
        res.end();
      });
  });

  app.post("/api/search_user", (req, res) => {
    console.log("api/search_user");
    const { name, fullName, location } = req.body;
    if (location != "" && fullName != null && name != "") {
      User.find({
        username: new RegExp(`^${name}$`, "i"),
        location: new RegExp(`^${location}$`, "i"),
        fullName: new RegExp(`^${fullName}$`, "i")
      })
        .sort({ fullName: 1 })
        .populate("reviews")
        .populate({
          path: "reviews",
          populate: { path: "pictures", model: "Image" }
        })
        .populate("picture")
        .then(users => {
          res.json(users);
          res.end();
        });
    } else if (fullName != null && location === "" && name === "") {
      User.find({
        fullName: new RegExp(`^${fullName}$`, "i")
      })
        .sort({ fullName: 1 })
        .populate("reviews")
        .populate({
          path: "reviews",
          populate: { path: "pictures", model: "Image" }
        })
        .then(users => {
          res.json(users);
          res.end();
        });
    } else if (location != "" && name === "" && fullName != null) {
      User.find({
        location: new RegExp(`^${location}$`, "i"),
        fullName: new RegExp(`^${fullName}$`, "i")
      })
        .sort({ fullName: 1 })
        .populate({
          path: "reviews",
          populate: { path: "pictures", model: "Image" }
        })
        .then(users => {
          res.json(users);
          res.end();
        });
    } else if (location != "" && name != "" && fullName === null) {
      User.find({
        location: new RegExp(`^${location}$`, "i"),
        username: new RegExp(`^${name}$`, "i")
      })
        .sort({ fullName: 1 })
        .populate({
          path: "reviews",
          populate: { path: "pictures", model: "Image" }
        })
        .then(users => {
          res.json(users);
          res.end();
        });
    } else if (location != "" && name === "" && fullName === null) {
      User.find({
        location: new RegExp(`^${location}$`, "i")
      })
        .sort({ fullName: 1 })
        .populate({
          path: "reviews",
          populate: { path: "pictures", model: "Image" }
        })
        .then(users => {
          res.json(users);
          res.end();
        });
    } else if (location === "" && name != "" && fullName != null) {
      User.find({
        fullName: new RegExp(`^${fullName}$`, "i"),
        username: new RegExp(`^${name}$`, "i")
      })
        .sort({ fullName: 1 })
        .populate({
          path: "reviews",
          populate: { path: "pictures", model: "Image" }
        })
        .then(users => {
          res.json(users);
          res.end();
        });
    } else {
      User.find({
        username: new RegExp(`^${name}$`, "i")
      })
        .sort({ fullName: 1 })
        .populate("reviews")
        .populate({
          path: "reviews",
          populate: { path: "pictures", model: "Image" }
        })
        .then(users => {
          res.json(users);
          res.end();
        });
    }
  });
};
