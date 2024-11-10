const fs = require('fs');
const path = require('path');

// This function handles incoming requests
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
    // Get player data from the request body
    const { playerData } = req.body;

    // Ensure that playerData is provided
    if (!playerData) {
      return res.status(400).json({ message: 'Player data is required' });
    }

    try {
      // Define the path to the JSON file where the data will be stored
      const filePath = path.resolve('./playerData.json');

      // Read existing data from the file if it exists, or initialize an empty array if the file is not found
      let currentData = [];
      if (fs.existsSync(filePath)) {
        currentData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      }

      // Append the new player data to the existing data array
      currentData.push(playerData);

      // Write the updated data back to the JSON file
      fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2));

      // Return a success response
      res.status(200).json({ message: 'Player data stored successfully' });
    } catch (error) {
      console.error('Error storing data:', error);
      res.status(500).json({ message: 'Failed to store player data' });
    }
  } else {
    // If the method is not POST, return a 405 Method Not Allowed
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
