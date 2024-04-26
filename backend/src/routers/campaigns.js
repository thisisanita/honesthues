const express = require("express");
const {
  createCampaign,
  getAllCampaigns,
  updateCampaign,
  getCampaignsByEmail,
  deleteCampaign,
} = require("../controllers/campaigns");
const { brandAuth, userAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/campaigns", brandAuth, createCampaign);
router.get("/campaigns", userAuth, getAllCampaigns);
router.patch("/campaigns/:id", brandAuth, updateCampaign);
router.get("/campaigns/:email", brandAuth, getCampaignsByEmail);
router.delete("/campaigns/:id", brandAuth, deleteCampaign);

module.exports = router;
