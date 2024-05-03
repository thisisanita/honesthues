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
    title,
  } = req.body;

  try {
    // Construct the INSERT query
    const insertQuery = `
         INSERT INTO reviews (campaign_id, user_id, rating, details, picture, review_helpful, review_flag, review_recommendation, title)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
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
      title,
    ]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create review" });
  }
};

const getReviewsByCampaignId = async (req, res) => {
  const campaignId = req.params.campaignId;

  try {
    // Construct the SELECT query to join reviews with users
    const selectQuery = `
      SELECT reviews.*, users.name, users.age_group, users.skin_tone, users.skin_type, users.hair_colour, users.eye_colour
      FROM reviews
      JOIN users ON reviews.user_id = users.id
      WHERE reviews.campaign_id = $1
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
    res.status(500).json({ error: "Failed to fetch reviews and user details" });
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

const getReviewStats = async (req, res) => {
  const campaignId = req.params.campaignId;

  try {
    // Construct the queries
    const totalReviewsQuery = `
      SELECT COUNT(*) AS total_reviews
      FROM reviews
      WHERE campaign_id = $1
    `;
    const averageRatingQuery = `
      SELECT AVG(rating) AS average_rating
      FROM reviews
      WHERE campaign_id = $1
    `;
    const percentageRecommendedQuery = `
    SELECT 
    CASE 
      WHEN COUNT(*) = 0 THEN 0
      ELSE COUNT(*) FILTER (WHERE review_recommendation = TRUE) / COUNT(*) * 100
    END AS percentage_recommended
  FROM reviews
  WHERE campaign_id = $1
    `;

    // Execute the queries
    const totalReviewsResult = await pool.query(totalReviewsQuery, [
      campaignId,
    ]);
    const averageRatingResult = await pool.query(averageRatingQuery, [
      campaignId,
    ]);
    const percentageRecommendedResult = await pool.query(
      percentageRecommendedQuery,
      [campaignId]
    );

    // Construct the response
    const response = {
      totalReviews: totalReviewsResult.rows[0].total_reviews,
      averageRating: averageRatingResult.rows[0].average_rating,
      percentageRecommended:
        percentageRecommendedResult.rows[0].percentage_recommended,
    };

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch review stats" });
  }
};

const getProductandReviewStats = async (req, res) => {
  const campaignId = req.params.campaignId; // Use query parameters instead of path parameters for flexibility

  try {
    let result;
    if (campaignId) {
      // Fetch review statistics for a specific campaign
      const totalReviewsQuery = `
        SELECT COUNT(*) AS total_reviews
        FROM reviews
        WHERE campaign_id = $1
      `;
      const averageRatingQuery = `
        SELECT AVG(CAST(rating AS INTEGER)) AS average_rating
        FROM reviews
        WHERE campaign_id = $1
      `;
      const percentageRecommendedQuery = `
        SELECT COUNT(*) FILTER (WHERE review_recommendation = TRUE) / COUNT(*) * 100 AS percentage_recommended
        FROM reviews
        WHERE campaign_id = $1
      `;

      const totalReviewsResult = await pool.query(totalReviewsQuery, [
        campaignId,
      ]);
      const averageRatingResult = await pool.query(averageRatingQuery, [
        campaignId,
      ]);
      const percentageRecommendedResult = await pool.query(
        percentageRecommendedQuery,
        [campaignId]
      );

      // Combine the results into a single object
      const reviewStats = {
        totalReviews: totalReviewsResult.rows[0].total_reviews,
        averageRating: averageRatingResult.rows[0].average_rating,
        percentageRecommended:
          percentageRecommendedResult.rows[0].percentage_recommended,
      };

      result = { reviewStats };
    } else {
      // Fetch all campaigns
      result = await pool.query(`
        SELECT campaigns.*, brands.name
        FROM campaigns
        INNER JOIN brands ON campaigns.brand_id = brands.id
        ORDER BY campaigns.id ASC
      `);
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to be handled by the Express middleware
  }
};

module.exports = {
  createReview,
  getReviewsByCampaignId,
  updateReview,
  deleteReview,
  getReviewStats,
  getProductandReviewStats,
};
