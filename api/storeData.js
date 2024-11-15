// api/storeData.js
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // Set CORS headers to allow requests from any origin (or specify a domain)
  res.setHeader('Access-Control-Allow-Origin', '*');  // Allow all origins or replace '*' with specific domains
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle OPTIONS preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // End the OPTIONS request
  }

  if (req.method === 'POST') {
    try {
      // Get the data sent in the request body
      const data = req.body;

      // Define the path to store the JSON file (this is temporary on Vercel)
      const filePath = path.join(process.cwd(), 'data', 'data.json');

      // Read existing data from the file if it exists
      let fileData = [];
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        fileData = JSON.parse(fileContent);
      }

      // Add the new data to the existing data array
      fileData.push(data);

      // Write the updated data back to the file
      fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2));

      // Send a success response
      res.status(200).json({ message: 'Data stored successfully' });
    } catch (error) {
      // Handle any errors
      res.status(500).json({ error: 'Error storing data' });
    }
  } else {
    // Handle other methods (e.g., GET) with a method not allowed response
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
