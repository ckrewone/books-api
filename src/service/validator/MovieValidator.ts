import {IMovieValidator} from "./IMovieValidator";
import {Movie} from "../../model/Movie";
import {inject, injectable} from "inversify";
import API_TYPES from "../../ApiTypes";
import {IMovieRepository} from "../../repository/MovieRepository/IMovieRepository";
import * as yup from "yup";
import * as union from 'lodash.union';

@injectable()
export class MovieValidator implements IMovieValidator {
    private movieSchema = yup.object({
        id: yup.number(),
        title: yup.string().max(255).required(),
        year: yup.number().required(),
        runtime: yup.number().required(),
        director: yup.string().max(255).required(),
        actors: yup.string(),
        plot: yup.string(),
        posterUrl: yup.string(),
        genres: yup.array().of(yup.string()).min(1).required(),
    });

    constructor(
        @inject(API_TYPES.MovieRepository) private movieRepository: IMovieRepository,
    ){
    }

    public async validate(movie: Movie): Promise<boolean> {
        this.movieSchema.validateSync({
            id: movie.id,
            title: movie.title,
            year: movie.year,
            runtime: movie.runtime,
            director: movie.director,
            actors: movie.actors,
            plot: movie.plot,
            posterUrl: movie.posterUrl,
            genres: movie.genres,
        });
        await this.validateGenres(movie.genres);
        return true;
    }

    private async validateGenres(genres): Promise<boolean> {
        const allGenres = await this.movieRepository.getPreferedGenres().map((el) => el.toLowerCase());
        const lowerGenres = genres.map((el) => el.toLowerCase());
        if (union(allGenres, lowerGenres).length !== allGenres.length) {
            throw new Error('Invalid genres');
        }
        return true;
    }

}
