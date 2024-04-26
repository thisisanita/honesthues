const { validationResult } = require("express-validator");

const errorCheck = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    // will check body, param, query, headers for the name or colour depending on which line it is on. check will put the error in the request object.
    next();
  }
};

//the above checks if the validation has an error

module.exports = { errorCheck };
