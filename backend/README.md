# README: Event Scheduling RESTful API

## Requirements
1. Node v20^.
2. MongoDB (local or cloud).
3. Postman or any api endpoint testing software.

## Setup Instructions
1. Clone the repository to your local machine.
2. Install the necessary dependencies using `npm install`.
3. Change database connection string in the .env file based on what you have. Be aware that Prisma is being used in this project hence the database connection must be done on a replica set therefore use Atlas or setup a local replica set for MongoDB.
4. Run ```npx prisma generate```to set up the database schema.
5. Start the server using `npm run dev`
6. Access the API endpoints using a tool like Postman or curl.

## API Overview
- **POST /api/auth/signup**: Register a new user.
- **POST /api/auth/signin**: Log in an existing user.
- **POST /api/**: Create a new event (requires authentication).
- **GET /api/**: Get a list of all events.
- **GET /api/get-event/:id**: Get details of a specific event.
- **PUT /api/update-event/:id**: Update details of a specific event (requires authentication).
- **DELETE /api/delete-event/:id**: Delete a specific event (requires authentication).
