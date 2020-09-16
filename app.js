const express = require("express");
let app = express();

//Require dependencies
require("dotenv").config(".env");
app.use(express.json());
app.use(require("helmet")());
app.use(require("cors")());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

require("./routes/auth.routes")(app);
require("./routes/teams.routes")(app);
require("./routes/matches.routes")(app);
require("./routes/progress.routes")(app);
require("./routes/participants.routes")(app);
require("./routes/public.routes")(app);
require("./routes/setup.routes")(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

module.exports = app;
