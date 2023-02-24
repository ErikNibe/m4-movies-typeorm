import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities/movies.entity";
import { tMovie, tMovieRequest } from "../interfaces/movies.interfaces";
import { movieSchema } from "../schemas/movies.schemas";

const createMovieService = async (payload: tMovieRequest): Promise<tMovie> => {

    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

    const movie = movieRepository.create(payload);
    await movieRepository.save(movie);

    const newMovie = movieSchema.parse(movie);

    return newMovie;
};

export default createMovieService;