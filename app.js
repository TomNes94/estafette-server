const express = require("express");
require("dotenv").config(".env");
const path = require("path");
let app = express();
const { Pool } = require("pg");
const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DATABASE,
  password: process.env.DBPASS,
  port: 5432,
});

app.use(express.json());
app.use(require("helmet")());
app.use(require("cors")());

app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

app.get("/form", function (req, res, next) {
  res.sendFile(path.join(__dirname + "/public/views/team.html"));
});

app.post("/insert_team", function (req, res, next) {
  let code = makeid(12);
  let query = `INSERT INTO teams(
    team_name, total_distance, match_id, created_at, is_started, is_finished, updated_at, distance_covered, invitation_key, current_position)
    VALUES ('${req.body.teamName}', 70000, 2, current_timestamp, false, false, current_timestamp, 0, '${code}', 1); `;

  pool.query(query, (err, result) => {
    res.send({ teamCode: code });
  });

  let matchQuery = `UPDATE matches
    SET number_of_teams = number_of_teams + 1
    WHERE id = 2`;

  pool.query(matchQuery, (err, result) => {});
});

app.post("/insert_player", function (req, res, next) {
  let query = `INSERT INTO users(
    first_name, last_name, email_address, password, created_at, updated_at)
    VALUES ('${req.body.firstname}', '${req.body.lastname}', '${req.body.email}', NULL, current_timestamp, current_timestamp);
  
    SELECT id
    FROM users
    WHERE email_address = '${req.body.email}';
    
    SELECT id
    FROM teams
    WHERE invitation_key = '${req.body.teamcode}';`;
  pool.query(query, (err, result) => {
    let userid = result[1].rows[0].id;
    let teamid = result[2].rows[0].id;
    let newquery = `INSERT INTO participants(
      user_id, team_id, distance, date_start, date_end, created_at, updated_at, is_started, is_finished, position)
        VALUES(${userid}, ${teamid}, ${req.body.distance}, NULL, NULL, current_timestamp, current_timestamp, false, false, ${req.body.position});`;
    pool.query(newquery, (err, result) => {
      res.send("Klaar");
    });
  });
});
app.use(function (req, res, next) {
  console.log(req.originalUrl);
  console.log(req.body);
  next();
});
require("./routes/auth.routes")(app);
require("./routes/teams.routes")(app);
require("./routes/matches.routes")(app);
require("./routes/progress.routes")(app);
require("./routes/participants.routes")(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
});

const http = require("http");
const WebSocket = require("ws");
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
server.listen(3000);
function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

wss.on("connection", (ws) => {
  //connection is up, let's add a simple simple event
  ws.on("message", (message) => {
    //log the received message and send it back to the client
    console.log("received: %s", message);
    ws.send(`Hello, you sent -> ${message}`);
  });

  //send immediatly a feedback to the incoming connection
  ws.send("Hi there, I am a WebSocket server");
});
