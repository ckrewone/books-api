import { Movie } from '../../model/Movie';

export interface IMovieRepository {
    getByGenres(...genres: string[]): Movie[];
    getAllGeners(): string[];
    getById(id: string): Movie
    getAll() : Movie[];
}
