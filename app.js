const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');
const fetchCryptoData = require('./services/jobs'); // Import once
const cron = require('node-cron');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

fetchCryptoData(); // Start job immediately
cron.schedule('0 */2 * * *', fetchCryptoData); // Schedule job every 2 hours

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
