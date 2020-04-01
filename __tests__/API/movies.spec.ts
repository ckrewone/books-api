import 'jest';
import 'reflect-metadata';
import * as request from 'supertest';


describe('movies', () => {
    const API_HOST = 'localhost:8081';

    describe('create', () => {
        it('should create /movie', (done) => {
            const validBody = {
                title: 'title',
                year: 2020,
                runtime: 120,
                director: 'Tester Test',
                actors: '',
                plot: '',
                posterUrl: '',
                genres: [
                    'Action',
                ],
            };

            request(API_HOST).post('/movie')
                .set('Accept', 'application/json')
                .set('Content-type', 'application/json')
                .send(validBody)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(res.body.id).toBeDefined();
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
                genres: [
                    'Action',
                ],
            };

            request(API_HOST).post('/movie')
                .set('Accept', 'application/json')
                .set('Content-type', 'application/json')
                .send(validBody)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(res.status).toBe(400);
                    expect(res.body).toBeDefined();
                    done();
                });
        });
    });

    describe('getRandom', () => {
        it('should get random by duration', (done) => {
            const duration = 100;
            request(API_HOST).post('/movie/random')
                .set('Accept', 'application/json')
                .set('Content-type', 'application/json')
                .send({
                    duration,
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(res.status).toBe(200);
                    expect(res.body.movies.length).toBe(1);
                    expect(res.body.movies[0].runtime > duration - 10 && res.body.movies[0].runtime < duration + 10).toBeTruthy();
                    done();
                });
        });
        it('should get random by duration and genres', (done) => {
            const body = {
                duration: 150,
                genres: [
                    "Action",
                    "Fantasy",
                ],
            };
            request(API_HOST).post('/movie/random')
                .set('Accept', 'application/json')
                .set('Content-type', 'application/json')
                .send(body)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(res.status).toBe(200);
                    expect(res.body.movies.length).toBe(2);
                    expect(res.body.movies[0].genres[0]).toBe(body.genres[0]);
                    expect(res.body.movies[0].genres[1]).toBe(body.genres[1]);
                    expect(res.body.movies[1].genres[0]).not.toBe(body.genres[1]);
                    expect(res.body.movies[1].genres[1]).toBe(body.genres[1]);
                    done();
                });
        });

    });

});
