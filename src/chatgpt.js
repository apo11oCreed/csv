// taken from chatgpt
// https://chatgpt.com/share/cd473d1f-4ee2-493b-be30-d12bd6a361db
import fs from 'fs';
import csv from 'csv-parser';
import { createObjectCsvWriter } from 'csv-writer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the old CSV file
const oldCsvFilePath = __dirname + '/csv/mbta-route-types.csv';

// Path to the new CSV file
const newCsvFilePath = __dirname + '/csv/mbta-route-types-new.csv';

// Create a CSV writer
const csvWriter = createObjectCsvWriter({
  path: newCsvFilePath,
  header: [
    // Define your header here
    { id: 'column1', title: 'attributes' },
    { id: 'column2', title: 'id' },
    // Add more columns as needed
  ]
});

// Read and process the old CSV file
const records = [];

fs.createReadStream(oldCsvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    // Process each row and add it to the records array
    // For example, you can modify the row data or filter out certain rows
    records.push({
      column1: row['attributes'],
      column2: row['id'],
      // Map more columns as needed
    });
  })
  .on('end', () => {
    // Write the processed records to the new CSV file
    csvWriter.writeRecords(records)
      .then(() => {
        console.log('New CSV file created successfully.');
      });
  })
  .on('error', (error) => {
    console.error('Error reading the old CSV file:', error);
  });