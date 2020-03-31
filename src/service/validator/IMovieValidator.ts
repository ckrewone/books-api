import {IMovie} from "../../repository/MovieRepository/IMovie";

export interface IMovieValidator {
    validate(movie: IMovie): Promise<boolean>;
}
