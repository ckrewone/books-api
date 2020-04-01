import 'jest';
import * as httpMocks from 'node-mocks-http';
import 'reflect-metadata';
import {IMovieController} from "../../../../src/http/controller/MovieController/IMovieController";
import {MovieController} from "../../../../src/http/controller/MovieController/MovieController";
import {IMovieService} from "../../../../src/service/movie/IMovieService";
import {IMovieValidator} from "../../../../src/service/validator/IMovieValidator";

describe('MovieController', () => {
    let movieValidator: IMovieValidator;
    let movieService: IMovieService;
    let controller: IMovieController;

    beforeEach(() => {
        movieValidator = jest.fn() as any;
        movieService = jest.fn() as any;
        controller = new MovieController(movieService, movieValidator);

    });
    describe('get', () => {
        it('should get movie with valid id', async () => {
            const id = 1;
            const req = httpMocks.createRequest({
                query: {
                    id,
                },
            });
            const res = httpMocks.createResponse();

            movieService.getMovies = async () => ([{ id } as any]);

            await controller.get(req, res);
            expect(res.statusCode).toBe(200);
            expect(res._getData()[0].id).toBe(id);
        });

        it('should return error if movies not found', async () => {
            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();

            movieService.getMovies = async () => undefined;

            await controller.get(req, res);
            expect(res.statusCode).toBe(400);
        });
    });

    describe('create', () => {
        it('should create a movie', async () => {
            const req = httpMocks.createRequest({ body: {}});
            const res = httpMocks.createResponse();

            movieService.createMovie = async () => undefined;
            movieValidator.validate = async () => true;

            await controller.create(req, res);
            expect(res.statusCode).toBe(200);
            expect(res._getData()).toBeDefined();
        });

        it('should return error response if service throw Error', async () => {
            const req = httpMocks.createRequest({ body: {}});
            const res = httpMocks.createResponse();

            movieService.createMovie = async () => { throw new Error(); };
            movieValidator.validate = async () => true;

            await controller.create(req, res);
            expect(res.statusCode).toBe(500);
            expect(res._getData().message).toBe('Something goes wrong');
        });
    });

    describe('update', () => {
        it('should update a movie', async () => {
            const req = httpMocks.createRequest({ body: {}});
            const res = httpMocks.createResponse();

            movieService.updateMovie = async () => undefined;
            movieValidator.validate = async () => true;

            await controller.update(req, res);
            expect(res.statusCode).toBe(200);
            expect(res._getData()).toBeDefined();
        });

        it('should return error response if service throw Error', async () => {
            const req = httpMocks.createRequest({ body: {}});
            const res = httpMocks.createResponse();

            movieService.updateMovie = async () => { throw new Error(); };
            movieValidator.validate = async () => true;

            await controller.update(req, res);
            expect(res.statusCode).toBe(500);
            expect(res._getData().message).toBe('Something goes wrong');
        });
    });

    describe('delete', () => {
        it('should delete a movie', async () => {
            const req = httpMocks.createRequest({ body: {}});
            const res = httpMocks.createResponse();

            movieService.deleteMovie = async () => undefined;
            movieValidator.validate = async () => true;

            await controller.delete(req, res);
            expect(res.statusCode).toBe(200);
            expect(res._getData().success).toBeTruthy();
        });

        it('should return error response if service throw Error', async () => {
            const req = httpMocks.createRequest({ body: {}});
            const res = httpMocks.createResponse();

            movieService.deleteMovie = async () => { throw new Error(); };
            movieValidator.validate = async () => true;

            await controller.delete(req, res);
            expect(res.statusCode).toBe(500);
            expect(res._getData().message).toBe('Something goes wrong');
        });
    });

    describe('getRandom', () => {
        it('should get random movie', async () => {
            const req = httpMocks.createRequest({ body: {}});
            const res = httpMocks.createResponse();

            const mock = { test: 123 };
            movieService.getRandom = async () => mock as any;
            movieValidator.validate = async () => true;

            await controller.getRandom(req, res);
            expect(res.statusCode).toBe(200);
            expect(res._getData().movies).toBe(mock);
        });

        it('should throw error with invalid genres', async () => {
            const req = httpMocks.createRequest({ body: {
                    genres: 'invalid',
                }});
            const res = httpMocks.createResponse();

            const mock = { test: 123 };
            movieService.getRandom = async () => mock as any;
            movieValidator.validate = async () => true;

            await controller.getRandom(req, res);
            expect(res.statusCode).toBe(400);
            expect(res._getData().message).toBeDefined();
        });
        it('should throw error with invalid duration', async () => {
            const req = httpMocks.createRequest({ body: {
                    duration: 'invalid',
                }});
            const res = httpMocks.createResponse();

            const mock = { test: 123 };
            movieService.getRandom = async () => mock as any;
            movieValidator.validate = async () => true;

            await controller.getRandom(req, res);
            expect(res.statusCode).toBe(400);
            expect(res._getData().message).toBeDefined();
        });
        it('should return error response if service throw Error', async () => {
            const req = httpMocks.createRequest({ body: {}});
            const res = httpMocks.createResponse();

            movieService.getRandom = async () => { throw new Error(); };
            movieValidator.validate = async () => true;

            await controller.getRandom(req, res);
            expect(res.statusCode).toBe(500);
            expect(res._getData().message).toBe('Something goes wrong');
        });
    });
});
