const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { pgquery } = require("../database/db");

const registerPG = async (req, res) => {
  try {
    const { type, username, password, email } = req.body;
    // Check if email already exists
    const checkQuery = "SELECT * FROM personnel WHERE email = $1";
    const { rows } = await pgquery.query(checkQuery, [email]);
    // row must not be more than 0 to prevent duplicate email
    if (rows.length > 0) {
      return res.status(400).json({ status: "error", msg: "duplicate email" });
    }
    // Hashing
    const hash = await bcrypt.hash(password, 12);
    // Insert new user
    const insertQuery =
      "INSERT INTO personnel (type, username, hash, email) VALUES ($1, $2, $3, $4)";
    await pgquery.query(insertQuery, [type, username, hash, email]);
    res.json({ status: "ok", msg: "buyer/seller account created" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "invalid registration" });
  }
};

const loginPG = async (req, res) => {
  try {
    const { password, email } = req.body;
    // Retrieve user by email
    const checkQuery = "SELECT * FROM personnel WHERE email = $1";
    const { rows } = await pgquery.query(checkQuery, [email]);
    const authentication = rows[0];

    // Check if user exists
    if (!authentication) {
      return res
        .status(401)
        .json({ status: "error", msg: "user is not authorised" });
    }

    // Compare passwords
    const result = await bcrypt.compare(password, authentication.hash);
    if (!result) {
      console.log("email or password error");
      return res.status(401).json({ status: "error", msg: "login failed" });
    }

    // Create JWT tokens
    const claims = {
      email: authentication.email,
      type: authentication.type,
      username: authentication.username,
    };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });

    // Respond with tokens
    res.json({ access, refresh });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "login failed" });
  }
};

const refreshPG = async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);
    const claims = {
      email: decoded.email,
      type: decoded.type,
      username: decoded.username,
    };

    const refresh = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    res.json({ refresh });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "refresh error" });
  }
};

const deleteAcc = async (req, res) => {
  const userEmail = req.body.email; // using email as body
  try {
    // Check if user exists
    const checkQuery = "SELECT * FROM personnel WHERE email = $1";
    const { rows } = await pgquery.query(checkQuery, [userEmail]);
    const user = rows[0];

    if (!user) {
      return res.status(404).json({ status: "error", msg: "email not found" });
    }
    // Delete user
    const deleteQuery = "DELETE FROM personnel WHERE email = $1";
    await pgquery.query(deleteQuery, [userEmail]);
    res.json({ status: "ok", msg: "account deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "deleting of account failed" });
  }
};

const updateAcc = async (req, res) => {
  try {
    const { preferred_location, interest } = req.body;
    const updateQuery =
      "UPDATE personnel SET preferred_location=$1, interest=$2 where username=$3";
    await pgquery.query(updateQuery, [
      preferred_location,
      interest,
      // taking in the decoded from middleware
      req.decoded.username,
    ]);
    res.json({ status: "ok", msg: "account info updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "editing of account failed" });
  }
};

module.exports = { registerPG, loginPG, refreshPG, deleteAcc, updateAcc };
