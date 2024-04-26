const express = require("express");
const {
  getWalletByEmail,
  assignCreditsToWallet,
  editCreditsInWallet,
} = require("../controllers/wallet");
const { brandAuth, userAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/user/wallet/:email", userAuth, getWalletByEmail);
router.post("/user/wallet/:email", brandAuth, assignCreditsToWallet);
router.patch("/user/wallet/:email", brandAuth, editCreditsInWallet);

module.exports = router;
