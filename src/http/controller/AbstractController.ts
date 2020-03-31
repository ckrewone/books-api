import {Response} from 'express';
import {inject, injectable} from 'inversify';
import API_TYPES from "../../ApiTypes";
import {IMovie} from "../../repository/MovieRepository/IMovie";
import {IMovieValidator} from "../../service/validator/IMovieValidator";

@injectable()
export class AbstractController {
    constructor(@inject(API_TYPES.MovieValidator) protected movieValidator: IMovieValidator) {
    }

    public sendSuccessResponse(res: Response, data: Record<string, any>): any {
        res.status(200).send(data);
    }

    public sendErrorResponse(res: Response, message: string|Record<string, any>, code: number) {
        res.status(code).send({ message });
    }

    public async movieValidate(res: Response, movie: IMovie) : Promise<boolean> {
        try {
            await this.movieValidator.validate(movie);
            return true;
        } catch (e) {
            this.sendErrorResponse(res, e.errors, 400);
            return false;
        }
    }
}
