const { body } = require("express-validator");

const validateRegistrationData = [
  body("email", "email is required").not().isEmpty(),
  body("email", "valid email is required").isEmail(),
  body("username", "username is requireed").not().isEmpty(),
  body("username", "username min is 8 and max is 50").isLength({
    min: 8,
    max: 50,
  }),
  body("password", "password is required").not().isEmpty(),
  body("password", "password min is 8 and max is 50").isLength({
    min: 8,
    max: 60,
  }),
  body("name", "name is requireed").not().isEmpty(),
  body("contact", "contact is required").not().isEmpty(),
  body("address", "address is required").not().isEmpty(),
];

const validateLoginData = [
  body("email", "email is required").not().isEmpty().isEmail(),
  body("password", "password is required").not().isEmpty(),
];

const validateRefreshToken = [
  body("refresh", "refresh token is required")
    .not()
    .isEmpty()
    .isLength({ min: 1 }),
];

module.exports = {
  validateRegistrationData,
  validateLoginData,
  validateRefreshToken,
};
