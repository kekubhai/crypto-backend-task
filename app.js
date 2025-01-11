const cron = require('node-cron');
const fetchCryptoData = require('./services/jobs');
cron.schedule('0 */2 * * *', fetchCryptoData);


const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');
const fetchCryptoData = require('./services/jobs');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
fetchCryptoData();


app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
