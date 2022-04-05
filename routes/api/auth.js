const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/',
  check('username', 'Please include a valid username').exists(),
  check('password', 'Password is required').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      // Search by userName in Database
      let user = await User.findOne({ username });

      const isMatch = false;

      if (!user) {
        // If user is not found
        // To prevent the information leakage through the side channel time
        // default in correct password will be checked
        isMatch = await bcrypt.compare(password + "incorrectSalt",
          "incorrectPassword");
      } else {
        // If user found
        // Prepend the salt to the given password and 
        // hash it using the same hash function
        isMatch = await bcrypt.compare(password + user.usersalt,
          user.password);
      }

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Your credential is incorrect' }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      // Upon a successful login, a unique session ID should be generated 
      // and securely stored together with the timestamp using jwt
      // expires in 1 hour
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

      // Clearniing local variables
      password = "";
      user = "";

    } catch (err) {

      // Clearniing local variables
      password = "";
      user = "";

      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
