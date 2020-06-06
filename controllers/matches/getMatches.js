const { Matches } = require("../../models");

module.exports = async (req, res, next) => {
  const match = await Matches.findOne({
    where: {
      name: "Acloop",
    },
    attributes: [
      "name",
      "organization",
      "dateStart",
      "dateEnd",
      "numberOfTeams",
    ],
  });

  if (match !== undefined) {
    res.send(match.dataValues);
  } else {
    res.status(404).send({ message: "Match not found" });
  }
};
