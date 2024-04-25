const express = require("express");
const router = express.Router();

const {
  register,
  userLogin,
  brandLogin,
  refresh,
  // refreshUserToken,
  // refreshBrandToken,
} = require("../controllers/auth");

router.post("/register", register);
router.post("/login/user", userLogin);
router.post("/login/brand", brandLogin);
router.post("/refresh", refresh);
// router.post("/refresh/user", refreshUserToken);
module.exports = router;
