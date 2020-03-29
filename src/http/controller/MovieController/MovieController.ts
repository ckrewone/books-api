import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import API_TYPES from '../../../ApiTypes';
import { Movie } from '../../../model/Movie';
import { IMovieService } from '../../../service/movie/IMovieService';

@injectable()
export class MovieController {
    protected test: IMovieService;
    constructor(
        @inject(API_TYPES.MovieService) private movieService: IMovieService,
    ) {
        console.log('movieService');
        console.log(movieService)
        this.test = movieService;
    }

    public delete(req: Request, res: Response) {
    }

    public getRandom(req: Request, res: Response) {
    }

    public upsert(req: Request, res: Response) {
    }

    public async get(req: Request, res: Response) {
        const movies: Movie[] = await this.movieService.getMovies(req.query.id);
        this.sendSuccessResponse(res, movies);
    }

    public sendSuccessResponse(res: Response, data: Record<string, any>): any {
        res.status(200).send(data);
    }

    public sendErrorResponse(res: Response, message: string|Record<string, any>, code: number) {
        res.status(code).send(message);
    }
}
