//UserSession model
const UserSession = require("../model/UserSession");

//@route POST api/signin
//@desc Signin new user
//access public
module.exports = app => {
  app.post("/api/signout/userSessions", (req, res) => {
    console.log(req.body);
    UserSession.findOne({ username: req.body.username })
      .then(user => user.remove().then(() => res.json({ success: true })))
      .catch(err => res.status(404).json({ success: false }));
  });
};
