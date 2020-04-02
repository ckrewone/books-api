import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import API_TYPES from '../../../ApiTypes';
import {NotFoundError} from "../../../common/errors/NotFoundError";
import {IMovie} from "../../../repository/MovieRepository/IMovie";
import {IMovieService} from '../../../service/movie/IMovieService';
import {IMovieValidator} from "../../../service/validator/IMovieValidator";
import {AbstractController} from '../AbstractController';
import {IMovieController} from './IMovieController';

@injectable()
export class MovieController extends AbstractController implements IMovieController {
    constructor(
        @inject(API_TYPES.MovieService) private movieService: IMovieService,
        @inject(API_TYPES.MovieValidator) protected movieValidator: IMovieValidator,
    ) {
        super(movieValidator);
    }

    public async getRandom(req: Request, res: Response) {
        if (req.body?.genres && (!Array.isArray(req.body.genres) || typeof req.body.genres[0] !== 'string')) {
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
            const message = code === 400 ? e.message : 'Something goes wrong';
            this.sendErrorResponse(res, message, code);
        }
    }

    public async create(req: Request, res: Response) {
        if (!await this.movieValidate(res, req.body)) {
            return;
        }
        try {
            const id = await this.movieService.createMovie(req.body);
            this.sendSuccessResponse(res, {id});
        } catch (e) {
            console.log('Create movie failed. Error: ' + e.message);
            const code = e.constructor === NotFoundError ? 400 : 500;
            const message = code === 400 ? e.message : 'Something goes wrong';
            this.sendErrorResponse(res, message, code);
        }
    }

    private async movieValidate(res: Response, movie: IMovie): Promise<boolean> {
        try {
            await this.movieValidator.validate(movie);
            return true;
        } catch (e) {
            this.sendErrorResponse(res, e.errors, 400);
            return false;
        }
    }
}
