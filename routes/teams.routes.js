const { authJwt } = require("../middleware");
const controller = require("../controllers/teams");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/teams", authJwt.verifyToken, controller.getTeams);
  app.get("/api/teams/standings", controller.getStandings);
};
