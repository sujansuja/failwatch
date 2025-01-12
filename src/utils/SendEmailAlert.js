const nodemailer = require('nodemailer');

// Function to send alert email
async function sendAlertEmail(ip) {

    // email transporter using nodemailer npm package
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    // Email structure
    const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: process.env.ALERT_EMAIL,
        subject: 'Failed Request Alert',
        text: `Alert: ${FAILED_ATTEMPTS_THRESHOLD} failed requests detected from IP: ${ip} within ${TIME_WINDOW_MINUTES} minutes.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Alert email sent successfully.');
    } catch (error) {
        console.error('Failed to send alert email:', error);
    }
}

module.exports = sendAlertEmail;