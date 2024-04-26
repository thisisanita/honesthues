const express = require("express");
const { createRequest } = require("../controllers/requests");
const { brandAuth, userAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/request", userAuth, createRequest);

module.exports = router;
