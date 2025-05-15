const express = require('express');
const cors = require('cors');
const appendToSheet = require('./sheet');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/submit', async (req, res) => {
  const { name, email, wallet } = req.body;

  try {
    await appendToSheet({ Name: name, Email: email, Wallet: wallet });
    res.status(200).json({ message: 'Success! Your quest was recorded.' });
  } catch (err) {
    console.error('Error appending to sheet:', err);
    res.status(500).json({ error: 'Failed to submit quest' });
  }
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
