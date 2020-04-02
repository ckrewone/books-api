import {Movie} from '../../model/Movie';

export interface IMovieRepository {
    getById(id: number): Promise<Movie>;

    getAll(): Promise<Movie[]>;

    getPreferedGenres(): string[];
}
