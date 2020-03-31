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
        this.syncData();
    }

    public async getById(id: number): Promise<Movie> {
        await this.syncData();
        return this.movies.find((movie) => movie.id == id);
    }

    public async getAll(): Promise<Movie[]> {
        await this.syncData();
        return this.movies;
    }

    public getPreferedGenres(): string[] {
        return this.genres;
    }

    private async syncData() {
        this.movies = [];
        this.genres = [];
        const buffer = fs.readFileSync(this.appConfig.dbSettings.path);
        const data = JSON.parse(buffer.toString());
        data.movies.forEach((movie) => {
            this.movies.push(new Movie(movie));
        });
        this.genres = data.genres;
    }


}
