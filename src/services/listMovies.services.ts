import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities/movies.entity";
import { tMovies } from "../interfaces/movies.interfaces";
import { moviesSchema } from "../schemas/movies.schemas";

const listMoviesService = async (perPage: any, page: any, sort: any, order: any, sortIsRequiredKey: boolean, orderIsRequiredKey: boolean): Promise<tMovies> => {

    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

    let foundUsers: Array<Movie> = await movieRepository.find({
        take: perPage,
        skip: perPage * (page - 1),
        order: {
            id: "ASC"
        }
    });

    if (sortIsRequiredKey && orderIsRequiredKey && sort === "price") {

        foundUsers = await movieRepository.find({
            take: perPage,
            skip: perPage * (page -1),
            order: {
                price: order.toUpperCase()
            }
        });
    }

    if (sortIsRequiredKey && orderIsRequiredKey && sort === "duration") {
        
        foundUsers = await movieRepository.find({
            take: perPage,
            skip: perPage * (page -1),
            order: {
                duration: order.toUpperCase()
            }
        });
    }

    const listMovies = moviesSchema.parse(foundUsers);

    return listMovies;
};

const listMoviesNextPageService  = async (perPage: any, page: any): Promise<tMovies> => {

    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

    const foundUsers: Array<Movie> = await movieRepository.find({
        take: perPage,
        skip: perPage * page
    });

    const listMovies = moviesSchema.parse(foundUsers);

    return listMovies;
};

const listAllMoviesService  = async (): Promise<tMovies> => {

    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

    const foundUsers: Array<Movie> = await movieRepository.find();

    const listMovies = moviesSchema.parse(foundUsers);

    return listMovies;
};

export {
    listMoviesService,
    listMoviesNextPageService,
    listAllMoviesService
};