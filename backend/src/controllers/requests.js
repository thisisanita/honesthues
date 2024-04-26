const { pool } = require("../db/db");

const createRequest = async (req, res) => {
  const { userId, received, campaignId } = req.body;

  try {
    // Construct the INSERT query
    const insertQuery = `
         INSERT INTO requests (user_id, received, campaign_id)
         VALUES ($1, $2, $3)
         RETURNING *
       `;

    const result = await pool.query(insertQuery, [
      userId,
      received,
      campaignId,
    ]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create request" });
  }
};

const getRequestsByCampaign = async (req, res) => {
  const campaignId = req.params.campaignId;

  try {
    // Construct the SELECT query
    const selectQuery = `
         SELECT * FROM requests
         WHERE campaign_id = $1
       `;

    const result = await pool.query(selectQuery, [campaignId]);

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ error: "No requests found for this campaign" });
    }

    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch requests" });
  }
};

const getRequestsByUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Construct the SELECT query
    const selectQuery = `
           SELECT * FROM requests
           WHERE user_id = $1
         `;

    const result = await pool.query(selectQuery, [userId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "No requests found for this user" });
    }

    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch requests" });
  }
};

const deleteRequest = async (req, res) => {
  const requestId = req.params.id;

  try {
    // Construct the DELETE query
    const deleteQuery = `
           DELETE FROM requests
           WHERE id = $1
           RETURNING *
         `;

    const result = await pool.query(deleteQuery, [requestId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "request not found" });
    }

    res.status(200).json({ message: "request deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete review" });
  }
};

module.exports = {
  createRequest,
  getRequestsByCampaign,
  getRequestsByUser,
  deleteRequest,
};
