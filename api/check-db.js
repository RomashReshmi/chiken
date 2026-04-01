const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/farm.sqlite');
db.get("SELECT COUNT(*) as count FROM chickens", [], (err, row) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Record count in chickens table:", row.count);
    }
    db.close();
});
