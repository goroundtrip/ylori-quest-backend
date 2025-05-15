const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { GoogleSpreadsheet } = require("google-spreadsheet");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/submit", async (req, res) => {
  try {
    const { name, email, wallet, answer1, answer2 } = req.body;
    if (!name || !email || !wallet || !answer1 || !answer2) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const doc = new GoogleSpreadsheet(process.env.SHEET_ID);
    await doc.useServiceAccountAuth({
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
    });

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    await sheet.addRow({
      Name: name,
      Email: email,
      Wallet: wallet,
      Q1: answer1,
      Q2: answer2,
      Timestamp: new Date().toISOString(),
    });

    res.status(200).send({ message: "Submission successful" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Server error", error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
