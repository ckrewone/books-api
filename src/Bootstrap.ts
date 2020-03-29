import { Container, interfaces } from 'inversify';
import { AppConfig } from './config/AppConfig';
import { DbTypes } from './config/DbTypes';
import { MovieController } from './http/controller/MovieController/MovieController';
import { HttpServer } from './http/HttpServer';
import { MovieRepository } from './repository/MovieRepository/MovieRepository';
import { IMovieDataAccessOperations } from './service/dao/IMovieDataAccessOperations';
import { JsonMovieDao } from './service/dao/JsonMovieDao';
import { MovieDao } from './service/dao/MovieDao';
import Context = interfaces.Context;
import Factory = interfaces.Factory;

export const API_TYPES = {
    AppConfig: Symbol.for('AppConfig'),
    MovieController: Symbol.for('MovieController'),
    MovieRepository: Symbol.for('MovieReposiotory'),
    MovieService: Symbol.for('MovieService'),
    MovieDao: Symbol.for('MovieDao'),
    MovieDaoFactory: Symbol.for('MovieDaoFactory'),
    JsonMovieDao: Symbol.for('JsonMovieDao'),
    HttpServer: Symbol.for('HttpServer'),
};


export function bootstrap(container: Container, config: AppConfig) {
    container.bind(API_TYPES.AppConfig).toConstantValue(config);
    container.bind(API_TYPES.MovieController).to(MovieController);
    container.bind(API_TYPES.MovieRepository).to(MovieRepository);
    container.bind(API_TYPES.JsonMovieDao).to(JsonMovieDao);
    container.bind<Factory<IMovieDataAccessOperations>>(API_TYPES.MovieDaoFactory).toFactory<IMovieDataAccessOperations>((context: Context) => {
        return (dbType: DbTypes) => {
            if (dbType === DbTypes.JSON) {
                return context.container.get(API_TYPES.JsonMovieDao);
            }
        };
    });
    container.bind(API_TYPES.MovieDao).to(MovieDao);
    container.bind(API_TYPES.HttpServer).to(HttpServer);
}

