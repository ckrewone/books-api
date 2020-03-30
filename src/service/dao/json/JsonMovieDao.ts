import * as fs from 'fs';
import {inject, injectable} from 'inversify';
import API_TYPES from "../../../ApiTypes";
import {AppConfig} from "../../../config/AppConfig";
import {Movie} from "../../../model/Movie";
import {IMovieRepository} from "../../../repository/MovieRepository/IMovieRepository";
import { IMovieDataAccessOperations } from '../IMovieDataAccessOperations';
import {IMovieValidator} from "../../validator/IMovieValidator";

@injectable()
export class JsonMovieDao implements IMovieDataAccessOperations {
    constructor(
        @inject(API_TYPES.AppConfig) private appConfig: AppConfig,
        @inject(API_TYPES.MovieRepository) private movieRepository: IMovieRepository,
        @inject(API_TYPES.MovieValidator) private movieValidator: IMovieValidator,
    ) {
    }

    public async delete(data: Movie): Promise<boolean> {
        const allMovies = await this.movieRepository.getAll();
        const index = allMovies.findIndex((m) => m.id === data.id);
        if (index === -1 ) { throw new Error('Deleting data failed. Movie not found'); }
        allMovies.splice(index, 1);
        return await this.saveMovies(allMovies);
    }

    public async add(data: Movie): Promise<boolean> {
        await this.movieValidator.validate(data);
        const allMovies = await this.movieRepository.getAll();
        allMovies.push(data);
        return await this.saveMovies(allMovies);
    }

    public async update(data: Movie): Promise<boolean> {
        await this.movieValidator.validate(data);
        const allMovies = await this.movieRepository.getAll();
        const index = allMovies.findIndex((m) => m.id === data.id);
        if (index === -1 ) { throw new Error('Updating data failed. Movie not found'); }
        allMovies[index] = data;
        return await this.saveMovies(allMovies);
    }

    private async saveMovies(movies: Movie[]): Promise<boolean> {
        const buffer = fs.readFileSync(this.appConfig.dbSettings.path);
        const jsonData = JSON.parse(buffer.toString());
        if (jsonData.movies) {
            jsonData.movies = movies;
            fs.writeFileSync(this.appConfig.dbSettings.path, jsonData);
            return true;
        }
        return false;
    }

}
