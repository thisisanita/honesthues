const { pool } = require("../db/db");

const createCampaign = async (req, res) => {
  const {
    email,
    campaign_picture,
    campaign_description,
    campaign_credit,
    campaign_name,
    product_name,
    product_picture,
    product_description,
    product_likes,
    product_shades,
    product_shades_picture,
    product_ingredients,
    product_instructions,
  } = req.body;

  try {
    // First, find the brand by email
    const brandQuery = "SELECT id FROM brands WHERE lower(email) = lower($1)";
    const brandResult = await pool.query(brandQuery, [email]);

    if (brandResult.rowCount === 0) {
      return res.status(404).json({ error: "Brand not found" });
    }

    const brandId = brandResult.rows[0].id;

    // Then, insert the new campaign with the brand_id
    const campaignQuery = `
         INSERT INTO campaigns (campaign_picture, campaign_description, campaign_credit, campaign_name, product_name, product_picture, product_description, product_likes, product_shades, product_shades_picture, product_ingredients, product_instructions, brand_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
         RETURNING *
       `;
    const campaignResult = await pool.query(campaignQuery, [
      campaign_picture,
      campaign_description,
      campaign_credit,
      campaign_name,
      product_name,
      product_picture,
      product_description,
      product_likes,
      product_shades,
      product_shades_picture,
      product_ingredients,
      product_instructions,
      brandId,
    ]);

    res.status(201).json(campaignResult.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create campaign" });
  }
};

const getAllCampaigns = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM campaigns ORDER BY id ASC");
    res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const updateCampaign = async (req, res) => {
  const campaignId = req.params.id;
  const updates = req.body;

  try {
    // Construct the SET part of the UPDATE query
    const setClauses = Object.keys(updates)
      .map((key) => `${key} = $${key}`)
      .join(", ");
    const values = Object.values(updates);

    // Add the campaign ID to the values array
    values.push(campaignId);

    // Construct the full UPDATE query
    const updateQuery = `
         UPDATE campaigns
         SET ${setClauses}
         WHERE id = $${Object.keys(updates).length + 1}
         RETURNING *
       `;

    const result = await pool.query(updateQuery, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Campaign not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update campaign" });
  }
};

module.exports = { createCampaign, getAllCampaigns, updateCampaign };
