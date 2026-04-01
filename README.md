# Poultry Farm Management System

This is a comprehensive REST API and Client application prototype built to monitor and manage a poultry farm. It focuses on a highly premium, resilient user experience, and RESTful methodologies.

## Technologies Used
- **Backend:** Node.js, Express.js
- **Database:** SQLite3
- **Tooling/Middleware:** Express-Validator, apidoc, Jest, Supertest
- **Frontend:** React 18, Vite, Lucide-React (Icons)
- **Styling:** Custom CSS Variables System, Glassmorphism UI, Responsive CSS Grid/Flexbox
- **Testing:** TestCafe (E2E), Jest

## Project Structure
```text
poultry-farm-system/
│
├── API/
│   ├── app.js                       # API Entry point
│   ├── package.json                 # Dependencies and NPM Scripts
│   ├── apidoc.json                  # Apidoc config
│   ├── database/                    # Contains sqlite3 database module and initialization script
│   └── ...                          # Controllers, Middleware, Routes, Tests
│
├── CLIENT/
│   ├── index.html                   # HTML Entry loaded with Google Fonts
│   ├── src/                         
│   │   ├── App.jsx                  # Main UI container holding Dashboard routing
│   │   ├── index.css                # Core design system & CSS variables (Dark Emerald Theme)
│   │   ├── components.css           # Modular layouts and grid responsives
│   │   └── components/              
│   │       ├── Sidebar.jsx          # Interactive side navigation
│   │       ├── Dashboard.jsx        # Stat-driven responsive dashboard cards
│   │       ├── ChickensList.jsx     # Dynamic animated data tables
│   │       └── AddChickenForm.jsx   # Input validation flows
│   └── tests/                       # TestCafe integration suite
│
└── README.md                        # Documentation requirements
```

## Running the Project

### 1. Setup Backend API
1. Navigate to the api directory:
   ```bash
   cd API
   ```
2. Install tools:
   ```bash
   npm install
   ```
3. Initialize the database and seed the mock data:
   ```bash
   npm run db:init
   ```
4. Start backend development server:
   ```bash
   npm run dev
   ```
   > The API will be available at `http://localhost:3000`

### 2. Setup Client Side
1. Open a new terminal and navigate to the client directory:
   ```bash
   cd CLIENT
   ```
2. Install frontend frameworks:
   ```bash
   npm install
   ```
3. Run Local Dev Server
   ```bash
   npm run dev
   ```
   > The React app runs at `http://localhost:5173`.

## UI Overhaul Highlights
- **Premium Design System:** Fully replaced default styles with a bespoke "Tech SaaS" and "Emerald Farm" hybrid theme. High focus on exact typography (`Outfit` and `Inter`) with clean color scales.
- **Micro-Interactions:** Hover cards with glowing boundaries, animated slide-up mounting effects, and staggered child components mimicking high-end application behavior.
- **Component Componentization:** The application was refactored from a single monolithic display into highly focused standalone React layout elements mapping directly to modern architecture patterns.
- **Responsive Fluidity:** Navigations gracefully adjust to sticky bottom-rows and data tables adopt scrollable overflow behavior to ensure mobile and tablet users have parity with desktop features.
