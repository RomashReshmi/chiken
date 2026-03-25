const express = require('express');
const router = express.Router();
const chickenController = require('../controllers/chickenController');
const { validateChicken } = require('../middleware/validator');

/**
 * @api {get} /chickens View All Chickens
 * @apiName GetChickens
 * @apiGroup Chickens
 *
 * @apiSuccess {Object[]} chickens List of chickens.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *       "id": 1,
 *       "breed": "Leghorn",
 *       "age": 24,
 *       "health_status": "Healthy",
 *       "egg_production_rate": 5,
 *       "created_at": "2023-10-01T00:00:00.000Z"
 *     }]
 */
router.get('/', chickenController.getAllChickens);

/**
 * @api {get} /chickens/:id Get Chicken by ID
 * @apiName GetChickenById
 * @apiGroup Chickens
 *
 * @apiParam {Number} id Chicken unique ID.
 *
 * @apiSuccess {Number} id Chicken id.
 * @apiSuccess {String} breed Breed of the chicken.
 * @apiSuccess {Number} age Age in weeks.
 * @apiSuccess {String} health_status Health status.
 * @apiSuccess {Number} egg_production_rate Eggs per week.
 * @apiSuccess {String} created_at Date created.
 */
router.get('/:id', chickenController.getChickenById);

/**
 * @api {post} /chickens Add New Chicken
 * @apiName CreateChicken
 * @apiGroup Chickens
 *
 * @apiParam {String} breed Breed of the chicken.
 * @apiParam {Number} age Age in weeks.
 * @apiParam {String} health_status Health condition.
 * @apiParam {Number} egg_production_rate Production rate.
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "breed": "Brahma",
 *       "age": 10,
 *       "health_status": "Healthy",
 *       "egg_production_rate": 2
 *     }
 *
 * @apiSuccess {Number} id The new Chicken ID.
 */
router.post('/', validateChicken, chickenController.createChicken);

/**
 * @api {put} /chickens/:id Edit Chicken
 * @apiName UpdateChicken
 * @apiGroup Chickens
 *
 * @apiParam {Number} id Chicken unique ID.
 */
router.put('/:id', validateChicken, chickenController.updateChicken);

/**
 * @api {delete} /chickens/:id Remove Chicken
 * @apiName DeleteChicken
 * @apiGroup Chickens
 *
 * @apiParam {Number} id Chicken unique ID.
 */
router.delete('/:id', chickenController.deleteChicken);

module.exports = router;
