const express = require("express");
const router = express.Router();

const {
  register,
  userLogin,
  brandLogin,
  refresh,
  // refreshUserToken,
  // refreshBrandToken,
  getAllUsers,
  getUserByEmail,
  getBrandByEmail,
  updateUserProfile,
  updateBrandProfile,
} = require("../controllers/auth");

router.post("/register", register);
router.post("/login/user", userLogin);
router.post("/login/brand", brandLogin);
router.post("/refresh", refresh);
router.get("/users", getAllUsers);
router.get("/user/profile", getUserByEmail);
router.get("/brand/profile", getBrandByEmail);
router.patch("/user/profile/:email", updateUserProfile);
router.patch("/brand/profile/:email", updateBrandProfile);

// router.post("/refresh/user", refreshUserToken);
module.exports = router;
