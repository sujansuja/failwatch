const FailedRequest = require('../models/FailedRequest')
const sendAlertEmail = require('../utils/SendEmailAlert')

const FAILED_ATTEMPTS_THRESHOLD = 6;
const TIME_WINDOW_MINUTES = 10;

// In-Memory cache to store failed attempts
const failedAttemptsCache = {};

async function handleFailedAttempt(req, reason) {
    const clientIP = req.ip;
    const currentTime = Date.now();

    // Log to the database
    await FailedRequest.create({
        ip: clientIP,
        endpoint: req.originalUrl,
        reason: reason
    });

    // Update the failedAttemptsCache
    if (!failedAttemptsCache[clientIP]) {
        failedAttemptsCache[clientIP] = [];
    }
    failedAttemptsCache[clientIP].push(currentTime);

    // Remove outdated attempts from cache 
    failedAttemptsCache[clientIP] = failedAttemptsCache[clientIP].filter(
        (time) => currentTime - time <= TIME_WINDOW_MINUTES * 60 * 1000
    );

    console.log(`Failed attempts from ${clientIP}: ${failedAttemptsCache[clientIP].length}`);

    // Trigger alert if threshold is exceeded
    if (failedAttemptsCache[clientIP].length >= FAILED_ATTEMPTS_THRESHOLD) {
        console.log("Threshold exceeded. Sending alert email...");
        await sendAlertEmail(clientIP, FAILED_ATTEMPTS_THRESHOLD, TIME_WINDOW_MINUTES);
    }
}

module.exports = handleFailedAttempt;