import { inject, injectable } from 'inversify';
import API_TYPES from '../../ApiTypes';
import { Movie } from '../../model/Movie';
import { IMovie } from '../../repository/MovieRepository/IMovie';
import { IMovieRepository } from '../../repository/MovieRepository/IMovieRepository';
import { IMovieDataAccessOperations } from '../dao/IMovieDataAccessOperations';
import { IMovieService } from './IMovieService';

@injectable()
export class MovieService implements IMovieService {
    constructor(
        @inject(API_TYPES.MovieDao) private movieDao: IMovieDataAccessOperations,
        @inject(API_TYPES.MovieRepository) private movieRepository: IMovieRepository,
    ) {
    }

    public async createMovie(movie: Movie): Promise<string> {
        if (movie.id) {
            const repoMovie: IMovie = await this.movieRepository.getById(movie.id);
            if(repoMovie) {
                throw new Error(`Movie with id ${movie.id} arleady exist`);
            }
        }
        const newMovie = new Movie(movie);
        try{
            await newMovie.isValid();
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }

    }

    public async updateMovie(movie: Movie): Promise<string> {
        return '';
    }

    public async getMovies(id:string) : Promise<Movie[]> {
        if(id){
            const movie = this.movieRepository.getById(id);
            if(movie) {
                return [ this.movieRepository.getById(id) ];
            }
        } else {
            return this.movieRepository.getAll();
        }
    }

}
