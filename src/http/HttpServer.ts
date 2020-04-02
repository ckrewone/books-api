import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import {inject, injectable} from 'inversify';
import API_TYPES from '../ApiTypes';
import {AppConfig} from '../config/AppConfig';
import {IControllerHandler} from './controller/IControllerHandler';
import {IMovieController} from './controller/MovieController/IMovieController';

@injectable()
export class HttpServer {
    constructor(
        @inject(API_TYPES.AppConfig) private appConfig: AppConfig,
        @inject(API_TYPES.MovieController) private movieController: IMovieController,
        @inject(API_TYPES.ControllerHandler) private controllerHandler: IControllerHandler,
    ) {
    }

    public start(): void {
        const app = express();
        app.use(cors());
        app.use(bodyParser.json());
        app.use(this.regiterRoutes());
        app.listen(this.appConfig.port, (err: any) => {
            if (err) {
                console.log('Unable to start http server');
                console.log(err);
            } else {
                console.log(`Http server started on port: ${this.appConfig.port}`);
            }
        });
    }

    private regiterRoutes() {
        const router = express.Router();
        router.post('/movie', this.controllerHandler.getMethod(this.movieController, 'create'));
        router.post('/movie/random', this.controllerHandler.getMethod(this.movieController, 'getRandom'));

        return router;
    }
}
