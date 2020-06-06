const { Tokens } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    let token = await Tokens.findOne({
      where: { userId: req.body.userId },
    });
    if (token.refreshToken === req.body.refreshToken) {
      let newToken = jwt.sign(
        { userId: req.body.userId },
        process.env.SECRET_KEY,
        {
          expiresIn: 86400, // 24 hours
        }
      );

      res.send({ userId: req.body.userId, accessToken: newToken });
    }
  } catch (e) {
    res.status(401).send("No Refresh token found");
  }
};
