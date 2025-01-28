// app.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Directory where files are stored
const dataDir = path.join(__dirname, 'data');

// Serve static files (HTML, JS, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to get files in the "data" directory (for search suggestions)
app.get('/search', (req, res) => {
  const query = req.query.query || '';
  
  
  // Read the directory contents
  fs.readdir(dataDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to read directory' });
    }

    // Filter files based on the search query
    const filteredFiles = files.filter(file =>
      file.toLowerCase().includes(query.toLowerCase())
    );

    res.json(filteredFiles);  // Return the filtered file names
  });
});

// Endpoint to open and read a selected file
app.get('/open/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(dataDir, filename);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.json({ content: data });  // Send file content in the response
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});






























