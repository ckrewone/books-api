import { IMovie } from './IMovie';

export interface IMovieRepository {
    getByGenres(...genres: string[]): IMovie[];
    getAllGeners(): string[];
    getById(id: string): IMovie
}
