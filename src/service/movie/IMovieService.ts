import { Movie } from '../../model/Movie';
import { IMovie } from '../../repository/MovieRepository/IMovie';

export interface IMovieService {
    createMovie(movie: IMovie): Promise<number>;
    getRandom(genres: string[], duration: number): Promise<Movie[]>;
}
