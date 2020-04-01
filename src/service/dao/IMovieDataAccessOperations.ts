import {Movie} from "../../model/Movie";

export interface IMovieDataAccessOperations {
    add(data: Movie): Promise<boolean>;
}
