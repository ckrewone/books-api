import { Movie } from '../../model/Movie';

export interface IMovieRepository {
    getOneByDuration(duration): Promise<Movie>;
    getById(id: number): Promise<Movie>;
    getOneRandom(): Promise<Movie>;
    getAll(): Promise<Movie[]>;
    getPreferedGenres(): string[];
}
