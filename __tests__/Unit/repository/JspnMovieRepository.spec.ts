import 'jest';
import * as fsMock from 'mock-fs';
import 'reflect-metadata';
import {AppConfig} from "../../../src/config/AppConfig";
import {IMovieRepository} from "../../../src/repository/MovieRepository/IMovieRepository";
import {JsonMovieRepository} from "../../../src/repository/MovieRepository/json/JsonMovieRepository";
declare const Buffer;


describe('JsonMovieRepository', () => {
    let appConfig: AppConfig;
    let jsonMovieRepository: IMovieRepository;
    jest.mock('fs');
    beforeEach(() => {
        appConfig = { dbSettings: { path: 'test'}} as any;
        jsonMovieRepository = new JsonMovieRepository(appConfig);

    });
    it('test getters', async () => {
        const data = {
            genres: [
                'a',
                'b',
                'c',
            ],
            movies: [
                {
                    id: 1,
                },
                {
                    id: 2,
                },
            ],
        };
        fsMock({
            test : Buffer.from(JSON.stringify(data)),
        });
        const movies = await jsonMovieRepository.getAll();
        expect(movies[0].id).toBe(data.movies[0].id);
        expect(movies[1].id).toBe(data.movies[1].id);

        const movie = await jsonMovieRepository.getById(1);
        expect(movie).toBeDefined();
        expect(movie.id).toBe(1);

        const genres = await jsonMovieRepository.getPreferedGenres();
        expect(genres).toEqual(data.genres);
    });
});
