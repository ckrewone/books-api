import { injectable } from 'inversify';
import { IControllerHandler } from './IControllerHandler';
import { Response, Request } from 'express';

@injectable()
export class ControllerHandler implements IControllerHandler {
    getMethod(controller: any, method: string): (req: Request, res: Response) => any {
        return (req1: Request, res1: Response) => {
            controller[method](req1, res1);
        };
    }

}
