const { Teams, Participants } = require("../../models");

module.exports = async (req, res) => {
  const participant = await Participants.findOne({
    where: {
      userId: req.userId,
    },
  });

  const team = await Teams.findOne({
    where: {
      id: participant.teamId,
    },
  });

  res.status(200).send({
    teamInfo: { ...team.dataValues },
    participantInfo: { ...participant.dataValues },
  });
};
