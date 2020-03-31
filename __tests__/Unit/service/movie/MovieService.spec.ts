import 'jest';
import 'reflect-metadata';
import {Movie} from "../../../../src/model/Movie";
import {IMovieRepository} from "../../../../src/repository/MovieRepository/IMovieRepository";
import {MovieService} from "../../../../src/service/movie/MovieService";
import {IMovieDataAccessOperations} from "../../../../src/service/dao/IMovieDataAccessOperations";
import {IMovieService} from "../../../../src/service/movie/IMovieService";
import {IMovie} from "../../../../src/repository/MovieRepository/IMovie";


describe('MovieService', () => {
    let movieDao: IMovieDataAccessOperations;
    let movieRepository: IMovieRepository;
    let movieService: IMovieService;
    describe('getMovies', () => {
        beforeEach(() => {
            movieDao = jest.fn() as any;
            movieRepository = jest.fn() as any;
            movieService = new MovieService(movieDao, movieRepository);
        });

        it('should get movie with id', async () => {
            const mockMovie = new Movie({
                id: 1,
                title: 'title',
                year: 2012,
                runtime: 120,
                director: 'Tester Test',
                actors: '',
                plot: '',
                posterUrl: '',
                genres: [
                    'Action',
                ],
            });
            movieRepository.getById = async () => mockMovie;
            const movie = await movieService.getMovies(1);
            expect(movie).toBeDefined();
            expect(Array.isArray(movie)).toBeTruthy();
            expect(movie.length).toBe(1);
            expect(movie[0]).toBe(mockMovie);
        });

        it('should return empty array if movie not found', async () => {
            movieRepository.getById = async () => undefined;
            const movie = await movieService.getMovies(1);
            expect(movie).toBeDefined();
            expect(Array.isArray(movie)).toBeTruthy();
            expect(movie.length).toBe(0);
        });

        it('should return all movies if id is not defined', async () => {
            const mockMovies = [
                new Movie({
                    id: 1,
                    title: 'title',
                    year: 2012,
                    runtime: 120,
                    director: 'Tester Test',
                    actors: '',
                    plot: '',
                    posterUrl: '',
                    genres: [
                        'Action',
                    ],
                }),
                new Movie({
                    id: 2,
                    title: 'title',
                    year: 2012,
                    runtime: 120,
                    director: 'Tester Test',
                    actors: '',
                    plot: '',
                    posterUrl: '',
                    genres: [
                        'Action',
                    ],
                }),
            ];
            movieRepository.getAll = async () => mockMovies;
            const movie = await movieService.getMovies(undefined);
            expect(movie).toBeDefined();
            expect(Array.isArray(movie)).toBeTruthy();
            expect(movie.length).toBe(2);
            expect(movie[0]).toBe(mockMovies[0]);
            expect(movie[1]).toBe(mockMovies[1]);
        });
    });

    describe('getRandom', () => {
        let mockMovies: Movie[];
        beforeEach(() => {
            mockMovies = [
                new Movie({
                    id: 1,
                    title: 'title',
                    year: 2012,
                    runtime: 33,
                    director: 'Tester Test',
                    actors: '',
                    plot: '',
                    posterUrl: '',
                    genres: [
                        'Action',
                    ],
                }),
                new Movie({
                    id: 2,
                    title: 'title',
                    year: 2012,
                    runtime: 120,
                    director: 'Tester Test',
                    actors: '',
                    plot: '',
                    posterUrl: '',
                    genres: [
                        'comedy',
                    ],
                }),
                new Movie({
                    id: 3,
                    title: 'title',
                    year: 2012,
                    runtime: 120,
                    director: 'Tester Test',
                    actors: '',
                    plot: '',
                    posterUrl: '',
                    genres: [
                        'action',
                        'horror',
                    ],
                }),
            ];
            movieDao = jest.fn() as any;
            movieRepository = jest.fn() as any;
            movieRepository.getAll = async () => mockMovies;
            movieService = new MovieService(movieDao, movieRepository);
        });

        it('should getRandom movie by duration', async () => {
            const random = await movieService.getRandom(undefined, 30);
            expect(random).toBeDefined();
            expect(Array.isArray(random)).toBeTruthy();
            expect(random.length).toBe(1);
            expect(random[0]).toBe(mockMovies[0]);
        });

        it('should get random movie by duration and genres', async () => {
            const random = await movieService.getRandom(['Comedy'], 115);
            expect(random).toBeDefined();
            expect(Array.isArray(random)).toBeTruthy();
            expect(random.length).toBe(1);
            expect(random[0]).toBe(mockMovies[1]);
        });

        it('should not get random movies by genres', async () => {
            const random = await movieService.getRandom(['action', 'Horror'], undefined);
            expect(random).toBeDefined();
            expect(Array.isArray(random)).toBeTruthy();
            expect(random.length).toBe(2);
            expect(random[0]).toBe(mockMovies[2]);
            expect(random[1]).toBe(mockMovies[0]);
        });

        it('should get random one movie without parameters', async () => {
            const random = await movieService.getRandom(undefined, undefined);
            expect(random).toBeDefined();
            expect(Array.isArray(random)).toBeTruthy();
            expect(random.length).toBe(1);
        });
    });

    describe('createMovie', () => {
        let mockedMovie: IMovie;
        beforeEach(() => {
            movieDao = jest.fn() as any;
            movieRepository = jest.fn() as any;
            movieService = new MovieService(movieDao, movieRepository);
            mockedMovie = {
                id: 1,
                title: 'title',
                year: 2012,
                runtime: 120,
                director: 'Tester Test',
                genres: [
                    'action',
                    'horror',
                ],
            };
        });

        it('should create movie', async () => {
            movieRepository.getById = async () => undefined;
            movieDao.add = async () => true;
            const id = await movieService.createMovie(mockedMovie);
            expect(id).toBeDefined();
            expect(id).toBe(mockedMovie.id);
        });

        it('should throw error if movie arleady exists', async () => {
            movieRepository.getById = async () => ({} as any);
            movieDao.add = async () => true;
            await expect(movieService.createMovie(mockedMovie)).rejects.toThrowError();
        });
    });

    describe('updateMovie', () => {
        let mockedMovie: IMovie;
        beforeEach(() => {
            movieDao = jest.fn() as any;
            movieRepository = jest.fn() as any;
            movieService = new MovieService(movieDao, movieRepository);
            mockedMovie = {
                id: 1,
                title: 'title',
                year: 2012,
                runtime: 120,
                director: 'Tester Test',
                genres: [
                    'action',
                    'horror',
                ],
                posterUrl: 'test',
                plot: 'test',
                actors: 'test',
            };
        });

        it('should update a movie', async () => {
            movieRepository.getById = async () => ({} as any);
            movieDao.delete = async () => true;
            movieDao.add = async () => true;
            const movie = await movieService.updateMovie(mockedMovie);
            expect(movie).toBeDefined();
            expect(movie).toBe(movie);
        });

        it('should throw error if movie does not exists', async () => {
            movieRepository.getById = async () => undefined;
            await expect(movieService.updateMovie(mockedMovie)).rejects.toThrowError();
        });
    });


    describe('deleteMovie', () => {
        beforeEach(() => {
            movieDao = jest.fn() as any;
            movieRepository = jest.fn() as any;
            movieService = new MovieService(movieDao, movieRepository);
        });

        it('should delete movie', async () => {
            movieRepository.getById = () => ({} as any);
            movieDao.delete = async () => true;
            expect(await movieService.deleteMovie(1)).toBeTruthy();
        });

        it('should throw error if movie not found', async () => {
            movieRepository.getById = () => undefined;
            movieDao.delete = async () => true;
            await expect(movieService.deleteMovie(1)).rejects.toThrowError();
        });
    });
});
