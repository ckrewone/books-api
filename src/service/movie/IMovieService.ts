import { Movie } from '../../model/Movie';
import { IMovie } from '../../repository/MovieRepository/IMovie';

export interface IMovieService {
    upsertMovie(movie: IMovie): Promise<string>;
    getMovies(id:string) : Promise<Movie[]>
}
