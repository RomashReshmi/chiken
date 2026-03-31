const { body } = require('express-validator');

exports.validateChicken = [
    body('breed').isString().notEmpty().withMessage('Breed must be a valid string'),
    body('age').isInt({ min: 0 }).withMessage('Age must be a positive integer'),
    body('health_status').isString().notEmpty().withMessage('Health status is required'),
    body('egg_production_rate').isInt({ min: 0 }).withMessage('Egg production rate must be an integer')
];

exports.validateFeed = [
    body('type').isString().notEmpty().withMessage('Type is required'),
    body('quantity').isInt({ min: 0 }).withMessage('Quantity must be an integer'),
    body('supplier').isString().notEmpty().withMessage('Supplier is required')
];

exports.validateEgg = [
    body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a positive integer'),
    body('quality_grade').isString().notEmpty().withMessage('Quality grade is required')
];

exports.validateStaff = [
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('role').isString().notEmpty().withMessage('Role is required'),
    body('contact').isString().notEmpty().withMessage('Contact is required')
];
