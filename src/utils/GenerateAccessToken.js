const jwt = require('jsonwebtoken')

// Function to generate a new JWT
function generateAccessToken(expiresIn) {
    // Authentication 

    return jwt.sign({ "user": "FlexyPe" }, process.env.ACCESS_TOKEN_SECRET, { expiresIn })
}

module.exports = generateAccessToken
