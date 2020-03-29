import { inject, injectable } from 'inversify';
import API_TYPES from '../../ApiTypes';
import { AppConfig } from '../../config/AppConfig';
import { Movie } from '../../model/Movie';
import { IMovieRepository } from './IMovieRepository';
import * as fs from 'fs';

@injectable()
export class MovieRepository implements IMovieRepository {
    private movies: Movie[] = [];
    private genres: string[];
    constructor(
        @inject(API_TYPES.AppConfig) private appConfig: AppConfig,
    ) {
        const buffer = fs.readFileSync(appConfig.dbSettings.path);
        const data = JSON.parse(buffer.toString());
        data.movies.forEach(movie => {
            this.movies.push(new Movie(movie));
        });
        this.genres = data.genres;
    }

    public getAllGeners(): string[] {
        return [];
    }

    public getByGenres(...genres: string[]): Movie[] {
        return [];
    }

    public getById(id: string): Movie {
        return this.movies.find(movie => movie.id === id);
    }

    public getAll(): Movie[] {
        return this.movies;
    }


}
