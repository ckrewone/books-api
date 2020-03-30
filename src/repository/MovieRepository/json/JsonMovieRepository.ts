import * as fs from 'fs';
import { inject, injectable } from 'inversify';
import API_TYPES from '../../../ApiTypes';
import { AppConfig } from '../../../config/AppConfig';
import { Movie } from '../../../model/Movie';
import { IMovieRepository } from '../IMovieRepository';

@injectable()
export class JsonMovieRepository implements IMovieRepository {
    private movies: Movie[] = [];
    private genres: string[];
    constructor(
        @inject(API_TYPES.AppConfig) private appConfig: AppConfig,
    ) {
        const buffer = fs.readFileSync(appConfig.dbSettings.path);
        const data = JSON.parse(buffer.toString());
        data.movies.forEach((movie) => {
            this.movies.push(new Movie(movie));
        });
        this.genres = data.genres;
    }

    public getById(id: number): Movie {
        return this.movies.find((movie) => movie.id === id);
    }

    public getAll(): Movie[] {
        return this.movies;
    }

    public getOneByDuration(duration: number): Movie {
        const moviesByDuration: Movie[] = this.movies.filter((movie) => movie.runtime > duration - 10 && movie.runtime < duration + 10);
        return moviesByDuration[this.getRandomIndex(moviesByDuration.length)];
    }

    public getOneRandom(): Movie {
        return this.movies[this.getRandomIndex(this.movies.length)];
    }

    public getPreferedGenres(): string[] {
        return this.genres;
    }

    private getRandomIndex(arrayLength: number): number {
        return Math.floor(Math.random() * 100) % (arrayLength - 1);
    }


}
