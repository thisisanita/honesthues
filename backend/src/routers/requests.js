const express = require("express");
const {
  createRequest,
  getRequestsByCampaign,
  getRequestsByUser,
  deleteRequest,
  updateRequest,
} = require("../controllers/requests");
const { brandAuth, userAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/requests", userAuth, createRequest);
router.get("/campaigns/:campaignId/requests", userAuth, getRequestsByCampaign);
router.get("/user/:userId/requests", userAuth, getRequestsByUser);
router.delete("/requests/:requestId/delete", userAuth, deleteRequest);
router.patch("/requests/:requestId/edit", userAuth, updateRequest);

module.exports = router;
