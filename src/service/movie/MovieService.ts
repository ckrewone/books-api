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
        await this.movieDao.add(newMovie);
        return newMovie.id;
    }

    public async updateMovie(movie: IMovie): Promise<Movie> {
        const repoMovie: Movie = await this.movieRepository.getById(movie.id);
        if (!repoMovie) {
            throw new Error('Updating movie failed. Movie not found');
        }
        if (movie.director) {
            repoMovie.director = movie.director;
        }
        if (movie.actors) {
            repoMovie.actors = movie.actors;
        }
        if (movie.genres) {
            repoMovie.genres = movie.genres;
        }
        if (movie.plot) {
            repoMovie.plot = movie.plot;
        }
        if (movie.posterUrl) {
            repoMovie.posterUrl = movie.posterUrl;
        }
        if (movie.runtime) {
            repoMovie.runtime = movie.runtime;
        }
        if (movie.title) {
            repoMovie.title = movie.title;
        }
        if (movie.year) {
            repoMovie.year = movie.year;
        }
        console.log('updated movie');
        console.log(repoMovie);
        await this.movieDao.update(repoMovie);
        return repoMovie;
    }

    public async getMovies(id: number): Promise<Movie[]> {
        if (id) {
            const movie = await this.movieRepository.getById(id);
            if (movie) {
                return [ await this.movieRepository.getById(id) ];
            }
        } else {
            return await this.movieRepository.getAll();
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
                const movie = await this.movieRepository.getOneByDuration(duration);
                return [movie];
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
