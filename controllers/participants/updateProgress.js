const { Participants } = require("../../models");

module.exports = async (req, res, next) => {
  const participant = await Participants.findOne({
    where: {
      userId: req.userId,
    },
  });
  if (!participant.isStarted) {
    participant.isStarted = true;
    participant.dateStart = Date.now();
  }

  participant.distanceCovered = req.body.distanceCovered;

  participant.timeTaken = Date.now() - new Date(participant.dateStart);

  if (participant.distance <= req.body.distanceCovered) {
    participant.isFinished = true;
    participant.dateEnd = Date.now();
  }
  await participant.save();
  await participant.reload();

  next();
};
