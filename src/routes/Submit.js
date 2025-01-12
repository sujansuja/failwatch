const router = require('express').Router()
const authenticateToken = require('../utils/AuthenticateToken')

// POST Request with middleware
router.route('/').post(authenticateToken, async (req, res) => {

    // Handle the POST request if middleware does not fails
    res.send({message: "Request successful"});
});

module.exports = router;
