/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "teams",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
      },
      teamName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "team_name",
      },
      totalDistance: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        field: "total_distance",
      },
      matchId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "matches",
          key: "id",
        },
        field: "match_id",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "created_at",
      },
      isStarted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: "is_started",
      },
      isFinished: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: "is_finished",
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "updated_at",
      },
      distanceCovered: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        field: "distance_covered",
      },
      totalTimeTaken: {
        type: DataTypes.BIGINT,
        allowNull: true,
        field: "total_time_taken",
      },
      totalParticipantsFinished: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "total_participants_finished",
      },
    },
    {
      tableName: "teams",
    }
  );
};
