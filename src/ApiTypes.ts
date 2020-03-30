const API_TYPES = {
    AppConfig: Symbol.for('AppConfig'),
    MovieController: Symbol.for('MovieController'),
    MovieRepository: Symbol.for('MovieReposiotory'),
    JsonMovieRepository: Symbol.for('JsonMovieReposiotory'),
    MovieRepositoryFactory: Symbol.for('MovieReposiotoryFactory'),
    MovieService: Symbol.for('MovieService'),
    MovieDao: Symbol.for('MovieDao'),
    MovieDaoFactory: Symbol.for('MovieDaoFactory'),
    JsonMovieDao: Symbol.for('JsonMovieDao'),
    HttpServer: Symbol.for('HttpServer'),
    ControllerHandler: Symbol.for('ControllerHandler'),
    MovieValidator: Symbol.for('MovieValidator'),
};

export default API_TYPES;
