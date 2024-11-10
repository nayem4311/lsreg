const fs = require('fs');
const path = require('path');

// This function handles incoming requests
export default async function handler(req, res) {
  // Set CORS headers to allow all origins
  res.setHeader('Access-Control-Allow-Origin', '*');  // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle POST request to store data
  if (req.method === 'POST') {
    const { playerData } = req.body;

    if (!playerData) {
      return res.status(400).json({ message: 'Player data is required' });
    }

    try {
      // Define the path to the JSON file
      const filePath = path.resolve('./playerData.json');

      // Read existing data from the file (if it exists)
      let currentData = [];
      if (fs.existsSync(filePath)) {
        currentData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      }

      // Append new data to the existing data
      currentData.push(playerData);

      // Write the updated data back to the file
      fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2));

      // Return a success response
      res.status(200).json({ message: 'Data stored successfully' });
    } catch (error) {
      console.error('Error storing data:', error);
      res.status(500).json({ message: 'Failed to store player data' });
    }
  } else {
    // If the method is not POST, return 405 Method Not Allowed
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
