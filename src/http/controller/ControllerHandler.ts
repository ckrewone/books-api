import { injectable } from 'inversify';
import { IControllerHandler } from './IControllerHandler';
import { Response, Request } from 'express';

@injectable()
export class ControllerHandler implements IControllerHandler {
    getMethod(controller: any, method: string): (req: Request, res: Response) => any {
        return (req: Request, res: Response) => {
            controller[method](req, res);
        };
    }

}
