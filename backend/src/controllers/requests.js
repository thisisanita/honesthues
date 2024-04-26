const { pool } = require("../db/db");

const createRequest = async (req, res) => {
  const { userId, date_time, received } = req.body;

  try {
    // Construct the INSERT query
    const insertQuery = `
         INSERT INTO requests (user_id, date_time, received)
         VALUES ($1, $2, $3)
         RETURNING *
       `;

    const result = await pool.query(insertQuery, [userId, date_time, received]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create request" });
  }
};

module.exports = { createRequest };
