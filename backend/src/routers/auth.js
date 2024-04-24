const express = require("express");
const router = express.Router();

const {
  register,
  userLogin,
  brandLogin,
  refreshUserToken,
  refreshBrandToken,
} = require("../controllers/auth");

router.post("/register", register);
router.post("/login/user", userLogin);
router.post("/login/brand", brandLogin);
router.post("/refresh/brand", refreshBrandToken);
router.post("/refresh/user", refreshUserToken);
module.exports = router;
