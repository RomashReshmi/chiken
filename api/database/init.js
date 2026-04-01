const db = require('./database');

const initDB = () => {
    db.serialize(() => {
        // Drop existing tables
        db.run(`DROP TABLE IF EXISTS chickens`);
        db.run(`DROP TABLE IF EXISTS feed`);
        db.run(`DROP TABLE IF EXISTS eggs`);
        db.run(`DROP TABLE IF EXISTS staff`);

        // Create Tables
        db.run(`
            CREATE TABLE chickens (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                breed TEXT NOT NULL,
                age INTEGER NOT NULL,
                health_status TEXT NOT NULL,
                egg_production_rate INTEGER NOT NULL,
                created_at TEXT NOT NULL
            )
        `);

        db.run(`
            CREATE TABLE feed (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                type TEXT NOT NULL,
                quantity INTEGER NOT NULL,
                supplier TEXT NOT NULL,
                last_restocked TEXT NOT NULL
            )
        `);

        db.run(`
            CREATE TABLE eggs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                quantity INTEGER NOT NULL,
                collected_date TEXT NOT NULL,
                quality_grade TEXT NOT NULL
            )
        `);

        db.run(`
            CREATE TABLE staff (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                role TEXT NOT NULL,
                contact TEXT NOT NULL
            )
        `);

        // Seed Users
        const breeds = ['Leghorn', 'Rhode Island Red', 'Sussex', 'Plymouth Rock', 'Australorp', 'Wyandotte', 'Orpington', 'Brahma', 'Silkie', 'Cochin'];
        const feedTypes = ['Layer Pellets', 'Grower Mash', 'Chick Starter', 'Scratch Grains', 'Oyster Shells'];
        const suppliers = ['Farm Supply Co.', 'AgriFeed Network', 'Local Grain Mill', 'Poultry Provisions Inc.'];
        const staffNames = ['John Smith', 'Sarah Jenkins', 'Michael Davis', 'Emily Chen', 'David Wilson', 'Jessica Taylor', 'Robert Brown', 'Linda Garcia'];
        
        const stmtChickens = db.prepare(`INSERT INTO chickens (breed, age, health_status, egg_production_rate, created_at) VALUES (?, ?, ?, ?, ?)`);
        for (let i = 1; i <= 20; i++) {
            const breed = breeds[Math.floor(Math.random() * breeds.length)];
            const status = Math.random() > 0.85 ? 'Sick' : 'Healthy';
            stmtChickens.run(breed, Math.floor(Math.random() * 50) + 1, status, Math.floor(Math.random() * 10) + 1, new Date().toISOString());
        }
        stmtChickens.finalize();

        const stmtFeed = db.prepare(`INSERT INTO feed (type, quantity, supplier, last_restocked) VALUES (?, ?, ?, ?)`);
        for (let i = 1; i <= 20; i++) {
            const feedType = feedTypes[Math.floor(Math.random() * feedTypes.length)];
            const supplier = suppliers[Math.floor(Math.random() * suppliers.length)];
            stmtFeed.run(feedType, Math.floor(Math.random() * 1000) + 100, supplier, new Date().toISOString());
        }
        stmtFeed.finalize();

        const stmtEggs = db.prepare(`INSERT INTO eggs (quantity, collected_date, quality_grade) VALUES (?, ?, ?)`);
        for (let i = 1; i <= 20; i++) {
            const grades = ['A', 'AA', 'B'];
            stmtEggs.run(Math.floor(Math.random() * 500) + 50, new Date().toISOString(), grades[Math.floor(Math.random() * grades.length)]);
        }
        stmtEggs.finalize();

        const stmtStaff = db.prepare(`INSERT INTO staff (name, role, contact) VALUES (?, ?, ?)`);
        for (let i = 1; i <= 20; i++) {
            const roles = ['Manager', 'Worker', 'Veterinarian', 'Security'];
            const staffName = staffNames[Math.floor(Math.random() * staffNames.length)] + ' ' + i;
            stmtStaff.run(staffName, roles[Math.floor(Math.random() * roles.length)], `contact_${i}@farm.com`);
        }
        stmtStaff.finalize();

        console.log("Database initialized and populated with 20 seeded records per table using realistic data.");
    });
};

initDB();
