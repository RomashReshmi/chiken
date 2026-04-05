# Poultry Farm Management System

This is a comprehensive REST API and Client application prototype built to monitor and manage a poultry farm. It focuses on a highly premium, resilient user experience, and RESTful methodologies.

## 🚀 Features
- **Full CRUD Support:** Create, read, update, and delete chicken records seamlessly.
- **RESTful API:** Robust Node.js back-end communicating via standard JSON over HTTP.
- **Premium UI:** Custom dashboard featuring an intricate glassmorphism design, interactive sidecars, and sleek animated table components.
- **End-to-End Testing:** Includes automated UI tests using TestCafe alongside Jest for API testing.
- **API Documentation:** Auto-generated structured API documentation utilizing `apidoc`.

## 🛠 Technologies Used
- **Backend:** Node.js, Express.js
- **Database:** SQLite3
- **Tooling/Middleware:** Express-Validator, apidoc, Jest, Supertest
- **Frontend:** React 18, Vite, Lucide-React (Icons)
- **Styling:** Custom CSS Variables System, Glassmorphism UI, Responsive CSS Grid/Flexbox
- **Testing:** TestCafe (E2E), Jest

## 📁 Project Structure

```text
poultry-farm-system/
│
├── API/
│   ├── app.js                       # API Entry point
│   ├── package.json                 # Dependencies and NPM Scripts
│   ├── apidoc.json                  # Apidoc config
│   ├── database/                    # Contains sqlite3 database module and initialization script
│   └── tests/                       # Jest & Supertest automated route checks
│
├── CLIENT/
│   ├── index.html                   # HTML Entry loaded with Google Fonts
│   ├── src/                         
│   │   ├── App.jsx                  # Main UI container holding Dashboard routing
│   │   ├── index.css                # Core design system & dark emerald theme
│   │   ├── components.css           # Modular layouts and grid responsives
│   │   └── components/              # Self-contained React views (Sidebar, Dashboard, etc.)
│   └── tests/                       # TestCafe E2E integration suite
│
└── README.md                        # Documentation requirements
```

## ⚙️ Running the Project

### Prerequisites
- Node.js (v20 or higher recommended)
- npm (Node Package Manager)

### 1. Setup Backend API
1. Navigate to the API directory:
   ```bash
   cd API
   npm install
   ```
2. Initialize the database and seed the mock data:
   ```bash
   npm run db:init
   ```
3. Start backend development server:
   ```bash
   npm run dev
   ```
   > The API will be available at `http://localhost:3000`

### 2. Setup Client Side
1. Open a new terminal and navigate to the client directory:
   ```bash
   cd CLIENT
   npm install
   ```
2. Run Local Dev Server:
   ```bash
   npm run dev
   ```
   > The React app will be served at `http://localhost:5173`.

## 🧪 Testing

### Backend Testing (Jest & Supertest)
```bash
cd API
npm test
```

### Frontend E2E Testing (TestCafe)
1. Ensure both the API (`npm run dev` in `API/`) and CLIENT (`npm run dev` in `CLIENT/`) are running.
2. In a new terminal, run:
```bash
cd CLIENT
npm test
```
*(This will launch your default browser to automatically execute UI usage scenarios.)*

## 📚 API Documentation
To generate and view the structured REST API documentation:
1. Navigate to the `API` folder:
   ```bash
   cd API
   npm run apidoc
   ```
2. The HTML documentation site will be generated inside an `APIDOC/` directory. You can open its `index.html` file in your browser to explore the endpoints.

## 🎨 UI Overhaul Highlights
- **Premium Design System:** Fully replaced default styles with a bespoke "Tech SaaS" and "Emerald Farm" hybrid theme. High focus on exact typography (`Outfit` and `Inter`) with clean color scales.
- **Micro-Interactions:** Hover cards with glowing boundaries, animated slide-up mounting effects, and staggered child components mimicking high-end application behavior.
- **Component Componentization:** The application was refactored from a single monolithic display into highly focused standalone React layout elements mapping directly to modern architecture patterns.
- **Responsive Fluidity:** Navigations gracefully adjust to sticky bottom-rows and data tables adopt scrollable overflow behavior to ensure mobile and tablet users have parity with desktop features.
