import { IMovie } from '../repository/MovieRepository/IMovie';

export class Movie {
    private _id: string;
    private _title: string;
    private _year: number;
    private _runtime: number;
    private _director: string;
    private _actors: string;
    private _plot: string;
    private _posterUrl: string;
    private _geners: string[];

    constructor(data: IMovie) {
        Object.keys(data).forEach((key: string) => {
            // @ts-ignore
            this[key] = data[key];
        });
    }

    get id(): string {
        return this._id;
    }

    set id( id: string ) {
        this._id = id;
    }

    get title(): string {
        return this._title;
    }

    set title( title: string ) {
        this._title = title;
    }

    get year(): number {
        return this._year;
    }

    set yaer( year: number ) {
        this._year = year;
    }

    get runtime(): number {
        return this._runtime;
    }

    set runtime( runtime: number ) {
        this._runtime = runtime;
    }

    get director(): string {
        return this._director;
    }

    set director( director: string ) {
        this._director = director;
    }

    get actors(): string {
        return this._actors;
    }

    set actors( actors: string ) {
        this._actors = actors;
    }

    get plot(): string {
        return this._plot;
    }

    set plot( plot: string ) {
        this._plot = plot;
    }

    get posterUrl(): string {
        return this._posterUrl;
    }

    set posterUrl( posterUrl: string ) {
        this._posterUrl = posterUrl;
    }

    get geners(): string[] {
        return this._geners;
    }

    set geners( geners: string[] ) {
        this._geners = geners;
    }
}
