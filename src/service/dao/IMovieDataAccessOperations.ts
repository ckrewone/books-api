import { IMovie } from '../../repository/MovieRepository/IMovie';

export interface IMovieDataAccessOperations {
    save(data: IMovie): Promise<boolean>;
    delete(data: IMovie): Promise<boolean>;
}
