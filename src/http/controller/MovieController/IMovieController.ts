import { Request, Response} from 'express';

export interface IMovieController {
    create(req: Request, res: Response): any;
    getRandom(req: Request, res: Response): any;
}
