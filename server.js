require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json())

app.set('trust proxy', true)

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send("Welcome to FailWatch")
})

// Apply the middleware
const validateContentType = require('./src/utils/validateContentType')
app.use(validateContentType);

const metricsRouter = require('./src/routes/Metrics')
app.use('/api/metrics', metricsRouter)

const submitRouter = require('./src/routes/Submit')
app.use('/api/submit', submitRouter)

const addRouter = require('./src/routes/Add')
app.use('/api/add', addRouter)

const tokenRouter = require('./src/routes/Token');
const handleFailedAttempt = require('./src/utils/HandleFailedAttempts');
app.use('/api/token', tokenRouter)