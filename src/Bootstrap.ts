import {Container, interfaces} from 'inversify';
import API_TYPES from './ApiTypes';
import {AppConfig} from './config/AppConfig';
import {DbTypes} from './config/DbTypes';
import {ControllerHandler} from './http/controller/ControllerHandler';
import {IControllerHandler} from "./http/controller/IControllerHandler";
import {IMovieController} from "./http/controller/MovieController/IMovieController";
import {MovieController} from './http/controller/MovieController/MovieController';
import {HttpServer} from './http/HttpServer';
import {IMovieRepository} from "./repository/MovieRepository/IMovieRepository";
import {JsonMovieRepository} from "./repository/MovieRepository/json/JsonMovieRepository";
import {MovieRepository} from './repository/MovieRepository/MovieRepository';
import {IMovieDataAccessOperations} from './service/dao/IMovieDataAccessOperations';
import {JsonMovieDao} from './service/dao/json/JsonMovieDao';
import {MovieDao} from './service/dao/MovieDao';
import {IMovieService} from "./service/movie/IMovieService";
import {MovieService} from './service/movie/MovieService';
import {IMovieValidator} from "./service/validator/IMovieValidator";
import {MovieValidator} from "./service/validator/MovieValidator";
import Context = interfaces.Context;
import Factory = interfaces.Factory;


export function bootstrap(container: Container, config: AppConfig) {
    container.bind<AppConfig>(API_TYPES.AppConfig).toConstantValue(config);
    container.bind<IMovieRepository>(API_TYPES.JsonMovieRepository).to(JsonMovieRepository);
    container.bind<IMovieDataAccessOperations>(API_TYPES.JsonMovieDao).to(JsonMovieDao);
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
    container.bind<IMovieDataAccessOperations>(API_TYPES.MovieDao).to(MovieDao);
    container.bind<IMovieRepository>(API_TYPES.MovieRepository).to(MovieRepository);
    container.bind<IMovieService>(API_TYPES.MovieService).to(MovieService);
    container.bind<IMovieController>(API_TYPES.MovieController).to(MovieController);
    container.bind<IControllerHandler>(API_TYPES.ControllerHandler).to(ControllerHandler);
    container.bind<HttpServer>(API_TYPES.HttpServer).to(HttpServer);
    container.bind<IMovieValidator>(API_TYPES.MovieValidator).to(MovieValidator);
}

