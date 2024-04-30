const { pool } = require("../db/db");
// const upload = require("../middleware/multerS3");

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
    campaign_requests,
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
         INSERT INTO campaigns (campaign_picture, campaign_description, campaign_credit, campaign_name, product_name, product_picture, product_description, product_likes, product_shades, product_shades_picture, product_ingredients, product_instructions, campaign_requests, brand_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
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
      campaign_requests,
      brandId,
    ]);

    res.status(201).json(campaignResult.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create campaign" });
  }
};

// const createCampaign = upload.fields([
//   { name: "campaign_picture" },
//   { name: "product_picture" },
//   { name: "product_shades_picture" },
// ])(async (req, res) => {
//   const {
//     email,
//     campaign_description,
//     campaign_credit,
//     campaign_name,
//     product_name,
//     product_description,
//     product_likes,
//     product_shades,
//     product_ingredients,
//     product_instructions,
//     campaign_requests,
//   } = req.body;

//   try {
//     // Extract the file URLs from the uploaded files
//     const campaignPictureUrl = req.files["campaign_picture"][0].location;
//     const productPictureUrl = req.files["product_picture"][0].location;
//     const productShadesPictureUrl =
//       req.files["product_shades_picture"][0].location;

//     // Your existing logic to find the brand by email and insert the new campaign
//     const brandQuery = "SELECT id FROM brands WHERE lower(email) = lower($1)";
//     const brandResult = await pool.query(brandQuery, [email]);

//     if (brandResult.rowCount === 0) {
//       return res.status(404).json({ error: "Brand not found" });
//     }

//     const brandId = brandResult.rows[0].id;
//     // Use the extracted file URLs when inserting the campaign into the database

//     // Example of using the file URLs in your database query
//     const campaignQuery = `
//        INSERT INTO campaigns (campaign_picture, campaign_description, campaign_credit, campaign_name, product_name, product_picture, product_description, product_likes, product_shades, product_shades_picture, product_ingredients, product_instructions, campaign_requests, brand_id)
//        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
//        RETURNING *
//      `;
//     const campaignResult = await pool.query(campaignQuery, [
//       campaignPictureUrl,
//       campaign_description,
//       campaign_credit,
//       campaign_name,
//       product_name,
//       productPictureUrl,
//       product_description,
//       product_likes,
//       product_shades,
//       productShadesPictureUrl,
//       product_ingredients,
//       product_instructions,
//       campaign_requests,
//       brandId,
//     ]);

//     res.status(201).json(campaignResult.rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to create campaign" });
//   }
// });

const getAllCampaigns = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT campaigns.*, brands.name
      FROM campaigns
      INNER JOIN brands ON campaigns.brand_id = brands.id
      ORDER BY campaigns.id ASC
    `);
    res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const updateCampaign = async (req, res) => {
  const campaignId = req.body.id;
  const updates = req.body;

  try {
    // Construct the SET part of the UPDATE query
    const setClauses = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 1}`)
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

const getCampaignsByEmail = async (req, res) => {
  const brandEmail = req.params.brandEmail;

  try {
    // First, find the brand by email
    const brandQuery = "SELECT id FROM brands WHERE lower(email) = lower($1)";
    const brandResult = await pool.query(brandQuery, [brandEmail]);

    if (brandResult.rowCount === 0) {
      return res.status(404).json({ error: "Brand not found" });
    }

    const brandId = brandResult.rows[0].id;

    // Then, fetch the campaigns for this brand
    const campaignQuery = `
         SELECT campaigns.*
         FROM campaigns
         INNER JOIN brands ON campaigns.brand_id = brands.id
         WHERE brands.id = $1
       `;
    const campaignResult = await pool.query(campaignQuery, [brandId]);

    if (campaignResult.rowCount === 0) {
      return res
        .status(404)
        .json({ error: "No campaigns found for this brand" });
    }

    res.status(200).json(campaignResult.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch campaigns" });
  }
};

const getCampaignById = async (req, res) => {
  const campaignId = req.params.campaignId;

  try {
    const result = await pool.query("SELECT * FROM campaigns WHERE id = $1", [
      campaignId,
    ]);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: "Campaign not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteCampaign = async (req, res) => {
  const campaignId = req.params.campaignId;

  try {
    // First, check for any dependent requests
    const checkDependentRequestsQuery = `
       SELECT * FROM requests
       WHERE campaign_id = $1
     `;
    const dependentRequests = await pool.query(checkDependentRequestsQuery, [
      campaignId,
    ]);

    if (dependentRequests.rowCount > 0) {
      // Handle dependent requests here
      // For example, delete them or update them to reference a different campaign
      // This is just an example; adjust according to your application's logic
      const deleteDependentRequestsQuery = `
         DELETE FROM requests
         WHERE campaign_id = $1
       `;
      await pool.query(deleteDependentRequestsQuery, [campaignId]);
    }

    // Now, proceed with deleting the campaign
    const deleteQuery = `
       DELETE FROM campaigns
       WHERE id = $1
       RETURNING *
     `;
    const result = await pool.query(deleteQuery, [campaignId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Campaign not found" });
    }

    res.status(200).json({ message: "Campaign deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete campaign" });
  }
};

module.exports = {
  createCampaign,
  getAllCampaigns,
  updateCampaign,
  getCampaignsByEmail,
  deleteCampaign,
  getCampaignById,
};
