module.exports = (sequelize, DataTypes) => {
  const Tokens = sequelize.define(
    "tokens",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        field: "user_id",
      },
      refreshToken: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "refresh_token",
      },
    },
    { timestamps: false }
  );

  return Tokens;
};
