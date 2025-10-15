// backend/index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Query = require('./models/Query');

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
  console.log('✅ Connected to MongoDB');
});

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.post('/api/check-symptoms', async (req, res) => {
  try {
    const { symptoms } = req.body;
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `
      Based on these symptoms: "${symptoms}", list possible conditions and precautions.
      Format the response clearly with headings for "Possible Conditions" and "Precautions".
      IMPORTANT: Start the entire response with a disclaimer: "This is for informational purposes only and is not medical advice. Consult a doctor for any health concerns."
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    await Query.create({ symptoms, result: text });

    res.json({ result: text });
  } catch (error) {
    console.error('Error in /api/check-symptoms:', error.message);
    res.status(500).json({ error: 'Failed to get a response from Gemini' });
  }
});

app.get('/api/history', async (req, res) => {
  try {
    const history = await Query.find().sort({ timestamp: -1 }).limit(10);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
