import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import API_TYPES from '../../../ApiTypes';
import { Movie } from '../../../model/Movie';
import { IMovieService } from '../../../service/movie/IMovieService';
import { AbstractController } from '../AbstractController';
import { IMovieController } from './IMovieController';

@injectable()
export class MovieController extends AbstractController implements IMovieController{
    constructor(
        @inject(API_TYPES.MovieService) private movieService: IMovieService,
    ) {
        super();
    }

    public delete(req: Request, res: Response) {
    }

    public getRandom(req: Request, res: Response) {
    }

    public update(req: Request, res: Response) {
    }

    public async create(req: Request, res: Response) {
        const id = await this.movieService.upsertMovie()
    }

    public async get(req: Request, res: Response) {
        const movies: Movie[] = await this.movieService.getMovies(req.query.id);
        if(movies && movies.length) {
            this.sendSuccessResponse(res, movies);
        } else {
            this.sendErrorResponse(res, 'Movie/s not found', 404);
        }
    }
}
