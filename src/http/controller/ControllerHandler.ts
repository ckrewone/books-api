import {Request, Response} from 'express';
import {injectable} from 'inversify';
import {IControllerHandler} from './IControllerHandler';

@injectable()
export class ControllerHandler implements IControllerHandler {
    public getMethod(controller: any, method: string): (req: Request, res: Response) => any {
        return (req: Request, res: Response) => {
            controller[method](req, res);
        };
    }

}
