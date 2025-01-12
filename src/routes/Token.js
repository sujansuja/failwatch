const router = require("express").Router();
const generateAccessToken = require('../utils/GenerateAccessToken')

// Endpoint to generate new JWT Token
router.route('/').get(async (req, res) => {
    // Authentication
    const expiresIn = req.query.expiresIn || '30s';

    const token = generateAccessToken(expiresIn)

    return res.status(200).send({token})

})

module.exports = router;