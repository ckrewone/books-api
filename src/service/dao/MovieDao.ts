import { inject, injectable } from 'inversify';
import API_TYPES from '../../ApiTypes';
import { AppConfig } from '../../config/AppConfig';
import { DbTypes } from '../../config/DbTypes';
import { IMovie } from '../../repository/MovieRepository/IMovie';
import { IMovieDataAccessOperations } from './IMovieDataAccessOperations';

@injectable()
export class MovieDao implements IMovieDataAccessOperations {

    constructor(
        @inject(API_TYPES.AppConfig) private appConfig: AppConfig,
        @inject(API_TYPES.MovieDaoFactory) private movieDaoFactory: (dbType: DbTypes) => IMovieDataAccessOperations,
    ) {
    }

    public delete(data: IMovie): Promise<boolean> {
        return this.movieDaoFactory(this.appConfig.dbSettings.type).delete(data);
    }

    public async save(data: IMovie): Promise<boolean> {
        return this.movieDaoFactory(this.appConfig.dbSettings.type).save(data);
    }
}
