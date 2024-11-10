// index.js
import { createServer } from 'http';
import fs from 'fs';
import path from 'path';

// This will be used for custom server setups, logging, etc. (optional in Vercel)
const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Vercel API is running\n');
});

// Set up server to listen on a specific port (for local development or if you're running your own server)
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

// Example: Check if data.json exists and log its contents (just for debugging purpose)
const dataFilePath = path.join(process.cwd(), 'data', 'data.json');
fs.readFile(dataFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading data.json:', err);
  } else {
    console.log('Contents of data.json:', data);
  }
});
