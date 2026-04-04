# Poultry Farm REST API

A Node.js/Express REST API for managing a poultry farm inventory.

## Prerequisites
- **Node.js**: v20 or higher
- **npm**: Included with Node.js

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```
*The server will run on `http://localhost:3000`.*

### 3. Run API Tests
```bash
npm test
```
*Executes the Jest and Supertest validation suite.*

### 4. Generate API Documentation
```bash
npm run apidoc
```
*This command generates the HTML API documentation and outputs it to the `../APIDOC` directory.*

## API Endpoints

| Method | Route | Description |
|---|---|---|
| **GET** | `/chickens` | Retrieves a list of all chickens in the inventory. |
| **POST** | `/chickens` | Adds a new chicken to the inventory. |
| **GET** | `/chickens/:id` | Retrieves detailed information about a specific chicken. |
| **PUT** | `/chickens/:id` | Updates the details of a specific chicken. |
| **DELETE** | `/chickens/:id` | Removes a specific chicken from the inventory by its ID. |
