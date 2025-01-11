const axios = require('axios');
const Crypto = require('../models/Crypto');

const fetchCryptoData = async () => {
  try {
    const coins = ['bitcoin', 'matic-network', 'ethereum'];
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(',')}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`
    );

    for (const coin of coins) {
      const data = response.data[coin];
      await Crypto.create({
        coin,
        price: data.usd,
        marketCap: data.usd_market_cap,
        '24hChange': data.usd_24h_change,
      });
    }

    console.log('Data fetched and stored successfully');
  } catch (err) {
    console.error('Error fetching data:', err.message);
  }
};

module.exports = fetchCryptoData;
