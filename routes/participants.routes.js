const { authJwt } = require("../middleware");
const controller = require("../controllers/participants");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get(
    "/api/participant",
    authJwt.verifyToken,
    controller.getParticipantInfo
  );
};
