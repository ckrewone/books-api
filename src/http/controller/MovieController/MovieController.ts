import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import API_TYPES from '../../../ApiTypes';
import { Movie } from '../../../model/Movie';
import { IMovieService } from '../../../service/movie/IMovieService';
import { AbstractController } from '../AbstractController';
import { IMovieController } from './IMovieController';

@injectable()
export class MovieController extends AbstractController implements IMovieController {
    constructor(
        @inject(API_TYPES.MovieService) private movieService: IMovieService,
    ) {
        super();
    }

    public async delete(req: Request, res: Response) {
        try {
            await this.movieService.deleteMovie(req.body.id);
            this.sendSuccessResponse(res, {success: true});
        } catch (e) {
            console.log('Deleting movie failed. Error: ' +  e);
            this.sendErrorResponse(res, e, 400);
        }
    }

    public async getRandom(req: Request, res: Response) {
        try {
            const randoms = await this.movieService.getRandom(req.body.genres, req.body.duration);
            this.sendSuccessResponse(res,  {movies: randoms});
        } catch (e) {
            console.log('Unable to get random movie/s. Error: ' + e );
            this.sendErrorResponse(res, e, 400);
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const movie = await this.movieService.updateMovie(req.body);
            this.sendSuccessResponse(res, movie);
        } catch (e) {
            this.sendErrorResponse(res, e, 400);
        }
    }

    public async create(req: Request, res: Response) {
        try {
            const id = await this.movieService.createMovie(req.body);
            this.sendSuccessResponse(res, { id });
        } catch (e) {
            console.log('Creating movie failed. Error: ' + e);
            this.sendErrorResponse(res, e.errors, 400);
        }
    }

    public async get(req: Request, res: Response) {
        const movies: Movie[] = await this.movieService.getMovies(req.query.id);
        if (movies && movies.length) {
            this.sendSuccessResponse(res, movies);
        } else {
            console.log(`Movie with id: ${req.query.id} failed`);
            this.sendErrorResponse(res, 'Movie/s not found', 404);
        }
    }
}
