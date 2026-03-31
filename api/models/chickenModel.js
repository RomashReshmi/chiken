const db = require('../database/database');

const Chicken = {
    getAll: (callback) => {
        db.all(`SELECT * FROM chickens`, [], callback);
    },
    getById: (id, callback) => {
        db.get(`SELECT * FROM chickens WHERE id = ?`, [id], callback);
    },
    create: (data, callback) => {
        const { breed, age, health_status, egg_production_rate, created_at } = data;
        db.run(
            `INSERT INTO chickens (breed, age, health_status, egg_production_rate, created_at) VALUES (?, ?, ?, ?, ?)`,
            [breed, age, health_status, egg_production_rate, created_at],
            function (err) {
                callback(err, this ? this.lastID : null);
            }
        );
    },
    update: (id, data, callback) => {
        const { breed, age, health_status, egg_production_rate } = data;
        db.run(
            `UPDATE chickens SET breed = ?, age = ?, health_status = ?, egg_production_rate = ? WHERE id = ?`,
            [breed, age, health_status, egg_production_rate, id],
            function (err) {
                callback(err, this ? this.changes : null);
            }
        );
    },
    delete: (id, callback) => {
        db.run(`DELETE FROM chickens WHERE id = ?`, [id], function (err) {
            callback(err, this ? this.changes : null);
        });
    }
};

module.exports = Chicken;
