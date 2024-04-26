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
router.get("/campaigns/requests", brandAuth, getRequestsByCampaign);
router.get("/user/requests", userAuth, getRequestsByUser);
router.delete("/requests/delete", userAuth, deleteRequest);

module.exports = router;
