require("dotenv").config();

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const auth = require("./src/routers/auth");
const wallet = require("./src/routers/wallet");
const campaigns = require("./src/routers/campaigns");

const helmet = require("helmet");
const pool = require("./src/db/db");
const path = require("path");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100, // only allow 100 request per Ip per 15 mins
  standardHeaders: true, // send a header that say ratelimit = something
  legacyHeaders: false, // use the new ratelimiting header and not the old
});

const app = express();

app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", auth);
app.use("/api", wallet, campaigns);

app.listen(5001);

if (process.env.NODE_ENV === "test") {
  module.exports = app;
}
