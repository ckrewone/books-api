import { Request, Response } from 'express';

export interface IControllerHandler {
    getMethod(controller: any, method: string): (req: Request, res: Response ) => any;
}
