import { Movie } from '../../model/Movie';

export interface IMovieRepository {
    getOneByDuration(duration): Movie;
    getById(id: number): Movie;
    getOneRandom(): Movie;
    getAll(): Movie[];
    getPreferedGenres(): string[];
}
