const express = require("express");
const {
  getWalletByEmail,
  assignCreditsToWallet,
  editCreditsInWallet,
} = require("../controllers/wallet");
const { brandAuth, userAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/user/:email/wallet", userAuth, getWalletByEmail);
router.post("/user/wallet", userAuth, assignCreditsToWallet);
router.patch("/user/wallet", userAuth, editCreditsInWallet);

module.exports = router;
