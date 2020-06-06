const { Participants, Teams } = require("../../models");

module.exports = async (req, res, next) => {
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

  const isNext = team.currentPosition === participant.position;

  res.send(
    JSON.stringify({ participantInfo: { isNext, ...participant.dataValues } })
  );
};
