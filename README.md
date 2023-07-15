# Node-Intersections-api
What does the API:

The API defined in the code provides an endpoint for calculating intersections between a linestring and a set of lines. It expects a POST request with a linestring in the 
request body, in GeoJSON format. The linestring is then validated and used to perform intersection calculations with the lines data obtained from a JSON file. 
If any intersections are found, the API returns the intersection points as a response. If no intersections are found, an empty array is returned. If there are errors,
such as missing linestring or invalid linestring format, appropriate error responses with corresponding HTTP status codes are sent. The API runs on port 3000 and provides
the functionality to calculate intersections between a linestring and lines.


How the API can be tested with Postman:

1. Open Postman.
2. Create a new POST request.
3. Set the URL to `http://localhost:3000/intersections`.
4. In the request body, select "Raw" and choose JSON format.
5. Provide the linestring data in the request body, following the GeoJSON format.
6. Click the "Send" button.
7. View the API response in Postman, which will contain the intersection points between the linestring and the lines.

Ensure that the API server is running on `http://localhost:3000` before testing with Postman.
