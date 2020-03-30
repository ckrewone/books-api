import { inject, injectable } from 'inversify';
import API_TYPES from "../../ApiTypes";
import {AppConfig} from "../../config/AppConfig";
import {DbTypes} from "../../config/DbTypes";
import { Movie } from '../../model/Movie';
import { IMovieRepository } from './IMovieRepository';

@injectable()
export class MovieRepository implements IMovieRepository {
    constructor(
        @inject(API_TYPES.AppConfig) private appConfig: AppConfig,
        @inject(API_TYPES.MovieRepositoryFactory) private movieRepositoryFactory: (dbType: DbTypes) => IMovieRepository,
    ) {
    }

    public getAll(): Movie[] {
        return this.movieRepositoryFactory(this.appConfig.dbSettings.type).getAll();
    }

    public getById(id: number): Movie {
        return this.movieRepositoryFactory(this.appConfig.dbSettings.type).getById(id);
    }

    public getOneByDuration(duration): Movie {
        return this.movieRepositoryFactory(this.appConfig.dbSettings.type).getOneByDuration(duration);
    }

    public getOneRandom(): Movie {
        return this.movieRepositoryFactory(this.appConfig.dbSettings.type).getOneRandom();
    }

    public getPreferedGenres(): string[] {
        return this.movieRepositoryFactory(this.appConfig.dbSettings.type).getPreferedGenres();
    }

}
