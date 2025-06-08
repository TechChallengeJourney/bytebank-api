# Node API Project

This project is a Node.js API that provides GET, PUT, and DELETE endpoints for managing users, extracts, and cards. It is built using Express and includes Swagger documentation for easy reference.

## Project Structure

```
node-api-project
├── src
│   ├── app.js               # Entry point of the application
│   ├── routes               # Contains API route definitions
│   │   └── api.js
│   ├── controllers          # Contains API logic
│   │   └── apiController.js
│   ├── data                # Contains initial JSON data
│   │   └── data.json
│   └── swagger              # Contains Swagger documentation
│       └── swagger.json
├── Dockerfile               # Dockerfile for building the application image
├── docker-compose.yml       # Docker Compose configuration
├── package.json             # npm configuration file
└── README.md                # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)
- Docker (for containerization)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd node-api-project
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Running the Application

To run the application locally, use the following command:
```
npm start
```

### Docker

To build and run the application using Docker, execute the following commands:

1. Build the Docker image:
   ```
   docker build -t node-api-project .
   ```

2. Run the Docker container:
   ```
   docker run -p 3000:3000 node-api-project
   ```

### API Endpoints

- **GET /api/users**: Retrieve a list of users.
- **PUT /api/users/:id**: Update user data by ID.
- **DELETE /api/users/:id**: Delete a user by ID.

### Swagger Documentation

The API is documented using Swagger. You can access the documentation at `http://localhost:3000/api-docs` after starting the application.

### License

This project is licensed under the MIT License.