import 'jest';
import 'reflect-metadata';
import * as request from 'supertest';


describe('movies', () => {
    const API_ULR = 'localhost:8081';
    describe('get', () => {
        it('should get /movie by id', (done) => {
            request(API_ULR).get('/movie?id=2')
                .set('Accept', 'application/json')
                .set('Content-type', 'application/json')
                .end((err, res) => {
                    if (err) { return done(err); }
                    expect(res.body.length).toBe(1);
                    expect(res.body[0].id).toBe(2);
                    done();
                });
        });

        it('should not get /movie by invalid id and return 400', (done) => {
            request(API_ULR).get('/movie?id=invalid')
                .set('Accept', 'application/json')
                .set('Content-type', 'application/json')
                .end((err, res) => {
                    if (err) { return done(err); }
                    expect(res.status).toBe(400);
                    expect(res.body.message).toBeDefined();
                    done();
                });
        });
    });

    describe('create/delete', () => {
        it('should create and delete /movie', (done) => {
            const validBody = {
                id: 12345,
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

            request(API_ULR).post('/movie')
                .set('Accept', 'application/json')
                .set('Content-type', 'application/json')
                .send(validBody)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(res.body.id).toBe(validBody.id);
                    request(API_ULR).delete('/movie')
                        .set('Accept', 'application/json')
                        .set('Content-type', 'application/json')
                        .send({ id: validBody.id })
                        .end((err1, res1) => {
                            expect(res1.status).toBe(200);
                            expect(res1.body.success).toBeTruthy();
                            done();
                        });
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

            request(API_ULR).post('/movie')
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

    describe('update', () => {

        it('should update /movie', (done) => {
            const randomRuntime = Math.floor(Math.random() * 100);
            const validBody = {
                id: 2,
                title: 'title',
                year: 1911,
                runtime: randomRuntime,
                director: 'Tester Test',
                actors: '',
                plot: '',
                posterUrl: '',
                genres: [
                    'Action',
                ],
            };
            request(API_ULR).patch('/movie')
                .set('Accept', 'application/json')
                .set('Content-type', 'application/json')
                .send(validBody)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(res.status).toBe(200);
                    expect(res.body.runtime).toBe(randomRuntime);
                    done();
                });
        });

        it('should not update /movie with invalid data', (done) => {
            const validBody = {
                id: 1,
                runtime: true,
            };
            request(API_ULR).patch('/movie')
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
            request(API_ULR).post('/movie/random')
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
            request(API_ULR).post('/movie/random')
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
