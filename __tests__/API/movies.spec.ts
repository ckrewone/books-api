import 'jest';
import 'reflect-metadata';
import * as request from 'supertest';


describe('movies', () => {
    it('get /movie', (done) => {
        request('localhost:8080').get('/movie?id=1')
            .set('Accept', 'application/json')
            .set('Content-type', 'application/json')
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.length).toBe(1);
                expect(res.body[0].id).toBe(1);
            });
    })
});
