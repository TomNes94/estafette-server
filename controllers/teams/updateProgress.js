const { Teams, Participants } = require("../../models");
const Sequelize = require("sequelize");

module.exports = async (req, res) => {
  const participant = await Participants.findOne({
    where: {
      userId: req.userId,
    },
  });

  const teamSum = await Teams.findOne({
    attributes: [
      [
        Sequelize.fn("SUM", Sequelize.col("participants.distance_covered")),
        "distanceCovered",
      ],
      [
        Sequelize.fn("SUM", Sequelize.col("participants.time_taken")),
        "totalTimeTaken",
      ],
      "id",
    ],
    include: [
      {
        model: Participants,
        attributes: [],
      },
    ],
    group: ["teams.id"],
    where: {
      id: participant.teamId,
    },
  });

  const team = await Teams.findOne({
    where: {
      id: participant.teamId,
    },
  });

  if (participant.isFinished) {
    team.currentPosition += 1;
  }

  if (!team.isStarted) {
    team.isStarted = true;
    team.timeStarted = Date.now();
  }

  team.totalTimeTaken = teamSum.totalTimeTaken;
  team.distanceCovered = teamSum.distanceCovered;

  if (team.totalDistance <= team.distanceCovered) {
    team.isFinished = true;
    team.timeFinished = Date.now();
  }

  await team.save();
  await team.reload();

  res.send(
    JSON.stringify({
      participantIsFinished: participant.isFinished,
      teamIsFinished: team.isFinished,
    })
  );
};
