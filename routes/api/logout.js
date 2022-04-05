const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const BlackList = require('../../models/BlackList');

// @route    POST api/course
// @desc     Create course
// @access   Private
router.post(
    '/',
    auth,
    async (req, res) => {
        // Get token from header
        const token = req.header('x-auth-token');

        // build a BlackList
        const badtoken = new BlackList({
            token
        });

        try {
            await badtoken.save();
            return res.json(badtoken);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
    }
);

module.exports = router;