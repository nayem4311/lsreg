// index.js (Vercel API)

const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle POST request to store player data
  if (req.method === 'POST') {
    try {
      const { playerData } = req.body;  // Extract player data from request body
      const filePath = path.join(__dirname, 'data.json');
      
      // Read the current data from the JSON file
      const fileData = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : [];

      // Append the new player data
      fileData.push(playerData);

      // Write the updated data back to the file
      fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2));

      // Respond with a success message
      res.status(200).json({ message: 'Data stored successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error storing data' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
