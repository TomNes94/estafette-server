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

  const allParticipants = await Participants.findAll({
    where: {
      teamId: team.id,
    },
  });

  const allParticipantsInfo = allParticipants.map((p) => ({
    ...p.dataValues,
  }));

  console.log(allParticipantsInfo);

  res.status(200).send({
    teamInfo: { ...team.dataValues },
    allParticipantsInfo,
    participantInfo: { ...participant.dataValues },
  });
};
