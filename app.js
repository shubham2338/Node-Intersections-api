const express = require('express');
const fs = require('fs');
const turf = require('@turf/turf');

const app = express();
app.use(express.json());

// Define a POST endpoint for the Intersections API
app.post('', (req, res) => {
  // Check for the presence of the linestring in the request body
  if (!req.body.linestring) {
    return res.status(400).json({ error: 'Invalid request body. Linestring is missing in the request body.' });
  }

  // Parse the GeoJSON linestring from the request body
  const linestring = req.body.linestring;

  // Validate the linestring
  if (linestring.type !== 'LineString' || !linestring.coordinates || !Array.isArray(linestring.coordinates)) {
    return res.status(500).json({ error: 'Invalid linestring format.' });
  }


  // Read the lines data from the JSON file
  const linesData = fs.readFileSync('lines.json');
  const lines = JSON.parse(linesData);

  // Perform intersection calculations
  const intersections = findIntersections(linestring, lines);

  // Return the appropriate response
  if (intersections.length === 0) {
    return res.json([]);
  } else {
    return res.json(intersections);
  }
});

// Helper function to find intersections between a linestring and the lines
function findIntersections(linestring, lines) {
  const intersections = [];

  lines.forEach((lineObj) => {
    const line = lineObj.line;
    const intersect = turf.lineIntersect(linestring, line);

    if (intersect.features.length > 0) {
      intersections.push({
        lineId: lineObj.id,
        point: intersect.features[0].geometry.coordinates,
      });
    }
  });

  return intersections;
}

// Read the linestring data from the JSON file
const linestringData = fs.readFileSync('long-ls.json');
const linestring = JSON.parse(linestringData);

// Read the lines data from the JSON file
const linesData = fs.readFileSync('lines.json');
const lines = JSON.parse(linesData);

// Start the server
app.listen(3000, () => {
  console.log('Intersections API is running on http://localhost:3000');
});
