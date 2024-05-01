const express = require("express");
const router = express.Router();

const {
  getUserByEmail,
  getBrandByEmail,
  updateUserProfile,
  updateBrandProfile,
} = require("../controllers/profile");

const { brandAuth, userAuth } = require("../middleware/auth");

router.get("/profile/user/:email", userAuth, getUserByEmail);
router.get("/profile/brand", brandAuth, getBrandByEmail);
router.patch("/profile/user/edit", userAuth, updateUserProfile);
router.patch("/profile/brand/edit", brandAuth, updateBrandProfile);

// router.post("/refresh/user", refreshUserToken);
module.exports = router;
