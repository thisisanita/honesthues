const { pool } = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const register = async (req, res) => {
  const {
    username,
    password,
    email,
    userType,
    name,
    contact,
    contact_person,
    website,
    address,
  } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  let query, values;
  if (userType === "user") {
    query = `INSERT INTO users (username, password_hash, email, name, contact, address) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    values = [username, passwordHash, email, name, contact, address];
  } else if (userType === "brand") {
    query = `INSERT INTO brands (username, password_hash, email, name, contact, address, contact_person, website) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
    values = [
      username,
      passwordHash,
      email,
      name,
      contact,
      address,
      contact_person,
      website,
    ];
  } else {
    return res.status(400).send({ message: "Invalid user type" });
  }
  try {
    console.log("Executing query:", query);
    const result = await pool.query(query, values);
    const newUser = result.rows[0];
    res
      .status(201)
      .send({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error registering user", error: error.message });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email =$1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid password" });
    }

    // const sessionId = uuidv4();
    const userType = req.path.includes("/login/user") ? "user" : "brand";

    const claims = {
      email: user.email,
      role: userType, // Use the determined userType as the role
      //   sessionId: sessionId,
    };

    const token = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "1h",
      jwtid: uuidv4(),
    });
    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });
    res
      .status(200)
      .send({ message: "User logged in successfully", token, refresh });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error logging in user", error: error.message });
  }
};

const brandLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM brands WHERE email =$1", [
      email,
    ]);
    const brand = result.rows[0];

    if (!brand) {
      return res.status(400).send({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, brand.password_hash);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid password" });
    }

    // const sessionId = uuidv4();
    const userType = req.path.includes("/login/brand") ? "brand" : "user";

    const claims = {
      email: brand.email,
      role: userType, // Use the determined userType as the role
      //   sessionId: sessionId,
    };

    const token = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "1h",
      jwtid: uuidv4(),
    });

    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });
    res
      .status(200)
      .send({ message: "User logged in successfully", token, refresh });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error logging in user", error: error.message });
  }
};

const refreshUserToken = (req, res) => {
  try {
    // Extract the JWT from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const refreshToken = authHeader.split(" ")[1];

    // Verify the JWT
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

    // Determine the user type based on the endpoint
    const userType = req.path.includes("/refresh/user") ? "user" : "brand";

    const claims = {
      email: decoded.email,
      role: userType, // Use the determined userType as the role
    };

    // Generate a new access token
    const token = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    // Send the new access token in the response
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "Refreshing user token failed" });
  }
};

// const refreshUserToken = (req, res) => {
//   try {
//     const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);
//     const claims = {
//       email: decoded.email,
//       role: decoded.role,
//     };

//     const token = jwt.sign(claims, process.env.ACCESS_SECRET, {
//       expiresIn: "20m",
//       jwtid: uuidv4(),
//     });
//     res.json({ token });
//   } catch (error) {
//     console.error(error.message);
//     res
//       .status(400)
//       .json({ status: "error", msg: "refreshing user token failed" });
//   }
// };

const refreshBrandToken = (req, res) => {
  try {
    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);
    const claims = {
      email: decoded.email,
      role: decoded.role,
    };

    const token = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "Refreshing brand token failed" });
  }
};

module.exports = {
  register,
  userLogin,
  brandLogin,
  refreshUserToken,
  refreshBrandToken,
};
