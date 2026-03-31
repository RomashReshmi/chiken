const request = require('supertest');
const app = require('../app');
const db = require('../database/database');

describe('Chicken API', () => {
    let testChickenId;

    // A simple test to GET all chickens
    it('should get all chickens', async () => {
        const res = await request(app).get('/chickens');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    // Test POST to create a new chicken
    it('should create a new chicken', async () => {
        const res = await request(app)
            .post('/chickens')
            .send({
                breed: 'TestBreed',
                age: 12,
                health_status: 'Healthy',
                egg_production_rate: 6
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        testChickenId = res.body.id;
    });

    // Test GET by ID
    it('should get a chicken by id', async () => {
        const res = await request(app).get(`/chickens/${testChickenId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.breed).toEqual('TestBreed');
    });

    // Test PUT to update chicken
    it('should update the chicken', async () => {
        const res = await request(app)
            .put(`/chickens/${testChickenId}`)
            .send({
                breed: 'UpdatedBreed',
                age: 13,
                health_status: 'Sick',
                egg_production_rate: 0
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Chicken updated successfully');
    });

    // Test DELETE chicken
    it('should delete the chicken', async () => {
        const res = await request(app).delete(`/chickens/${testChickenId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Chicken deleted successfully');
    });

    // Test 404 Route
    it('should return 404 for unknown route', async () => {
        const res = await request(app).get('/unknown-endpoint');
        expect(res.statusCode).toEqual(404);
        expect(res.body.error).toEqual('Endpoint Not Found');
    });

    afterAll((done) => {
        db.close(done);
    });
});
