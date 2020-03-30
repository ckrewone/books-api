import { Movie } from '../../model/Movie';
import { IMovie } from '../../repository/MovieRepository/IMovie';

export interface IMovieService {
    createMovie(movie: IMovie): Promise<string>;
    updateMovie(movie: IMovie): Promise<string>;
    getMovies(id:string) : Promise<Movie[]>
}
