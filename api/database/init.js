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
        const stmtChickens = db.prepare(`INSERT INTO chickens (breed, age, health_status, egg_production_rate, created_at) VALUES (?, ?, ?, ?, ?)`);
        for (let i = 1; i <= 20; i++) {
            stmtChickens.run(`Breed_${i}`, Math.floor(Math.random() * 50) + 1, i % 3 === 0 ? 'Sick' : 'Healthy', Math.floor(Math.random() * 10) + 1, new Date().toISOString());
        }
        stmtChickens.finalize();

        const stmtFeed = db.prepare(`INSERT INTO feed (type, quantity, supplier, last_restocked) VALUES (?, ?, ?, ?)`);
        for (let i = 1; i <= 20; i++) {
            stmtFeed.run(`FeedType_${i}`, Math.floor(Math.random() * 1000) + 100, `Supplier_${i}`, new Date().toISOString());
        }
        stmtFeed.finalize();

        const stmtEggs = db.prepare(`INSERT INTO eggs (quantity, collected_date, quality_grade) VALUES (?, ?, ?)`);
        for (let i = 1; i <= 20; i++) {
            const grades = ['A', 'AA', 'B'];
            stmtEggs.run(Math.floor(Math.random() * 500) + 50, new Date().toISOString(), grades[i % 3]);
        }
        stmtEggs.finalize();

        const stmtStaff = db.prepare(`INSERT INTO staff (name, role, contact) VALUES (?, ?, ?)`);
        for (let i = 1; i <= 20; i++) {
            const roles = ['Manager', 'Worker', 'Veterinarian', 'Security'];
            stmtStaff.run(`Staff_Name_${i}`, roles[i % 4], `contact_${i}@farm.com`);
        }
        stmtStaff.finalize();

        console.log("Database initialized and populated with 20 seeded records per table.");
    });
};

initDB();
