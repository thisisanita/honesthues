const express = require("express");
const {
  createCampaign,
  getAllCampaigns,
  updateCampaign,
  getCampaignsByEmail,
  deleteCampaign,
  getCampaignById,
} = require("../controllers/campaigns");
const { brandAuth, userAuth } = require("../middleware/auth");

const router = express.Router();

router.post(
  "/campaigns",
  // upload.fields([
  //   { name: "campaign_picture" },
  //   { name: "product_picture" },
  //   { name: "product_shades_picture" },
  // ]),
  brandAuth,
  createCampaign
);
router.get("/campaigns", userAuth, getAllCampaigns);
router.patch("/campaigns", brandAuth, updateCampaign);
router.get("/campaigns/:brandEmail", brandAuth, getCampaignsByEmail);
router.get("/campaigns/:campaignId", userAuth, getCampaignById);
router.delete("/campaigns/:campaignId/delete", brandAuth, deleteCampaign);

module.exports = router;
