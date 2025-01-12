const jwt = require('jsonwebtoken')
const handleFailedAttempt = require('./HandleFailedAttempts')

// Verify the sent JWT 
async function authenticateToken(req, res, next) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {

        await handleFailedAttempt(req, "No token is provided");

        return res.status(401).send("No token is provided")
    }

    // Verify the token using `jsonwebtoken` npm package
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                await handleFailedAttempt(req, "Token is expired");

                return res.status(401).send("Token is expired")
            }
            if (err.name === 'JsonWebTokenError') {
                await handleFailedAttempt(req, "Invalid token");

                return res.status(401).send("Invalid token")
            }

            await handleFailedAttempt(req, "Malformed Tokens");

            return res.status(401).send("Malformed Tokens")
        }
        next()
    })
}

module.exports = authenticateToken