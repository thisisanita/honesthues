const express = require("express");
const {
  createRequest,
  getRequestsByCampaign,
  getRequestsByUser,
  deleteRequest,
} = require("../controllers/requests");
const { brandAuth, userAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/requests", userAuth, createRequest);
router.get("/requests/campaigns/:campaignId", brandAuth, getRequestsByCampaign);
router.get("/requests/users/:userId", userAuth, getRequestsByUser);
router.delete("/requests/:id", userAuth, deleteRequest);

module.exports = router;
