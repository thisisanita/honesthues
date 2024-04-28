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

router.post("/campaigns", brandAuth, createCampaign);
router.get("/campaigns", userAuth, getAllCampaigns);
router.patch("/campaigns", brandAuth, updateCampaign);
router.get("/brand/campaigns", brandAuth, getCampaignsByEmail);
router.get("/campaigns/:campaignId", userAuth, getCampaignById);

router.delete("/campaigns", brandAuth, deleteCampaign);

module.exports = router;
