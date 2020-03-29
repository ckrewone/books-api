import { injectable } from 'inversify';
import { IMovieDataAccessOperations } from './IMovieDataAccessOperations';

@injectable()
export class JsonMovieDao implements IMovieDataAccessOperations {
    constructor() {
    }

    public delete(data: Record<string, any>): Promise<boolean> {
        return undefined;
    }

    public save(data: Record<string, any>): Promise<boolean> {
        return undefined;
    }

}
