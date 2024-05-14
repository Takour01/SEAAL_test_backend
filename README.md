# Backend Application (NestJS)

This project is built using NestJS, a progressive Node.js framework for building efficient and scalable server-side applications.

## Prerequisites

Before you begin, ensure you have [Node.js](https://nodejs.org/) installed on your machine. This project was built with Node.js version 14.x or later.

## Getting Started

To get the backend server running locally, follow these steps:

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/Takour01/SEAAL_test_backend.git
cd SEAAL_test_backend
```

### 2. Install Dependencies

Navigate to the cloned directory and run the following command to install the project dependencies:

```bash
npm install
```

### 3.Set Up Environment Variables

Copy the `.env.example` file to a new `.env` file and update it with your specific settings:

```bash
cp .env.example .env
```

Be sure to replace placeholders in the `.env` file with your actual data.

### 4. Run the Application

To start the development server, execute:

```bash
npm run start:dev
```

This command starts the server with nodemon, which automatically restarts the server whenever you make any changes to the source files.

## Accessing the API Documentation

With the server running, you can access the Swagger API documentation at the following URL:

```bash
http://localhost:3000/api

```

This documentation provides a detailed overview of all the available API endpoints, including the expected request formats and the responses.
