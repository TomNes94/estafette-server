const { Teams, Participants, Users } = require("../../models");
const Sequelize = require("sequelize");
const axios = require("axios");

function sendPushNotificationRequest(deviceToken) {
  axios
    .post(
      "https://fcm.googleapis.com/fcm/send",
      {
        notification: {
          title: "Acloop",
          text: "It's your turn!",
        },
        priority: "High",
        to: deviceToken,
      },
      {
        headers: {
          Authorization:
            "key=AAAArU3TH7s:APA91bHjjff6AfSZHbyXYkTuVAXMOxZ4vW_Z2x8Qmt_ZBb0kLoMqV6c6hylYoQZezinpRTzEGpzHkX6SZAg0AG8UVHBxXchq6FkYeQ9k1MgKkx2_5_q0RgQKAnRGQJIciulqy4wL-ZgK",
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });
}

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
  } else {
    const nextParticipant = await Participants.findOne({
      where: {
        position: participant.position + 1,
      },
    });

    const user = await Users.findOne({
      where: {
        id: nextParticipant.userId,
      },
    });

    console.log(user);

    console.log(nextParticipant);

    sendPushNotificationRequest(user.deviceToken);
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
