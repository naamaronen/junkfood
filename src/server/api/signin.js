//User model
const User = require("../model/User");
const UserSession = require("../model/UserSession");

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
      return res.status(404).json({ msg: "Please enter all fields" });
    }
    //Check for existing user - by username
    User.find({ username }).then(user => {
      if (!user) {
        return res.status(404).json({ msg: "User does not exist!" });
      }
      console.log(password);
      //if (!user[0].validPassword(req.body.password)) {
      //  return res.status(404).json({ msg: "Wrong Password!" });
      //}
      const newUserSession = new UserSession({
        userId: user[0]._id,
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
        .populate("picture").populate("reviews")
      .then(user => {
        res.json(user);
        res.end();
      });
  });

  // @route DELETE api/users/id
  // @desc Delete a user
  // access public

  app.post("/api/signout/userSessions", (req, res) => {
    console.log(req.body);
    UserSession.findOne(req.body)
      .then(user => user.remove().then(() => res.json({ success: true })))
      .catch(err => res.status(404).json({ success: false }));
  });
};
