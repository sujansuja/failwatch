const handleFailedAttempt = require('./HandleFailedAttempts')

function validateContentType(req, res, next) {
    if (req.method === 'POST' && req.originalUrl === '/api/submit') {
        const contentType = req.headers['content-type'];

        // Check if Content-Type is missing
        if (!contentType) {
            handleFailedAttempt(req, 'Missing Content-Type header')
            return res.status(400).json({ error: "Missing Content-Type header" })
        }

        // Check if Content-Type is not 'application/json'
        if (!contentType.includes('application/json')) {
            handleFailedAttempt(req, 'Invalid Content-Type header')
            return res.status(400).json({ error: "Invalid Content-Type header" })
        }
    }
    // Proceed to the next middleware if the header is valid
    next();
};

module.exports = validateContentType;