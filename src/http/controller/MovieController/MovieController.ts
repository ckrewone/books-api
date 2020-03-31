import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import API_TYPES from '../../../ApiTypes';
import {Movie} from '../../../model/Movie';
import {IMovieService} from '../../../service/movie/IMovieService';
import {IMovieValidator} from "../../../service/validator/IMovieValidator";
import {AbstractController} from '../AbstractController';
import {IMovieController} from './IMovieController';
import {NotFoundError} from "../../../common/errors/NotFoundError";

@injectable()
export class MovieController extends AbstractController implements IMovieController {
    constructor(
        @inject(API_TYPES.MovieService) private movieService: IMovieService,
        @inject(API_TYPES.MovieValidator) protected movieValidator: IMovieValidator,
    ) {
        super(movieValidator);
    }

    public async delete(req: Request, res: Response) {
        if (!(req.body.id && typeof req.body.id === 'number')) {
            this.sendErrorResponse(res, 'Invalid id', 400);
        }
        try {
            await this.movieService.deleteMovie(req.body.id);
            this.sendSuccessResponse(res, {success: true});
        } catch (e) {
            console.log('Deleting movie failed. Error: ' + e.message);
            const code = e.constructor === NotFoundError ? 400 : 500;
            this.sendErrorResponse(res, e.message, code);
        }
    }

    public async getRandom(req: Request, res: Response) {
        if (req.body?.genres && ( !Array.isArray(req.body.genres) || typeof req.body.genres[0] !== 'string' )) {
            this.sendErrorResponse(res, 'Invalid geners type. Required array of string', 400);
            return;
        }
        if (req.body?.duration && typeof req.body.duration !== "number") {
            this.sendErrorResponse(res, 'Invalid duration type. Required number', 400);
            return;
        }
        try {
            const randoms = await this.movieService.getRandom(req.body?.genres, req.body?.duration);
            this.sendSuccessResponse(res, {movies: randoms});
        } catch (e) {
            console.log('Unable to get random movie/s. Error: ' + e.message);
            const code = e.constructor === NotFoundError ? 400 : 500;
            this.sendErrorResponse(res, e.message, code);
        }
    }

    public async update(req: Request, res: Response) {
        if (!await this.movieValidate(res, req.body)) { return; }
        try {
            const movie = await this.movieService.updateMovie(req.body);
            this.sendSuccessResponse(res, movie);
        } catch (e) {
            console.log('Update movie failed. Error: ' + e.message);
            const code = e.constructor === NotFoundError ? 400 : 500;
            this.sendErrorResponse(res, e.message, code);
        }
    }

    public async create(req: Request, res: Response) {
        if (!await this.movieValidate(res, req.body)) { return; }
        try {
            const id = await this.movieService.createMovie(req.body);
            this.sendSuccessResponse(res, {id});
        } catch (e) {
            console.log('Create movie failed. Error: ' + e.message);
            const code = e.constructor === NotFoundError ? 400 : 500;
            this.sendErrorResponse(res, e.message, code);
        }
    }

    public async get(req: Request, res: Response) {
        const movies: Movie[] = await this.movieService.getMovies(req.query.id);
        if (movies && movies.length) {
            this.sendSuccessResponse(res, movies);
        } else {
            console.log(`Movie with id: ${req.query.id} not found`);
            this.sendErrorResponse(res, 'Movie/s not found', 400);
        }
    }
}
