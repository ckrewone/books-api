import 'jest';
import 'reflect-metadata';
import * as request from 'supertest';


describe('movies', () => {
    describe('get', () => {
        it('should get /movie by id', (done) => {
            request('localhost:8081').get('/movie?id=1')
                .set('Accept', 'application/json')
                .set('Content-type', 'application/json')
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.length).toBe(1);
                    expect(res.body[0].id).toBe(1);
                    done();
                });
        });

        it('should not get /movie by invalid id and return 404', (done) => {
            request('localhost:8081').get('/movie?id=invalid')
                .set('Accept', 'application/json')
                .set('Content-type', 'application/json')
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.status).toBe(404);
                    expect(res.body.message).toBeDefined();
                    done();
                });
        });
    });

    describe('create', () => {
        it('should create /movie', (done) => {
            const validBody = {
                id: 12345,
                title: 'title',
                year: 2020,
                runtime: 120,
                director: 'Tester Test',
                actors: '',
                plot: '',
                posterUrl: '',
                geners: [
                    'Action',
                ],
            };

            request('localhost:8081').post('/movie')
                .set('Accept', 'application/json')
                .set('Content-type', 'application/json')
                .send(validBody)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(res.body.id).toBe(validBody.id);
                    done();
                });
        });

        it('should not create /movie with invalid data', (done) => {
            const validBody = {
                id: 12345,
                title: 'title',
                year: 'invaliYearType',
                runtime: 120,
                director: 'Tester Test',
                actors: '',
                plot: '',
                posterUrl: '',
                geners: [
                    'Action',
                ],
            };

            request('localhost:8081').post('/movie')
                .set('Accept', 'application/json')
                .set('Content-type', 'application/json')
                .send(validBody)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    console.log(res.status);
                    expect(res.status).toBe(400);
                    done();
                });
        });
    });

});
