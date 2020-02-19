//User model
const User = require("../model/User");
const UserSession = require("../model/UserSession");
const bcrypt = require("bcryptjs");

//@route POST api/signin
//@desc Signin new user
//access public
module.exports = app => {
  //login
  app.post("/api/signin", (req, res) => {
    console.log("User.post/api/signin");
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      return res.status(404).send({ msg: "Please enter all fields" });
    }
    //Check for existing user - by username
    User.findOne({ username }).then(user => {
      if (!user) {
        return res.status(404).send({ msg: "User does not exist!" });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(400).send({ message: "The password is invalid" });
      }
      const newUserSession = new UserSession({
        userId: user._id,
        username: username
      });
      newUserSession.save((err, doc) => {
        return res.send({
          succsees: true,
          message: "valid sign in",
          token: doc._id,
          username: username
        });
      });
    });
  });

  app.post("/api/signin/userSessions", function(req, res) {
    console.log("User.get/api/signin");
    User.findOne({ username: req.body.username })
        .populate("picture")
        .populate({
          path: "reviews",
          populate: { path: "pictures", model: "Image" }
        })
      .then(user => {
        res.json(user);
        res.end();
      });
  });

  app.post("/api/signin/userSessionsReview", function(req, res) {
    console.log("/api/signin/userSessionsReview");
    User.findOne({ username: req.body.user })
        .populate({
          path: "reviews",
          populate: { path: "pictures", model: "Image" }
        })
      .then(user => {
        res.json(user);
        res.end();
      });
  });

  // @route DELETE api/users/id
  // @desc Delete a user
  // access public
};
