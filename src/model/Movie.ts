import * as yup from 'yup';

export class Movie {
    public id: string;
    public title: string;
    public year: number;
    public runtime: number;
    public director: string;
    public actors: string;
    public plot: string;
    public posterUrl: string;
    public geners: string[];

    private movieSchema = yup.object({
        id: yup.number(),
        title: yup.string().length(255).required(),
        year: yup.number().required(),
        runtime: yup.number().required(),
        director: yup.string().length(255).required(),
        actors: yup.string(),
        plot: yup.string(),
        posterUrl: yup.string(),
        geners: yup.array().of(yup.string()).min(1).required(),
    });

    constructor(data: Movie) {
        Object.keys(data).forEach((key: string) => {
            this[ key ] = data[ key ];
        });
    }

    public isValid() {
        return this.movieSchema.isValid({
            id: this.id,
            title: this.title,
            year: this.year,
            runtime: this.runtime,
            director: this.director,
            actors: this.actors,
            plot: this.plot,
            posterUrl: this.posterUrl,
            geners: this.geners,
        })
    }
}
