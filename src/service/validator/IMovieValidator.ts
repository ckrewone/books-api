import {Movie} from "../../model/Movie";

export interface IMovieValidator {
    validate(movie: Movie): Promise<boolean>;
}
