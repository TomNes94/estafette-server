const { Users, Tokens } = require("../../models");
const { v4: uuidv4 } = require("uuid");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = (req, res) => {
  Users.findOne({
    where: {
      emailAddress: req.body.emailAddress,
    },
  })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      let token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
        expiresIn: 86400, // 24 hours
      });
      const refreshToken = uuidv4();
      const dbToken = await Tokens.findOne({ where: { userId: user.id } });
      if (!!dbToken) {
        dbToken.refreshToken = refreshToken;
        dbToken.save();
      } else {
        Tokens.create({ userId: user.id, refreshToken });
      }

      res.status(200).send({
        userId: user.id,
        accessToken: token,
        refreshToken,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err.message });
    });
};
