export interface IMovie {
    id?: number;
    title: string;
    year: number;
    runtime: number;
    director: string;
    actors?: string;
    plot?: string;
    posterUrl?: string;
    genres: string[];
}
