import {IMovie} from "../repository/MovieRepository/IMovie";

export class Movie {
    public id: number = Math.floor(Math.random() + 10000);
    public title: string;
    public year: number;
    public runtime: number;
    public director: string;
    public actors: string;
    public plot: string;
    public posterUrl: string;
    public genres: string[];

    constructor(data: IMovie) {
        Object.keys(data).forEach((key: string) => {
            this[ key ] = data[ key ];
        });
    }
}
