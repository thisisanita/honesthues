const { pool } = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const register = async (req, res) => {
  const {
    username,
    password,
    email,
    userType,
    name,
    contact,
    contact_person,
    website,
    address,
    gender,
    age_group,
    skin_tone,
    skin_type,
    hair_colour,
    eye_colour,
  } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  let query, values;
  if (userType === "user") {
    query = `INSERT INTO users (username, password_hash, email, name, contact, address, gender, age_group, skin_tone, skin_type, hair_colour, eye_colour) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`;
    values = [
      username,
      passwordHash,
      email,
      name,
      contact,
      address,
      gender,
      age_group,
      skin_tone,
      skin_type,
      hair_colour,
      eye_colour,
    ];
  } else if (userType === "brand") {
    query = `INSERT INTO brands (username, password_hash, email, name, contact, address, contact_person, website) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
    values = [
      username,
      passwordHash,
      email,
      name,
      contact,
      address,
      contact_person,
      website,
    ];
  } else {
    return res.status(400).send({ message: "Invalid user type" });
  }
  try {
    console.log("Executing query:", query);
    const result = await pool.query(query, values);
    const newUser = result.rows[0];
    res
      .status(201)
      .send({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error registering user", error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password, userType } = req.body; // Include userType in the request body

  try {
    let query = "";
    if (userType === "user") {
      query = "SELECT * FROM users WHERE email = $1";
    } else if (userType === "brand") {
      query = "SELECT * FROM brands WHERE email = $1";
    } else {
      return res.status(400).send({ message: "Invalid user type" });
    }

    const result = await pool.query(query, [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid password" });
    }

    const claims = {
      email: user.email,
      role: userType,
      id: user.id,
    };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "1h",
      jwtid: uuidv4(),
    });
    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });
    res
      .status(200)
      .send({ message: "User logged in successfully", access, refresh });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error logging in user", error: error.message });
  }
};

const refresh = (req, res) => {
  try {
    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);
    const claims = {
      email: decoded.email,
      role: decoded.role,
    };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });
    res.json({ access });
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "Refreshing brand token failed" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users ORDER BY id ASC");
    res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const getAllBrands = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM brands ORDER BY id ASC");
    res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const getUserByEmail = async (req, res) => {
  const email = req.body.email;
  const query = "SELECT * FROM users WHERE lower(email) = lower($1)";
  const values = [email];
  try {
    const result = await pool.query(query, values);
    // Assuming email is unique, return the first row
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    // It's better to send an error response rather than throwing an error
    return res.status(500).json({ error: "Failed to fetch user information" });
  }
};

const getBrandByEmail = async (req, res) => {
  const email = req.body.email;
  const query = "SELECT * FROM brands WHERE lower(email) = lower($1)";
  const values = [email];
  try {
    const result = await pool.query(query, values);
    // Assuming email is unique, return the first row
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    // It's better to send an error response rather than throwing an error
    return res.status(500).json({ error: "Failed to fetch user information" });
  }
};

const updateUserProfile = async (req, res) => {
  const email = req.params.email;
  const {
    username,
    user_avatar,
    name,
    contact,
    address,
    gender,
    age_group,
    skin_tone,
    skin_type,
    hair_colour,
    eye_colour,
    fun_facts,
  } = req.body;

  // Construct the SET clause for the UPDATE query
  const setClause = Object.keys(req.body)
    .map((key) => `${key} = $${Object.keys(req.body).indexOf(key) + 1}`)
    .join(", ");

  // Construct the VALUES array for the UPDATE query
  const values = Object.values(req.body);

  try {
    const query = `UPDATE users SET ${setClause} WHERE lower(email) = lower($${
      values.length + 1
    }) RETURNING *`;
    const result = await pool.query(query, [...values, email]);

    if (result.rowCount > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update user profile" });
  }
};

const updateBrandProfile = async (req, res) => {
  const email = req.params.email;
  const {
    username,
    brand_avatar,
    name,
    contact,
    address,
    contact_person,
    website,
  } = req.body;

  // Construct the SET clause for the UPDATE query
  const setClause = Object.keys(req.body)
    .map((key) => `${key} = $${Object.keys(req.body).indexOf(key) + 1}`)
    .join(", ");

  // Construct the VALUES array for the UPDATE query
  const values = Object.values(req.body);

  try {
    const query = `UPDATE brands SET ${setClause} WHERE lower(email) = lower($${
      values.length + 1
    }) RETURNING *`;
    const result = await pool.query(query, [...values, email]);

    if (result.rowCount > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update user profile" });
  }
};

const assignCreditsToWallet = async (req, res) => {
  const email = req.body.email;
  try {
    // First, find the user by email
    const userQuery = "SELECT id FROM users WHERE lower(email) = lower($1)";
    const userResult = await pool.query(userQuery, [email]);

    if (userResult.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const userId = userResult.rows[0].id;

    // Check if the user has a wallet
    const walletQuery = "SELECT * FROM wallet WHERE user_id = $1";
    const walletResult = await pool.query(walletQuery, [userId]);

    if (walletResult.rowCount === 0) {
      // If the user does not have a wallet, create one with default credits
      const createWalletQuery =
        "INSERT INTO wallet (user_id, total_amount) VALUES ($1, 50)";
      await pool.query(createWalletQuery, [userId]);
      return res
        .status(200)
        .json({ message: "Wallet created and credits assigned successfully" });
    } else {
      // If the user has a wallet, update the credits
      const updateWalletQuery =
        "UPDATE wallet SET credits = 50 WHERE user_id = $1";
      await pool.query(updateWalletQuery, [userId]);
      return res.status(200).json({ message: "Credits assigned successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to assign credits" });
  }
};
module.exports = {
  register,
  login,
  refresh,
  getAllUsers,
  getAllBrands,
  getUserByEmail,
  getBrandByEmail,
  updateUserProfile,
  updateBrandProfile,
  assignCreditsToWallet,
};
