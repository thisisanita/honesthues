const express = require("express");
const {
  createReview,
  getReviewsByCampaignId,
  updateReview,
  deleteReview,
  getReviewStats,
} = require("../controllers/reviews");
const { brandAuth, userAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/reviews/create", userAuth, createReview);
router.get("/reviews/:campaignId", userAuth, getReviewsByCampaignId);
router.patch("/reviews/edit", userAuth, updateReview);
router.delete("/reviews/delete", userAuth, deleteReview);
router.get("/reviews/stats/:campaignId", userAuth, getReviewStats);

module.exports = router;
