const { pool } = require("../db/db");

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
  //   const email = req.params.email;
  const {
    email,
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
  //   const email = req.params.email;
  const {
    email,
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
module.exports = {
  getUserByEmail,
  getBrandByEmail,
  updateUserProfile,
  updateBrandProfile,
};
