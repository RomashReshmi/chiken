const express = require('express');
const router = express.Router();
const chickenController = require('../controllers/chickenController');
const { validateChicken } = require('../middleware/validator');

/**
 * @api {get} /chickens View All Chickens
 * @apiVersion 1.0.0
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
 * @apiVersion 1.0.0
 * @apiName GetChickenById
 * @apiGroup Chickens
 *
 * @apiParam {Number} id Chicken's unique ID.
 *
 * @apiSuccess {Number} id Chicken ID.
 * @apiSuccess {String} breed Breed of the chicken.
 * @apiSuccess {Number} age Age of the chicken in years.
 * @apiSuccess {String} health_status Health status of the chicken.
 * @apiSuccess {Number} egg_production_rate Egg production rate.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "breed": "Leghorn",
 *       "age": 2,
 *       "health_status": "Healthy",
 *       "egg_production_rate": 0.95
 *     }
 *
 * @apiError ChickenNotFound The id of the Chicken was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "ChickenNotFound"
 *     }
 */
router.get('/:id', chickenController.getChickenById);

/**
 * @api {post} /chickens Add New Chicken
 * @apiVersion 1.0.0
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
 * @api {put} /chickens/:id Update Chicken Details
 * @apiVersion 1.0.0
 * @apiName UpdateChicken
 * @apiGroup Chickens
 *
 * @apiParam {Number} id Chicken's unique ID.
 * @apiParam {String} [breed] Breed of the chicken.
 * @apiParam {Number} [age] Age of the chicken in years.
 * @apiParam {String} [health_status] Health status of the chicken.
 * @apiParam {Number} [egg_production_rate] Egg production rate.
 *
 * @apiSuccess {Number} id Chicken ID.
 * @apiSuccess {String} breed Breed of the chicken.
 * @apiSuccess {Number} age Age of the chicken.
 * @apiSuccess {String} health_status Health status of the chicken.
 * @apiSuccess {Number} egg_production_rate Egg production rate.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "breed": "Leghorn",
 *       "age": 3,
 *       "health_status": "Sick",
 *       "egg_production_rate": 0.5
 *     }
 *
 * @apiError ChickenNotFound The id of the Chicken was not found.
 * @apiError ValidationError Invalid input parameters.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "ChickenNotFound"
 *     }
 *
 * @apiErrorExample Validation-Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Invalid age field"
 *     }
 */
router.put('/:id', validateChicken, chickenController.updateChicken);

/**
 * @api {delete} /chickens/:id Delete Chicken
 * @apiVersion 1.0.0
 * @apiName DeleteChicken
 * @apiGroup Chickens
 *
 * @apiParam {Number} id Chicken's unique ID.
 *
 * @apiSuccess {String} message Success message letting you know deletion worked.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Chicken successfully deleted"
 *     }
 *
 * @apiError ChickenNotFound The id of the Chicken was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "ChickenNotFound"
 *     }
 */
router.delete('/:id', chickenController.deleteChicken);

module.exports = router;
