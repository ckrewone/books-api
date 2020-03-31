import 'jest';
import * as fsMock from 'mock-fs';
import 'reflect-metadata';
import {AppConfig} from "../../../../src/config/AppConfig";
import {IMovieRepository} from "../../../../src/repository/MovieRepository/IMovieRepository";
import {JsonMovieDao} from "../../../../src/service/dao/json/JsonMovieDao";

declare const Buffer;


describe('JsonMovieDao', () => {
    let appConfig: AppConfig;
    let movieRepository: IMovieRepository;
    const data = {
        genres: [],
        movies: [],
    };
    fsMock({
        test: Buffer.from(JSON.stringify(data)),
    });

    beforeEach(() => {
        appConfig = {dbSettings: {path: 'test'}} as any;
        movieRepository = jest.fn() as any;
        movieRepository.getAll = () => data.movies as any;
    });

    it('should add movie', async () => {
        const jsonMovieDao = new JsonMovieDao(appConfig, movieRepository);
        const result = await jsonMovieDao.add({ id: 2 } as any);
        expect(result).toBeTruthy();
    });

    it('should delete movie', async () => {
        movieRepository.getAll = () => [{id: 2}] as any;
        const jsonMovieDao = new JsonMovieDao(appConfig, movieRepository);
        const result = await jsonMovieDao.delete({ id: 2 } as any);
        expect(result).toBeTruthy();
    });

    it('should throw Error if not found movie to delete', async () => {
        movieRepository.getAll = () => [{id: 1}] as any;
        const jsonMovieDao = new JsonMovieDao(appConfig, movieRepository);
        await expect(jsonMovieDao.delete({ id: 2 } as any)).rejects.toThrowError();
    });
});
