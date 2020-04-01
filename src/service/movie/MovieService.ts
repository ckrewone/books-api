import {inject, injectable} from 'inversify';
import * as union from 'lodash.union';
import API_TYPES from '../../ApiTypes';
import {NotFoundError} from "../../common/errors/NotFoundError";
import {Movie} from '../../model/Movie';
import {IMovie} from '../../repository/MovieRepository/IMovie';
import {IMovieRepository} from '../../repository/MovieRepository/IMovieRepository';
import {IMovieDataAccessOperations} from '../dao/IMovieDataAccessOperations';
import {IMovieService} from './IMovieService';

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
                throw new NotFoundError(`Movie with id ${movie.id} arleady exist`);
            }
        }
        const newMovie = new Movie(movie);
        await this.movieDao.add(newMovie);
        return newMovie.id;
    }

    public async updateMovie(movie: IMovie): Promise<Movie> {
        const repoMovie: Movie = await this.movieRepository.getById(movie.id);
        if (!repoMovie) {
            throw new NotFoundError('Movie not found');
        }
        await this.movieDao.delete(repoMovie);
        const newMovie = new Movie(movie);
        await this.movieDao.add(newMovie);
        return newMovie;
    }

    public async getMovies(id: number): Promise<Movie[]> {
        if (id) {
            const movie = await this.movieRepository.getById(id);
            if (movie) {
                return [await this.movieRepository.getById(id)];
            } else {
                return [];
            }
        } else {
            return await this.movieRepository.getAll();
        }
    }

    public async deleteMovie(id: number): Promise<boolean> {
        const repoMovie: Movie = await this.movieRepository.getById(id);
        if (!repoMovie) {
            throw new NotFoundError('Movie not found');
        }
        return await this.movieDao.delete(repoMovie);
    }

    public async getRandom(genres: string[], duration: number): Promise<Movie[]> {
        if (genres) {
            const randomByGenres = await this.getRamdonByGenres(genres);
            if (duration) {
                return await this.getFilteredByDuration(randomByGenres, duration);
            }
            return randomByGenres;
        }
        const allMovies = await this.movieRepository.getAll();
        if (duration) {
            const moviesByDuration: Movie[] = allMovies.filter((movie) => movie.runtime > duration - 10 && movie.runtime < duration + 10);
            if (moviesByDuration) {
                return [moviesByDuration[this.getRandomIndex(moviesByDuration.length)]];
            } else {
                return [];
            }
        }
        return [allMovies[this.getRandomIndex(allMovies.length)]];
    }


    private async getRamdonByGenres(genres: string[]): Promise<Movie[]> {
        const repoMovies = await this.movieRepository.getAll();
        const scoredIndexes = {};
        repoMovies.forEach((movie, index) => {
            let uniqeGenres = union(movie.genres, genres).map((el: string) => el.toLowerCase());
            uniqeGenres = [...new Set(uniqeGenres)];
            if (uniqeGenres.length < genres.length + movie.genres.length) {
                const extraPoint = movie.genres < genres ? 1 : 0;
                scoredIndexes[index] = uniqeGenres.length - genres.length + extraPoint;
            }
        });
        const result = (Object.keys(scoredIndexes).reduce((prev, curr) => {
            if (!prev[scoredIndexes[curr]]) {
                prev[scoredIndexes[curr]] = [];
            }
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

    private getRandomIndex(arrayLength: number): number {
        return Math.floor(Math.random() * 100) % arrayLength;
    }

}
