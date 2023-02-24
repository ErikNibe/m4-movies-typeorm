import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities/movies.entity";

const deleteMovieService = async (id: number): Promise<void> => {

    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

    const foundMovie: Movie | null = await movieRepository.findOne({
        where: {
            id
        }
    });

    await movieRepository.remove(foundMovie!);
};

export default deleteMovieService;