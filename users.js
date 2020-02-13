const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//Restaurant model
const User = require("../model/User");

//@route POST api/users
//@desc Register new user
//access public
module.exports = app =>
  app.post("/", (req, res) => {
    const {
      fullName,
      username,
      location = "",
      picture = "",
      password
    } = req.body;
    //Simple validation
    if (!fullName || !username || !password) {
      return res.status(404).json({ msg: "Please enter all fields" });
    }
    //Check for existing user - by username
    User.findOne({ username }).then(user => {
      if (user) {
        return res.status(404).json({ msg: "User already exist!" });
      }
      const newUser = new User({
        fullName,
        username,
        location,
        picture,
        password
      });
      //Create salt & hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then(user => {
            jwt.sign(
              {
                id: user._id
              },
              config.get("jwtSecret"),
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token,
                  user: {
                    id: user._id,
                    fullName: user.fullName,
                    username: user.username,
                    location: user.location,
                    picture: user.picture
                  }
                });
              }
            );
          });
        });
      });
    });
  });

//@route GET api/users
//@desc get all users
//access public
module.exports = app =>
  app.get("/", (req, res) => {
    User.find()
      .sort({ fullName: 1 })
      .select("-password")
      .then(users => res.json(users));
  });

//@route DELETE api/users/id
//@desc Delete a user
//access public
module.exports = app =>
  app.delete("/:id", (req, res) => {
    User.findById(req.params.id)
      .then(user => user.remove().then(() => res.json({ success: true })))
      .catch(err => res.status(404).json({ success: false }));
  });
