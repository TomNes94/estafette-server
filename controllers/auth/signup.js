const { Users } = require("../../models");

const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {
  // Save User to Database
  try {
    const user = await Users.findOne({
      where: { emailAddress: req.body.emailAddress },
    });
    user.password = bcrypt.hashSync(req.body.password, 10);

    await user.save();
    res.send({ message: "User was registered successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
