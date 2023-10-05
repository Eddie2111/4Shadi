const supertest = require('supertest');
const app = require('./index');

describe('Test the root path', () => {
    test('It should response the GET method', () => {
        return supertest(app).get('/').then((response) => {
            expect(response.body).toBe({'message': 'hello'});
            expect(response.statusCode).toBe(200);
        });
    });
},
);
describe('Test the root path', () => {
    test('It should response the POST method', () => {
        return supertest(app).post('/').then((response) => {
            expect(response.statusCode).toBe(200);
        });
    });
},
);
