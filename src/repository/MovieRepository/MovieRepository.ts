import { injectable } from 'inversify';
import { IMovie } from './IMovie';
import { IMovieRepository } from './IMovieRepository';

@injectable()
export class MovieRepository implements IMovieRepository {
    public getAllGeners(): string[] {
        return [];
    }

    public getByGenres(...genres: string[]): IMovie[] {
        return [];
    }

    public getById(id: string): IMovie {
        return undefined;
    }

}
