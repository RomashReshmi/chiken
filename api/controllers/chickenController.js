const Chicken = require('../models/chickenModel');
const { validationResult } = require('express-validator');

exports.getAllChickens = (req, res) => {
    Chicken.getAll((err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(rows);
    });
};

exports.getChickenById = (req, res) => {
    Chicken.getById(req.params.id, (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Chicken not found' });
        res.status(200).json(row);
    });
};

exports.createChicken = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const newChicken = {
        breed: req.body.breed,
        age: req.body.age,
        health_status: req.body.health_status,
        egg_production_rate: req.body.egg_production_rate,
        created_at: new Date().toISOString()
    };

    Chicken.create(newChicken, (err, id) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id, ...newChicken });
    });
};

exports.updateChicken = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    Chicken.update(req.params.id, req.body, (err, changes) => {
        if (err) return res.status(500).json({ error: err.message });
        if (changes === 0) return res.status(404).json({ error: 'Chicken not found or no changes made' });
        res.status(200).json({ message: 'Chicken updated successfully', id: req.params.id });
    });
};

exports.deleteChicken = (req, res) => {
    Chicken.delete(req.params.id, (err, changes) => {
        if (err) return res.status(500).json({ error: err.message });
        if (changes === 0) return res.status(404).json({ error: 'Chicken not found' });
        res.status(200).json({ message: 'Chicken deleted successfully' });
    });
};
