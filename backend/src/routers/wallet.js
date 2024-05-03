const express = require("express");
const {
  getWalletByEmail,
  editCreditsInWallet,
} = require("../controllers/wallet");
const { brandAuth, userAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/user/:email/wallet", userAuth, getWalletByEmail);
router.patch("/user/wallet", userAuth, editCreditsInWallet);

module.exports = router;
