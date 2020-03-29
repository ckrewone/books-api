import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import { inject, injectable } from 'inversify';
import { API_TYPES } from '../Bootstrap';
import { AppConfig } from '../config/AppConfig';
import { IMovieController } from './controller/MovieController/IMovieController';

@injectable()
export class HttpServer {
    constructor(
        @inject(API_TYPES.MovieController) private movieController: IMovieController,
        @inject(API_TYPES.AppConfig) private appConfig: AppConfig,
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
        router.get('/movie/:id', this.movieController.get);
        router.post('/movie', this.movieController.upsert);
        router.post('/movie/random', this.movieController.getRandom);
        router.delete('/movie', this.movieController.delete);

        return router;
    }
}
