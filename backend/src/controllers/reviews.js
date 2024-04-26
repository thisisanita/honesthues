const { pool } = require("../db/db");

const createReview = async (req, res) => {
  const {
    campaignId,
    userId,
    rating,
    details,
    picture,
    review_helpful,
    review_flag,
    review_recommendation,
  } = req.body;

  try {
    // Construct the INSERT query
    const insertQuery = `
         INSERT INTO reviews (campaign_id, user_id, rating, details, picture, review_helpful, review_flag, review_recommendation)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING *
       `;

    const result = await pool.query(insertQuery, [
      campaignId,
      userId,
      rating,
      details,
      picture,
      review_helpful,
      review_flag,
      review_recommendation,
    ]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create review" });
  }
};

const getReviewsByCampaignId = async (req, res) => {
  const campaignId = req.body.campaignId;

  try {
    // Construct the SELECT query
    const selectQuery = `
       SELECT * FROM reviews
       WHERE campaign_id = $1
     `;

    const result = await pool.query(selectQuery, [campaignId]);

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ error: "No reviews found for this campaign" });
    }

    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

const updateReview = async (req, res) => {
  const reviewId = req.body.id;
  const updates = req.body;

  try {
    // Construct the SET part of the UPDATE query
    const setClauses = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");
    const values = Object.values(updates);

    // Add the review ID to the values array
    values.push(reviewId);

    // Construct the full UPDATE query
    const updateQuery = `
       UPDATE reviews
       SET ${setClauses}
       WHERE id = $${values.length}
       RETURNING *
     `;

    const result = await pool.query(updateQuery, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update review" });
  }
};

const deleteReview = async (req, res) => {
  const reviewId = req.body.id;

  try {
    // Construct the DELETE query
    const deleteQuery = `
         DELETE FROM reviews
         WHERE id = $1
         RETURNING *
       `;

    const result = await pool.query(deleteQuery, [reviewId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "review not found" });
    }

    res.status(200).json({ message: "review deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete review" });
  }
};

module.exports = {
  createReview,
  getReviewsByCampaignId,
  updateReview,
  deleteReview,
};
