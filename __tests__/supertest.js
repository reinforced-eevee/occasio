const supertest = require('supertest');
const app = require('../server/server.js');
const mongoose = require('mongoose');

const mockUserID = process.env.MOCK_USER_ID;

beforeAll(async () => {
    console.log(process.env.TEST_MONGO_URI);
    await mongoose.connect(process.env.TEST_MONGO_URI);
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe('Route integration', () => {
    describe('/', () => {
        describe('GET', () => {
            it('responds with 200 status', async () => {
                const response = await supertest(app)
                    .get('/')
                    .expect(200);
            })
        })
    })

    describe('/events', () => {
        describe('GET', () => {
            it('responds with 200 status and returns an array', async () => {
                const response = await supertest(app)
                    .get('/events')
                    .set('Cookie', `ssid=${mockUserID}`)
                    .expect(200);

                expect(Array.isArray(response.body)).toBe(true);
            })
        })

        describe('POST', () => {
            it(`responds with 200 status, and returns an eventID, which is a non-empty string. The user's event count increases by 1.`, async () => {
                const eventData = {
                    name: "Annual Gala",
                    date: "2023-10-05",
                    type: "Corporate",
                    guest_size: 150,
                    age_range: "Adults",
                    location: "Downtown Conference Center",
                    theme: "Futuristic",
                    formality: "Formal",
                    budget: "$$$"
                };

                let response = await supertest(app)
                    .get(('/events'))
                    .set('Cookie', `ssid=${mockUserID}`);
                const initialEventsCount = response.body.length;

                response = await supertest(app)
                    .post('/events')
                    .set('Cookie', `ssid=${mockUserID}`)
                    .send(eventData)
                    .expect(200);

                expect(response.body).toBeDefined();
                expect(typeof response.body).toBe('string');
                expect(response.body.length).toBeGreaterThan(0);

                response = await supertest(app)
                    .get(('/events'))
                    .set('Cookie', `ssid=${mockUserID}`);
                const updatedEventsCount = response.body.length;
                expect(updatedEventsCount).toBe(initialEventsCount + 1);
            })
        })
    })
}) 
