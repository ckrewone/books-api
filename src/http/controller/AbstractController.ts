import {Response} from 'express';
import { injectable } from 'inversify';

@injectable()
export class AbstractController {
    public sendSuccessResponse(res: Response, data: Record<string, any>): any {
        res.status(200).send(data);
    }

    public sendErrorResponse(res: Response, message: string|Record<string, any>, code: number) {
        res.status(code).send(message);
    }
}
