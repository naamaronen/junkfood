//User model
const User = require("../model/User");
const bcrypt = require("bcryptjs");

//@route POST api/users
//@desc Register new user
//access public
module.exports = app => {
  app.post("/api/register", (req, res) => {
    //Simple validation
    if (!req.body.fullName || !req.body.username || !req.body.password) {
      return res.status(404).send({ msg: "Please enter all fields" });
    }
    //Check for existing user - by username
    User.findOne({ username: req.body.username }).then(user => {
      if (user) {
        return res.status(404).send({ msg: "User already exist!" });
      }
      try {
        req.body.password = bcrypt.hashSync(req.body.password, 10);

        const newUser = new User({
          fullName: req.body.fullName,
          username: req.body.username,
          location: req.body.location,
          picture: req.body.picture,
          password: req.body.password
        });

        newUser.save().then(user => {
          res.json(user);
          res.end();
        });
      } catch (error) {
        res.status(500).send(error);
      }
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

  app.post("/api/users/getProfile", (req, res) => {
    User.findOne({ username: req.body.username })
      .select("-password")
      .populate("reviews")
      .then(user => {
        res.json(user);
        res.end();
      });
  });

  app.post("/api/register/update", (req, res) => {
    console.log("User.get/users/api/register/update");
    const { username, fullName, picture, location } = req.body;

    User.findOne({ username })
      .populate("reviews")
      .then(user => {
        user.fullName = fullName;
        user.location = location;
        user.picture = picture;
        user.save();
        res.json(user);
        res.end();
      });
  });

  app.post("/api/search_user", (req, res) => {
    console.log("api/search_user");
    const { name, fullName, location } = req.body;
    if (location != null && fullName != null && name != null) {
      User.find({
        username: new RegExp(`^${name}$`, "i"),
        location: new RegExp(`^${location}$`, "i"),
        fullName: new RegExp(`^${fullName}$`, "i")
      })
        .sort({ fullName: 1 })
        .populate("reviews")
        .then(users => {
          res.json(users);
          res.end();
        });
    } else if (fullName != null && location === null && name === null) {
      User.find({
        fullName: new RegExp(`^${fullName}$`, "i")
      })
        .sort({ fullName: 1 })
        .populate("reviews")
        .then(users => {
          res.json(users);
          res.end();
        });
    } else if (location != null && name === null && fullName === null) {
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
