export interface IMovie {
    id: string;
    title: string;
    year: number;
    runtime: number;
    director: string;
    actors?: string;
    plot?: string;
    posterUrl?: string;
    geners: string[];
}
