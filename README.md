### Express JSON API

This repository contains a simple Express.js server that provides RESTful API endpoints for managing JSON data stored in a file. The server allows users to perform CRUD (Create, Read, Update, Delete) operations on the data.

#### Technologies Used:
- Node.js
- Express.js
- axios (HTTP client for making requests)

#### Setup Instructions:
1. Clone the repository to your local machine.
2. Install dependencies by running `npm install`.
3. Run the server using `npm start`.
4. The server will start running on port 5001 by default.

#### API Endpoints:

1. **GET /api/data**
   - Description: Retrieves all records from the JSON data file.
   - Response: JSON array of records.
   
2. **GET /api/data/:id**
   - Description: Retrieves a specific record by its ID from the JSON data file.
   - Response: JSON object of the requested record.
   
3. **POST /api/data**
   - Description: Creates a new record in the JSON data file.
   - Request Body: JSON object representing the new record.
   - Response: JSON object of the newly created record.
   
4. **PUT /api/data/:id**
   - Description: Updates an existing record in the JSON data file.
   - Request Body: JSON object with updated record fields.
   - Response: JSON object of the updated record.
   
5. **DELETE /api/data/:id**
   - Description: Deletes a record from the JSON data file by its ID.
   - Response: JSON array of records after deletion.

#### Example Usage:
- To retrieve all records: `GET /api/data`
- To retrieve a specific record with ID 123: `GET /api/data/123`
- To create a new record: `POST /api/data` with JSON body
  ```
  {
    "id": 123,
    "name": "John Doe",
    "age": 30
  }
  ```
- To update a record with ID 123: `PUT /api/data/123` with JSON body containing updated fields.
- To delete a record with ID 123: `DELETE /api/data/123`

#### Note:
- The server uses CORS middleware to enable Cross-Origin Resource Sharing.
- Error responses include appropriate status codes and error messages.
- The JSON data file is stored at `data/data.json` relative to the server file.

Feel free to explore and modify the code as needed for your own projects!