const { Teams } = require("../../models");

module.exports = async (req, res) => {
  const allTeams = await Teams.findAll({
    where: {
      matchId: 2,
    },
  });
  let mappedData = allTeams.map((team) => team.dataValues);
  res.send(mappedData);
};
