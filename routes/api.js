const express = require('express');
const Crypto = require('../models/Crypto');
const router = express.Router();


router.get('/stats', async (req, res) => {
  try {
    const { coin } = req.query;
    if (!coin) return res.status(400).json({ error: 'Coin is required' });

    const latestData = await Crypto.findOne({ coin }).sort({ timestamp: -1 });
    if (!latestData) return res.status(404).json({ error: 'Data not found' });

    res.json({
      price: latestData.price,
      marketCap: latestData.marketCap,
      '24hChange': latestData['24hChange'],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/deviation', async (req, res) => {
  try {
    const { coin } = req.query;
    if (!coin) return res.status(400).json({ error: 'Coin is required' });

    const records = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);
    if (records.length === 0) return res.status(404).json({ error: 'Data not found' });

    const prices = records.map((record) => record.price);
    const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
    const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;
    const deviation = Math.sqrt(variance);

    res.json({ deviation: deviation.toFixed(2) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
