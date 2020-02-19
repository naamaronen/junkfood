//User model
const User = require("../model/User");
const upload = require("../image");
const Image = require("../model/Image");
const bcrypt = require("bcryptjs");

//@route POST api/users
//@desc Register new user
//access public
module.exports = app => {
  app.post("/api/register", upload.single("imageData"), (req, res) => {
    console.log("User.post/api/account/register");
    console.log(req.body.fullName);
    //Simple validation
    if (!req.body.fullName || !req.body.username || !req.body.password) {
      console.log("missing fields");
      return res.status(404).send({ msg: "Please enter all fields" });
    }
    //Check for existing user - by username
    User.findOne({ username: req.body.username }).then(user => {
      if (user) {
        console.log("user exists");
        return res.status(404).json({ msg: "User already exist!" });
      }
      let newImage = null;
      console.log(req);
      console.log(req.file);
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
        res.json(user);
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
    let newImage = null;
    //console.log(req);
    //console.log(req.body);
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
        res.json(user);
        res.end();
      });

    app.post("/api/users/getProfile", (req, res) => {
      User.findOne({ username: req.body.username })
        .select("-password")
        .populate("reviews")
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
        .then(users => {
          res.json(users);
          res.end();
        });
    } else if (location != "" && name === "" && fullName === null) {
      User.find({
        location: new RegExp(`^${location}$`, "i")
      })
        .sort({ fullName: 1 })
        .populate("reviews")
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
        .then(users => {
          res.json(users);
          res.end();
        });
    }
  });
};
