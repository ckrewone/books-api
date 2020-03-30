import { Movie } from '../../model/Movie';
import { IMovie } from '../../repository/MovieRepository/IMovie';

export interface IMovieService {
    createMovie(movie: IMovie): Promise<number>;
    updateMovie(movie: IMovie): Promise<number>;
    deleteMovie(id: number): Promise<boolean>;
    getRandom(genres: string[], duration: number): Promise<Movie[]>;
    getMovies(id: number): Promise<Movie[]>;
}
