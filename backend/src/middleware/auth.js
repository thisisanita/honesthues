const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res.status(400).json({
      status: "error",
      msg: "no token found",
    });
  }
  const token = req.headers["authorization"].replace("Bearer ", "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      console.log(decoded);
      req.decoded = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ status: "error", msg: "not authorised" });
    }
  } else {
    return res.status(403).send({ status: "error", msg: "missing token" });
  }
};

const brandAuth = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res.status(400).json({
      status: "error",
      msg: "no token found",
    });
  }
  const token = req.headers["authorization"].replace("Bearer ", "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      console.log(decoded);
      req.decoded = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ status: "error", msg: "not authorised" });
    }
  } else {
    return res.status(403).send({ status: "error", msg: "missing token" });
  }
};

module.exports = { brandAuth, userAuth };
