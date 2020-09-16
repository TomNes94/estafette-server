const path = require("path");

module.exports = function (app) {
  app.get("/support", function (req, res, next) {
    res.sendFile(path.join(__dirname + "/public/views/support.html"));
  });
};
