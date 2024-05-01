const express = require("express");
const router = express.Router();

const {
  register,
  login,
  // userLogin,
  // brandLogin,
  refresh,
  // refreshUserToken,
  // refreshBrandToken,
  getAllUsers,
  getUserByEmail,
  getBrandByEmail,
  updateUserProfile,
  updateBrandProfile,
  getAllBrands,
  assignCreditsToWallet,
} = require("../controllers/auth");

const {
  validateRegistrationData,
  validateLoginData,
  validateRefreshToken,
} = require("../validators/auth");

const { errorCheck } = require("../validators/errorCheck");

router.post("/register", validateRegistrationData, errorCheck, register);
// router.post("/login/user", validateLoginData, errorCheck, userLogin);
// router.post("/login/brand", validateLoginData, errorCheck, brandLogin);
router.post("/login", validateLoginData, errorCheck, login);
router.post("/refresh", validateRefreshToken, errorCheck, refresh);
router.get("/users", getAllUsers);
router.get("/brands", getAllBrands);
router.get("/user/profile", getUserByEmail);
router.get("/brand/profile", getBrandByEmail);
router.patch("/user/profile/:email", updateUserProfile);
router.patch("/brand/profile/:email", updateBrandProfile);
router.post("/user/wallet", assignCreditsToWallet);

// router.post("/refresh/user", refreshUserToken);
module.exports = router;
