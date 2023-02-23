import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities/movies.entity";
import { tMovie, tMovieRequest } from "../interfaces/movies.interfaces";
import { movieSchema } from "../schemas/movies.schemas";

const createMovieService = async (payload: tMovieRequest): Promise<tMovie> => {

    const movieRepo: Repository<Movie> = AppDataSource.getRepository(Movie);

    const movie = movieRepo.create(payload);
    await movieRepo.save(movie);

    const newMovie = movieSchema.parse(movie);

    return newMovie;
};

export default createMovieService;