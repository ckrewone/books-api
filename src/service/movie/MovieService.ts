import { inject, injectable } from 'inversify';
import * as union from 'lodash.union';
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

    public async createMovie(movie: IMovie): Promise<number> {
        if (movie.id) {
            const repoMovie: Movie = await this.movieRepository.getById(movie.id);
            if (repoMovie) {
                throw new Error(`Movie with id ${movie.id} arleady exist`);
            }
        }
        const newMovie = new Movie(movie);
        try {
            await this.movieDao.add(newMovie);
            return newMovie.id;
        } catch (e) {
            throw new Error(e.errors);
        }
    }

    public async updateMovie(movie: IMovie): Promise<number> {
        const repoMovie: Movie = await this.movieRepository.getById(movie.id);
        if (!repoMovie) {
            throw new Error('Updating movie failed. Movie not found');
        }
        const newMovie = new Movie(movie);
        await this.movieDao.update(newMovie);
        return newMovie.id;
    }

    public async getMovies(id: number): Promise<Movie[]> {
        if (id) {
            const movie = this.movieRepository.getById(id);
            if (movie) {
                return [ this.movieRepository.getById(id) ];
            }
        } else {
            return this.movieRepository.getAll();
        }
    }

    public async deleteMovie(id: number): Promise<boolean> {
        const repoMovie: Movie = await this.movieRepository.getById(id);
        if (!repoMovie) {
            throw new Error('Updating movie failed. Movie not found');
        }
        return await this.movieDao.delete(repoMovie);
    }

    public async getRandom(genres: string[], duration: number): Promise<Movie[]> {
            if (genres && genres.length) {
                const randomByGenres = await this.getRamdonByGenres(genres);
                if (duration) {
                    return await this.getFilteredByDuration(randomByGenres, duration);
                }
            }
            if (duration) {
                return [await this.movieRepository.getOneByDuration(duration)];
            }
            return [await this.movieRepository.getOneRandom()];
    }


    private async getRamdonByGenres(genres: string[]): Promise<Movie[]> {
        const repoMovies = await this.movieRepository.getAll();
        const scoredIndexes = {};
        repoMovies.forEach((movie, index) => {
            const uniqeGenres = union(movie.genres, genres);
            if (uniqeGenres.length < genres.length + movie.genres.length) {
                scoredIndexes[index] = uniqeGenres.length - genres.length;
            }
        });
        const result =  (Object.keys(scoredIndexes).reduce((prev, curr) => {
            if (!prev[scoredIndexes[curr]]) { prev[scoredIndexes[curr]] = []; }
            prev[scoredIndexes[curr]].push(repoMovies[curr]);
            return prev;
        }, []) as any);
        return [].concat(...result);
    }

    private async getFilteredByDuration(movies: Movie[], duration: number): Promise<Movie[]> {
        return movies.reduce((prev, curr) => {
            if (curr.runtime > duration - 10 && curr.runtime < duration + 10) {
                prev.push(curr);
            }
            return prev;
        }, []);
    }

}
