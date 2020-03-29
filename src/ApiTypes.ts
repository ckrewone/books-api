const API_TYPES = {
    AppConfig: Symbol.for('AppConfig'),
    MovieController: Symbol.for('MovieController'),
    MovieRepository: Symbol.for('MovieReposiotory'),
    MovieService: Symbol.for('MovieService'),
    MovieDao: Symbol.for('MovieDao'),
    MovieDaoFactory: Symbol.for('MovieDaoFactory'),
    JsonMovieDao: Symbol.for('JsonMovieDao'),
    HttpServer: Symbol.for('HttpServer'),
};

export default API_TYPES;
