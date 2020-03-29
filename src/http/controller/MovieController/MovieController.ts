import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { API_TYPES } from '../../../Bootstrap';
import { IMovieService } from '../../../service/IMovieService';
import { AbstractController } from '../AbstractController';
import { IMovieController } from './IMovieController';

@injectable()
export class MovieController extends AbstractController implements IMovieController {
    constructor(
        @inject(API_TYPES.MovieService) private movieService: IMovieService,
    ) {
        super();
    }

    public delete(req: Request, res: Response) {
    }

    public getRandom(req: Request, res: Response) {
    }

    public upsert(req: Request, res: Response) {
    }

    public get(req: Request, res: Response) {

    }
}
