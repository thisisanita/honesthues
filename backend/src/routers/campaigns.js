const express = require("express");
const { createCampaign, getAllCampaigns } = require("../controllers/campaigns");
const { brandAuth, userAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/campaigns", brandAuth, createCampaign);
router.get("/campaigns", userAuth, getAllCampaigns);

module.exports = router;
