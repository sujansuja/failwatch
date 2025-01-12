const router = require('express').Router()
const FailedRequest = require('../models/FailedRequest')

// Endpoint to fetch metrics
router.route('/').get(async (req, res) => {
    // returning FailedRequest document from DB
    const metrics = await FailedRequest.find({});
    res.json(metrics);
});

module.exports = router;