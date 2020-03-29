import { inject, injectable } from 'inversify';
import { API_TYPES } from '../Bootstrap';
import { IMovie } from '../repository/MovieRepository/IMovie';
import { IMovieRepository } from '../repository/MovieRepository/IMovieRepository';
import { IMovieDataAccessOperations } from './dao/IMovieDataAccessOperations';
import { IMovieService } from './IMovieService';

@injectable()
export class MovieService implements IMovieService {
    constructor(
        @inject(API_TYPES.MovieDao) private movieDao: IMovieDataAccessOperations,
        @inject(API_TYPES.MovieRepository) private movieRepository: IMovieRepository,
    ) {
    }

    public async upsertMovie(movie: IMovie): Promise<string> {
        if (movie.id) {
            const film: IMovie = await this.movieRepository.getById(movie.id);
            return '';

        }
    }

}
