const express = require("express");
const {
  getWalletByEmail,
  assignCreditsToWallet,
  editCreditsInWallet,
} = require("../controllers/wallet");
const { brandAuth, userAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/user/wallet", userAuth, getWalletByEmail);
router.post("/user/wallet", brandAuth, assignCreditsToWallet);
router.patch("/user/wallet", brandAuth, editCreditsInWallet);

module.exports = router;
