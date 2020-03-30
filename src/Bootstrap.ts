import { Container, interfaces } from 'inversify';
import API_TYPES from './ApiTypes';
import { AppConfig } from './config/AppConfig';
import { DbTypes } from './config/DbTypes';
import { ControllerHandler } from './http/controller/ControllerHandler';
import { MovieController } from './http/controller/MovieController/MovieController';
import { HttpServer } from './http/HttpServer';
import Context = interfaces.Context;
import Factory = interfaces.Factory;
import {IMovieRepository} from "./repository/MovieRepository/IMovieRepository";
import {JsonMovieRepository} from "./repository/MovieRepository/json/JsonMovieRepository";
import { MovieRepository } from './repository/MovieRepository/MovieRepository';
import { IMovieDataAccessOperations } from './service/dao/IMovieDataAccessOperations';
import { JsonMovieDao } from './service/dao/json/JsonMovieDao';
import { MovieDao } from './service/dao/MovieDao';
import { MovieService } from './service/movie/MovieService';
import {MovieValidator} from "./service/validator/MovieValidator";


export function bootstrap(container: Container, config: AppConfig) {
    container.bind<AppConfig>(API_TYPES.AppConfig).toConstantValue(config);
    container.bind(API_TYPES.JsonMovieRepository).to(JsonMovieRepository);
    container.bind(API_TYPES.JsonMovieDao).to(JsonMovieDao);
    container.bind<Factory<IMovieDataAccessOperations>>(API_TYPES.MovieDaoFactory).toFactory<IMovieDataAccessOperations>((context: Context) => {
        return (dbType: DbTypes) => {
            if (dbType === DbTypes.JSON) {
                return context.container.get(API_TYPES.JsonMovieDao);
            }
        };
    });
    container.bind<Factory<IMovieRepository>>(API_TYPES.MovieRepositoryFactory).toFactory<IMovieRepository>((context: Context) => {
        return (dbType: DbTypes) => {
            if (dbType === DbTypes.JSON) {
                return context.container.get(API_TYPES.JsonMovieRepository);
            }
        };
    });
    container.bind(API_TYPES.MovieDao).to(MovieDao);
    container.bind(API_TYPES.MovieRepository).to(MovieRepository);
    container.bind(API_TYPES.MovieService).to(MovieService);
    container.bind(API_TYPES.MovieController).to(MovieController);
    container.bind(API_TYPES.ControllerHandler).to(ControllerHandler);
    container.bind(API_TYPES.HttpServer).to(HttpServer);
    container.bind(API_TYPES.MovieValidator).to(MovieValidator);
}

