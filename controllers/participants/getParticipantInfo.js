const { Participants } = require("../../models");

module.exports = async (req, res, next) => {
  const participant = await Participants.findOne({
    where: {
      userId: req.userId,
    },
  });

  res.send(
    JSON.stringify({
      participantInfo: {
        ...participant.dataValues,
      },
    })
  );
};
