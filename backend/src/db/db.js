require("dotenv").config();
const { Pool } = require("pg");
const { S3Client } = require("@aws-sdk/client-s3");

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

const s3Client = new S3Client({
  region: "process.env.BUCKET_REGION",
  credentials: {
    accessKeyId: "process.env.ACCESS_KEY",
    secretAccessKey: "process.env.SECRET_ACCESS_KEY",
  },
});

module.exports = { pool, s3Client };
