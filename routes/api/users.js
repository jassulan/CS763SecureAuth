const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('config');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');

const User = require('../../models/User');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  check('username', 'Please include a valid username')
    .matches(/^[~A-Za-z0-9]*$/)
    .isLength({ min: 3 }),
  check(
    'password',
    'Please include a valid password'
  )
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
    .isLength({ min: 8 })
  ,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      let user = await User.findOne({ username });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        username,
        password,
        usersalt
      });

      // Generate a long random salt using a crypto (CSPRNG)
      const buf = crypto.randomBytes(60);
      user.usersalt = buf;

      // Also generate another salt using bcrypt
      // However it will not be saved in database
      const salt = await bcrypt.genSalt(10);

      // Prepend the salt to the password and 
      // hash it with a standard password hashing function
      user.password = await bcrypt.hash(password + buf, salt);

      // Save both the salt and the hash in the database
      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    GET api/users
// @desc     Get all courses
// @access   Public
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
);


// @route    GET api/users/:user_id
// @desc     Get user by user_Id
// @access   Public
router.get('/:user_id', async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User does not exist' }] });
    }

    return res.json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
}
);

module.exports = router;
