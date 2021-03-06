//User model
const User = require("../model/User");
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
    let reply = { success: false };

    if (!username || !password) {
      reply.msg = "Please enter all fields";
      return res.status(400).send(reply);
    }
    //Check for existing user - by username
    User.findOne({ username }).then(user => {
      if (!user) {
        reply.msg = "User does not exist!";
        return res.status(400).send(reply);
      }
      if (!bcrypt.compareSync(password, user.password)) {
        reply.msg = "Incorrect password.";
        return res.status(400).send(reply);
      }
      reply.success = true;
      reply.username = username;
      return res.send(reply);
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
};
