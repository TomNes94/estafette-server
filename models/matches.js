module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "matches",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "name",
      },
      organization: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "organization",
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
      numberOfTeams: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "number_of_teams",
      },
    },
    {
      tableName: "matches",
    }
  );
};
