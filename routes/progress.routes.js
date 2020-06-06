const { authJwt } = require("../middleware");
const teamsController = require("../controllers/teams");
const participantController = require("../controllers/participants");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/progress/update_progress",
    authJwt.verifyToken,
    participantController.updateProgress,
    teamsController.updateProgress
  );
};
