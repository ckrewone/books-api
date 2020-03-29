import { IMovie } from '../repository/MovieRepository/IMovie';

export interface IMovieService {
    upsertMovie(movie: IMovie): Promise<string>;
}
