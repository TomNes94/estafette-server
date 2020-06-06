module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "first_name",
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "last_name",
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "email_address",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "password",
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
  });

  return Users;
};
