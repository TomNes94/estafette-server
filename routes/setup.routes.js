const { insertPlayer, insertTeam } = require("../controllers/setup");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, Content-Type, Accept");
    next();
  });
  app.post("/api/setup/player", insertPlayer);
  app.post("/api/setup/team", insertTeam);
};
