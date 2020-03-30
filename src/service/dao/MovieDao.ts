import { inject, injectable } from 'inversify';
import API_TYPES from '../../ApiTypes';
import { AppConfig } from '../../config/AppConfig';
import { DbTypes } from '../../config/DbTypes';
import {Movie} from "../../model/Movie";
import { IMovieDataAccessOperations } from './IMovieDataAccessOperations';

@injectable()
export class MovieDao implements IMovieDataAccessOperations {

    constructor(
        @inject(API_TYPES.AppConfig) private appConfig: AppConfig,
        @inject(API_TYPES.MovieDaoFactory) private movieDaoFactory: (dbType: DbTypes) => IMovieDataAccessOperations,
    ) {
    }

    public delete(data: Movie): Promise<boolean> {
        return this.movieDaoFactory(this.appConfig.dbSettings.type).delete(data);
    }

    public async add(data: Movie): Promise<boolean> {
        return this.movieDaoFactory(this.appConfig.dbSettings.type).add(data);
    }

    public async update(data: Movie): Promise<boolean> {
        return this.movieDaoFactory(this.appConfig.dbSettings.type).add(data);
    }
}
