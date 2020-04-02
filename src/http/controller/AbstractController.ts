import {Response} from 'express';
import {inject, injectable} from 'inversify';
import API_TYPES from "../../ApiTypes";
import {IMovieValidator} from "../../service/validator/IMovieValidator";

@injectable()
export class AbstractController {
    constructor(@inject(API_TYPES.MovieValidator) protected movieValidator: IMovieValidator) {
    }

    public sendSuccessResponse(res: Response, data: Record<string, any>): any {
        res.status(200).send(data);
    }

    public sendErrorResponse(res: Response, message: string | Record<string, any>, code: number) {
        res.status(code).send({message});
    }
}
