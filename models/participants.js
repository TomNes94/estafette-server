module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "participants",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
        field: "user_id",
      },
      teamId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "teams",
          key: "id",
        },
        field: "team_id",
      },
      distance: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        field: "distance",
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
      dateStart: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "date_start",
      },
      dateEnd: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "date_end",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "created_at",
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
      timeStarted: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "time_started",
      },
      timeTaken: {
        type: DataTypes.BIGINT,
        allowNull: true,
        field: "time_taken",
      },
    },
    {
      tableName: "participants",
    }
  );
};
