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
