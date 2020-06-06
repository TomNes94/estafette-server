const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  `postgres://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DBHOST}:${process.env.DBPORT}/${process.env.DATABASE}`,
  {
    logging: false,
  }
);

const Users = require("../models/users.js")(sequelize, DataTypes);
const Teams = require("../models/teams.js")(sequelize, DataTypes);
const Participants = require("../models/participants.js")(sequelize, DataTypes);
const Matches = require("../models/matches.js")(sequelize, DataTypes);
const Tokens = require("../models/tokens.js")(sequelize, DataTypes);

Teams.hasMany(Participants);
Participants.belongsTo(Users);

Tokens.sync();

module.exports = { Users, Teams, Participants, Matches, Tokens };
