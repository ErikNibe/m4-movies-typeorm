import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities/movies.entity";
import { tMovie, tMovieUpdateRequest } from "../interfaces/movies.interfaces";
import { movieSchema } from "../schemas/movies.schemas";


const updateMovieService = async (payload: tMovieUpdateRequest, id: number): Promise<tMovie> => {

    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

    const foundMovie: Movie | null = await movieRepository.findOneBy({
        id,
    });

    const updatedMovie: Movie = await movieRepository.save({
        ...foundMovie,
        ...payload
    });

    return movieSchema.parse(updatedMovie);
};

export default updateMovieService;