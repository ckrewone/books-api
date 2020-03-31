import 'jest';
import 'reflect-metadata';
import {IMovieRepository} from "../../../../src/repository/MovieRepository/IMovieRepository";
import {IMovieValidator} from "../../../../src/service/validator/IMovieValidator";
import {MovieValidator} from "../../../../src/service/validator/MovieValidator";



describe('MovieValidator', () => {
    let movieRepository: IMovieRepository;
    let validator: IMovieValidator;
    beforeEach(() => {
        movieRepository = jest.fn() as any;
        movieRepository.getPreferedGenres = () => ['test'];
        validator = new MovieValidator(movieRepository);
    });
    it('should validate movie object', async () => {
        const validMovie = {
            id: 12345,
            title: 'title',
            year: 2020,
            runtime: 120,
            director: 'Tester Test',
            actors: '',
            plot: '',
            posterUrl: '',
            genres: ['test'],
        };
        const result = await validator.validate(validMovie);
        expect(result).toBeTruthy();
    });

    it('should throw error if movie object is invalid', async () => {
        const validMovie = {
            id: 12345,
            title: 'title',
            year: 'invalid',
            runtime: 120,
            director: 'Tester Test',
            genres: ['test'],
        };
        await expect(validator.validate(validMovie as any)).rejects.toThrowError();
    });
});
