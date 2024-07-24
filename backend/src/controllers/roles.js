const Roles = require("../models/Roles");
const { pgquery } = require("../database/db");

// const getRoles = async (req, res) => {
//   try {
//     const roles = await Roles.find();
//     res.json(roles.map((item) => item.role));
//   } catch (error) {
//     console.error(error.message);
//     res.json({ status: "error", msg: "cannot get roles" });
//   }
// };

const getTypes = async (req, res) => {
  try {
    const getAllQuery = "SELECT * FROM types";
    const result = await pgquery.query(getAllQuery);
    const data = result.rows;
    res.json({ data });
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "cannot get types" });
  }
};

const seedTypes = async (req, res) => {
  try {
  } catch (error) {}
};

// const seedRoles = async (req, res) => {
//   try {
//     await Roles.deleteMany({});

//     await Roles.create([
//       {
//         role: "buyer",
//       },
//       {
//         role: "seller",
//       },
//     ]);

//     res.json({ status: "ok", msg: "seeding successful" });
//   } catch (error) {
//     console.log(error.message);
//     res.status(400).json({ status: "error", msg: "seeding error" });
//   }
// };

// module.exports = { getRoles, seedRoles };
module.exports = { getTypes };
