const { Users } = require("../models");

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  Users.findOne({
    where: {
      emailAddress: req.body.emailAddress,
    },
  })
    .then((user) => {
      if (!user) {
        res.status(400).send({
          message: "Failed! Email not found",
        });
        return;
      } else next();
    })
    .catch((err) => console.log("err"));
};

module.exports = checkDuplicateUsernameOrEmail;
