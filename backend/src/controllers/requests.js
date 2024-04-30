const { pool } = require("../db/db");

// const createRequest = async (req, res) => {
//   const { userId, received, campaignId } = req.body;

//   try {
//     // Construct the INSERT query
//     const insertQuery = `
//          INSERT INTO requests (user_id, received, campaign_id)
//          VALUES ($1, $2, $3)
//          RETURNING *
//        `;

//     const result = await pool.query(insertQuery, [
//       userId,
//       received,
//       campaignId,
//     ]);

//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to create request" });
//   }
// };

// const createRequest = async (req, res) => {
//   const { userId, received, campaignId } = req.body;

//   try {
//     // First, check if the campaign exists
//     const checkCampaignQuery = `
//          SELECT * FROM campaigns
//          WHERE id = $1
//        `;
//     const campaign = await pool.query(checkCampaignQuery, [campaignId]);

//     if (campaign.rowCount === 0) {
//       return res.status(400).json({ error: "Campaign not found" });
//     }

//     // Construct the INSERT query
//     const insertQuery = `
//          INSERT INTO requests (user_id, received, campaign_id)
//          VALUES ($1, $2, $3)
//          RETURNING *
//        `;

//     const result = await pool.query(insertQuery, [
//       userId,
//       received,
//       campaignId,
//     ]);

//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to create request" });
//   }
// };

const createRequest = async (req, res) => {
  const { userId, received, campaignId, productShade, submitted } = req.body;

  try {
    // First, check if the campaign exists
    const checkCampaignQuery = `
          SELECT * FROM campaigns
          WHERE id = $1
        `;
    const campaign = await pool.query(checkCampaignQuery, [campaignId]);

    if (campaign.rowCount === 0) {
      return res.status(400).json({ error: "Campaign not found" });
    }

    // Extract campaign_credit and product_name from the campaign object
    const { campaign_credit, product_name } = campaign.rows[0];

    // Construct the INSERT query
    const insertQuery = `
          INSERT INTO requests (user_id, received, campaign_id, product_shade, submitted)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING *
        `;

    const result = await pool.query(insertQuery, [
      userId,
      received,
      campaignId,
      productShade,
      submitted,
    ]);

    // Include campaign_credit and product_name in the response
    const response = {
      ...result.rows[0],
      campaign_credit,
      product_name,
    };

    res.status(201).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create request" });
  }
};

const getRequestsByCampaign = async (req, res) => {
  const campaignId = req.params.campaignId;

  try {
    // Construct the SELECT query using COUNT() to get the total number of requests
    const selectQuery = `
       SELECT COUNT(*) as totalRequests
       FROM requests
       WHERE campaign_id = $1
     `;

    const result = await pool.query(selectQuery, [campaignId]);

    console.log("Result:", result.rows); // Add this line for logging

    if (result.rows.length === 0 || result.rows[0].totalRequests === null) {
      return res
        .status(404)
        .json({ error: "No requests found for this campaign" });
    }

    // Extract the totalRequests from the first row of the result
    const totalRequests = result.rows[0].totalrequests;

    console.log("Total Requests:", totalRequests); // Add this line for logging

    if (typeof totalRequests === "undefined") {
      return res.status(500).json({ error: "Failed to fetch total requests" });
    }

    res.status(200).json({ totalRequests: totalRequests }); // Stringify totalRequests
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to fetch requests", details: err.message });
  }
};

// const getRequestsByCampaign = async (req, res) => {
//   const campaignId = req.params.campaignId;

//   try {
//     // Construct the SELECT query
//     const selectQuery = `
//          SELECT * FROM requests
//          WHERE campaign_id = $1
//        `;

//     const result = await pool.query(selectQuery, [campaignId]);

//     if (result.rowCount === 0) {
//       return res
//         .status(404)
//         .json({ error: "No requests found for this campaign" });
//     }

//     res.status(200).json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to fetch requests" });
//   }
// };

//

const getRequestsByUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Construct the SELECT query with a JOIN to include capaogm_credit and product_name from the campaigns table
    const selectQuery = `
             SELECT requests.*, campaigns.campaign_credit, campaigns.product_name
             FROM requests
             JOIN campaigns ON requests.campaign_id = campaigns.id
             WHERE requests.user_id = $1 AND requests.submitted IS DISTINCT FROM TRUE
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
  const requestId = req.params.requestId;

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

const updateRequest = async (req, res) => {
  const requestId = req.params.requestId; // Assuming the request ID is passed as a URL parameter
  const { received, productShade, submitted } = req.body; // Fields to be updated

  try {
    // Construct the UPDATE query
    const updateQuery = `
           UPDATE requests
           SET received = COALESCE($1, received),
               product_shade = COALESCE($2, product_shade),
               submitted = COALESCE($3, submitted)
           WHERE id = $4
           RETURNING *
         `;

    const result = await pool.query(updateQuery, [
      received,
      productShade,
      submitted,
      requestId,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Request not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update request" });
  }
};

module.exports = {
  createRequest,
  getRequestsByCampaign,
  getRequestsByUser,
  deleteRequest,
  updateRequest,
};
