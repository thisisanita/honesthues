const { pool } = require("../db/db");

const assignCreditsToWallet = async (req, res) => {
  const email = req.params.email;
  try {
    // First, find the user by email
    const userQuery = "SELECT id FROM users WHERE lower(email) = lower($1)";
    const userResult = await pool.query(userQuery, [email]);

    if (userResult.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const userId = userResult.rows[0].id;

    // Check if the user has a wallet
    const walletQuery = "SELECT * FROM wallet WHERE user_id = $1";
    const walletResult = await pool.query(walletQuery, [userId]);

    if (walletResult.rowCount === 0) {
      // If the user does not have a wallet, create one with default credits
      const createWalletQuery =
        "INSERT INTO wallet (user_id, total_amount) VALUES ($1, 50)";
      await pool.query(createWalletQuery, [userId]);
      return res
        .status(200)
        .json({ message: "Wallet created and credits assigned successfully" });
    } else {
      // If the user has a wallet, update the credits
      const updateWalletQuery =
        "UPDATE wallet SET credits = 50 WHERE user_id = $1";
      await pool.query(updateWalletQuery, [userId]);
      return res.status(200).json({ message: "Credits assigned successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to assign credits" });
  }
};

const getWalletByEmail = async (req, res) => {
  const email = req.params.email;

  try {
    // First, find the user by email
    const userQuery = "SELECT id FROM users WHERE lower(email) = lower($1)";
    const userResult = await pool.query(userQuery, [email]);

    if (userResult.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Then, fetch the wallet information using the user's ID
    const userId = userResult.rows[0].id;
    const walletQuery = "SELECT * FROM wallet WHERE user_id = $1";
    const walletResult = await pool.query(walletQuery, [userId]);

    if (walletResult.rowCount === 0) {
      return res.status(404).json({ error: "Wallet not found for this user" });
    }

    res.status(200).json(walletResult.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch wallet information" });
  }
};

const editCreditsInWallet = async (req, res) => {
  const email = req.params.email;
  const operation = req.body.operation; // "add" or "subtract"
  const amount = parseInt(req.body.amount, 10); // The amount to add or subtract

  try {
    // First, find the user by email
    const userQuery = "SELECT id FROM users WHERE lower(email) = lower($1)";
    const userResult = await pool.query(userQuery, [email]);

    if (userResult.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const userId = userResult.rows[0].id;

    // Check if the user has a wallet
    const walletQuery = "SELECT * FROM wallet WHERE user_id = $1";
    const walletResult = await pool.query(walletQuery, [userId]);

    if (walletResult.rowCount === 0) {
      // If the user does not have a wallet, create one with the initial amount
      const createWalletQuery =
        "INSERT INTO wallet (user_id, total_amount) VALUES ($1, $2)";
      await pool.query(createWalletQuery, [userId, amount]);
      return res
        .status(200)
        .json({ message: "Wallet created with initial credits successfully" });
    } else {
      // If the user has a wallet, update the credits based on the operation
      let newCreditAmount = walletResult.rows[0].total_amount;
      if (operation === "add") {
        newCreditAmount += amount;
      } else if (operation === "subtract") {
        newCreditAmount -= amount;
      } else {
        return res.status(400).json({ error: "Invalid operation" });
      }

      const updateWalletQuery =
        "UPDATE wallet SET total_amount = $1 WHERE user_id = $2";
      await pool.query(updateWalletQuery, [newCreditAmount, userId]);
      return res.status(200).json({ message: "Credits updated successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to edit credits" });
  }
};

module.exports = {
  assignCreditsToWallet,
  getWalletByEmail,
  editCreditsInWallet,
};
