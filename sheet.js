const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('./service_account.json');

const SPREADSHEET_ID = '1HklMrmjW56gR8OmQH6LuTxKMiA3zVEfbZ4Kr'; // Replace with your Sheet ID

async function appendToSheet(data) {
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[0]; // Use the first sheet
  await sheet.addRow(data);
}

module.exports = appendToSheet;
