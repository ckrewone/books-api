import { Request, Response} from 'express';

export interface IMovieController {
    update(req: Request, res: Response): any;
    create(req: Request, res: Response): any;
    get(req: Request, res: Response): any;
    delete(req: Request, res: Response): any;
    getRandom(req: Request, res: Response): any;
}
