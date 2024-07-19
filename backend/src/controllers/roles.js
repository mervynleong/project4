const Roles = require("../models/Roles");

const getRoles = async (req, res) => {
  try {
    const roles = await Roles.find();
    res.json(roles.map((item) => item.role));
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "cannot get roles" });
  }
};

const seedRoles = async (req, res) => {
  try {
    await Roles.deleteMany({});

    await Roles.create([
      {
        role: "buyer",
      },
      {
        role: "seller",
      },
    ]);

    res.json({ status: "ok", msg: "seeding successful" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "seeding error" });
  }
};

module.exports = { getRoles, seedRoles };
