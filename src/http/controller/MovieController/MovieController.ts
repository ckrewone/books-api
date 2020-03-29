import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { IMovieService } from '../../../service/IMovieService';
import { AbstractController } from '../AbstractController';
import { IMovieController } from './IMovieController';

@injectable()
export class MovieController extends AbstractController implements IMovieController {
    constructor() {
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
