import { inject, injectable } from 'inversify';
import API_TYPES from "../../ApiTypes";
import {AppConfig} from "../../config/AppConfig";
import {DbTypes} from "../../config/DbTypes";
import { Movie } from '../../model/Movie';
import { IMovieRepository } from './IMovieRepository';

@injectable()
export class MovieRepository implements IMovieRepository {
    private movieRepository: IMovieRepository;
    constructor(
        @inject(API_TYPES.AppConfig) private appConfig: AppConfig,
        @inject(API_TYPES.MovieRepositoryFactory) private movieRepositoryFactory: (dbType: DbTypes) => IMovieRepository,
    ) {
        this.movieRepository = this.movieRepositoryFactory(this.appConfig.dbSettings.type);
    }

    public getAll(): Promise<Movie[]> {
        return this.movieRepository.getAll();
    }

    public getById(id: number): Promise<Movie> {
        return this.movieRepository.getById(id);
    }

    public getOneByDuration(duration): Promise<Movie> {
        return this.movieRepository.getOneByDuration(duration);
    }

    public getOneRandom(): Promise<Movie> {
        return this.movieRepository.getOneRandom();
    }

    public getPreferedGenres(): string[] {
        return this.movieRepository.getPreferedGenres();
    }

}
