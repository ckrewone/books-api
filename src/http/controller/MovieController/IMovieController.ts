import { Request, Response} from 'express';

export interface IMovieController {
    upsert(req: Request, res: Response): any;
    get(req: Request, res: Response): any;
    delete(req: Request, res: Response): any;
    getRandom(req: Request, res: Response): any;
}
