# Poultry Farm Prototype - Client Application

This is the front-end client application for the Poultry Farm Management System, built using React and Vite. It demonstrates a high-fidelity interaction with the Poultry REST API endpoints.

## Prerequisites

Before starting the client application, ensure that your underlying API is running at `http://localhost:3000`. You will need Node.js and NPM/Yarn installed on your system.

## Starting the Client Application

1. Open a new terminal window or tab.
2. Navigate into the `CLIENT` directory.
3. Install the required client dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Click the local development server link (usually `http://localhost:5173`) to view the application in your browser.

## Running Functional Tests

This project uses **TestCafe** for functional testing.

1. Ensure both your API and Client development servers are running.
2. Open a new terminal window in the `CLIENT` directory.
3. Run the test suite:
   ```bash
   npm test
   ```
This will automatically launch an automated browser session, navigate the interface, and verify core functionality according to the B2 Portfolio requirements.
