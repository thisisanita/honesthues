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

const login = async (req, res) => {
  const { email, password, userType } = req.body; // Include userType in the request body

  try {
    let query = "";
    if (userType === "user") {
      query = "SELECT * FROM users WHERE email = $1";
    } else if (userType === "brand") {
      query = "SELECT * FROM brands WHERE email = $1";
    } else {
      return res.status(400).send({ message: "Invalid user type" });
    }

    const result = await pool.query(query, [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid password" });
    }

    const claims = {
      email: user.email,
      role: userType,
      id: user.id, // Use the userType from the request body as the role
    };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "1h",
      jwtid: uuidv4(),
    });
    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });
    res
      .status(200)
      .send({ message: "User logged in successfully", access, refresh });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error logging in user", error: error.message });
  }
};

// const userLogin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const result = await pool.query("SELECT * FROM users WHERE email =$1", [
//       email,
//     ]);
//     const user = result.rows[0];

//     if (!user) {
//       return res.status(400).send({ message: "User not found" });
//     }
//     const isMatch = await bcrypt.compare(password, user.password_hash);
//     if (!isMatch) {
//       return res.status(400).send({ message: "Invalid password" });
//     }

//     // const sessionId = uuidv4();
//     const userType = req.path.includes("/login/user") ? "user" : "brand";

//     const claims = {
//       email: user.email,
//       role: userType, // Use the determined userType as the role
//       //   sessionId: sessionId,
//     };

//     const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
//       expiresIn: "1h",
//       jwtid: uuidv4(),
//     });
//     const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
//       expiresIn: "30d",
//       jwtid: uuidv4(),
//     });
//     res
//       .status(200)
//       .send({ message: "User logged in successfully", access, refresh });
//   } catch (error) {
//     res
//       .status(500)
//       .send({ message: "Error logging in user", error: error.message });
//   }
// };

// const brandLogin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const result = await pool.query("SELECT * FROM brands WHERE email =$1", [
//       email,
//     ]);
//     const brand = result.rows[0];

//     if (!brand) {
//       return res.status(400).send({ message: "User not found" });
//     }
//     const isMatch = await bcrypt.compare(password, brand.password_hash);
//     if (!isMatch) {
//       return res.status(400).send({ message: "Invalid password" });
//     }

//     // const sessionId = uuidv4();
//     const userType = req.path.includes("/login/brand") ? "brand" : "user";

//     const claims = {
//       email: brand.email,
//       role: userType, // Use the determined userType as the role
//       //   sessionId: sessionId,
//     };

//     const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
//       expiresIn: "1h",
//       jwtid: uuidv4(),
//     });

//     const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
//       expiresIn: "30d",
//       jwtid: uuidv4(),
//     });
//     res
//       .status(200)
//       .send({ message: "User logged in successfully", access, refresh });
//   } catch (error) {
//     res
//       .status(500)
//       .send({ message: "Error logging in user", error: error.message });
//   }
// };

// const refreshUserToken = (req, res) => {
//   try {
//     // Extract the JWT from the Authorization header
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     // Verify the JWT
//     const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);

//     // Determine the user type based on the endpoint
//     const userType = req.path.includes("/refresh/user") ? "user" : "brand";

//     const claims = {
//       email: decoded.email,
//       role: userType, // Use the determined userType as the role
//     };

//     // Generate a new access token
//     const token = jwt.sign(claims, process.env.ACCESS_SECRET, {
//       expiresIn: "20m",
//       jwtid: uuidv4(),
//     });

//     // Send the new access token in the response
//     console.log("token", token);
//     res.json({ token });
//   } catch (error) {
//     console.error(error.message);
//     res
//       .status(400)
//       .json({ status: "error", msg: "Refreshing user token failed" });
//   }
// };

// const refreshUserToken = (req, res) => {
//   try {
//     const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);

//     const claims = {
//       email: decoded.email,
//       role: decoded.userType,
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

// const refreshUserToken = (req, res) => {
//   try {
//     // Determine the userType based on the request path
//     const userType = req.path.includes("/refresh/user") ? "user" : "brand";

//     // Verify the refresh token
//     const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);

//     // Construct the claims object with the determined userType
//     const claims = {
//       email: decoded.email,
//       role: userType, // Use the determined userType here
//     };

//     // Sign the new token with the claims
//     const token = jwt.sign(claims, process.env.ACCESS_SECRET, {
//       expiresIn: "20m",
//       jwtid: uuidv4(),
//     });

//     // Send the new token in the response
//     res.json({ token });
//   } catch (error) {
//     console.error(error.message);
//     // Send an error response
//     res
//       .status(400)
//       .json({ status: "error", msg: "refreshing user token failed" });
//   }
// };

const refresh = (req, res) => {
  try {
    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);
    const claims = {
      email: decoded.email,
      role: decoded.role,
    };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });
    res.json({ access });
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "Refreshing brand token failed" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users ORDER BY id ASC");
    res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const getAllBrands = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM brands ORDER BY id ASC");
    res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const getUserByEmail = async (req, res) => {
  const email = req.body.email;
  const query = "SELECT * FROM users WHERE lower(email) = lower($1)";
  const values = [email];
  try {
    const result = await pool.query(query, values);
    // Assuming email is unique, return the first row
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    // It's better to send an error response rather than throwing an error
    return res.status(500).json({ error: "Failed to fetch user information" });
  }
};

const getBrandByEmail = async (req, res) => {
  const email = req.body.email;
  const query = "SELECT * FROM brands WHERE lower(email) = lower($1)";
  const values = [email];
  try {
    const result = await pool.query(query, values);
    // Assuming email is unique, return the first row
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    // It's better to send an error response rather than throwing an error
    return res.status(500).json({ error: "Failed to fetch user information" });
  }
};

const updateUserProfile = async (req, res) => {
  const email = req.params.email;
  const {
    username,
    user_avatar,
    name,
    contact,
    address,
    gender,
    age_group,
    skin_tone,
    skin_type,
    hair_colour,
    eye_colour,
    fun_facts,
  } = req.body;

  // Construct the SET clause for the UPDATE query
  const setClause = Object.keys(req.body)
    .map((key) => `${key} = $${Object.keys(req.body).indexOf(key) + 1}`)
    .join(", ");

  // Construct the VALUES array for the UPDATE query
  const values = Object.values(req.body);

  try {
    const query = `UPDATE users SET ${setClause} WHERE lower(email) = lower($${
      values.length + 1
    }) RETURNING *`;
    const result = await pool.query(query, [...values, email]);

    if (result.rowCount > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update user profile" });
  }
};

const updateBrandProfile = async (req, res) => {
  const email = req.params.email;
  const {
    username,
    brand_avatar,
    name,
    contact,
    address,
    contact_person,
    website,
  } = req.body;

  // Construct the SET clause for the UPDATE query
  const setClause = Object.keys(req.body)
    .map((key) => `${key} = $${Object.keys(req.body).indexOf(key) + 1}`)
    .join(", ");

  // Construct the VALUES array for the UPDATE query
  const values = Object.values(req.body);

  try {
    const query = `UPDATE brands SET ${setClause} WHERE lower(email) = lower($${
      values.length + 1
    }) RETURNING *`;
    const result = await pool.query(query, [...values, email]);

    if (result.rowCount > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update user profile" });
  }
};
module.exports = {
  register,
  login,
  // userLogin,
  // brandLogin,
  refresh,
  getAllUsers,
  getAllBrands,
  getUserByEmail,
  getBrandByEmail,
  updateUserProfile,
  updateBrandProfile,
};
