const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  // Set CORS headers to allow all origins
  res.setHeader('Access-Control-Allow-Origin', '*');
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
      console.log("Received player data:", playerData);  // Log incoming data

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

      console.log("Data stored successfully");  // Log successful storage

      // Return a success response
      res.status(200).json({ message: 'Data stored successfully' });
    } catch (error) {
      console.error('Error storing data:', error);
      res.status(500).json({ message: 'Failed to store player data' });
    }
  }

  // Handle GET request to retrieve the stored data
  else if (req.method === 'GET') {
    try {
      const filePath = path.resolve('./playerData.json');
      
      // Check if the file exists
      if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        return res.status(200).json(JSON.parse(data));
      } else {
        return res.status(404).json({ message: 'Data file not found' });
      }
    } catch (error) {
      console.error('Error reading data:', error);
      res.status(500).json({ message: 'Failed to read player data' });
    }
  }

  // If the method is not POST or GET, return 405 Method Not Allowed
  else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
