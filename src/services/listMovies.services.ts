import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities/movies.entity";
import { iMoviesWithPage, tMovies, tOrderAcceptableKeys, tSortAcceptableKeys } from "../interfaces/movies.interfaces";
import { moviesSchema } from "../schemas/movies.schemas";


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

const listMoviesService = async (perPageParam: any, pageParam: any, sortParam: any, orderParam: any): Promise<iMoviesWithPage> => {

    const perPage: any = perPageParam === undefined || Number(perPageParam) <= 0 || Number(perPageParam) > 5 ? 5 : !Number(perPageParam) ? 5 : perPageParam;

    const page: any = pageParam === undefined || Number(pageParam) <= 0 || !Number(pageParam) ? 1 : pageParam;

    const sort: any = sortParam;
    const order: any = sortParam === undefined ? undefined : orderParam === undefined ? "ASC" : orderParam;

    const sortAcceptableKeys: tSortAcceptableKeys[] = ["duration", "price"];
    const orderAcceptableKeys: tOrderAcceptableKeys[] = ["ASC", "DESC"]; 

    const sortIsRequiredKey: boolean = sortAcceptableKeys.includes(sort);
    const orderIsRequiredKey: boolean = order && orderAcceptableKeys.includes(order.toUpperCase());

    const baseURL: string = "http://localhost:3000/movies";
    let prevPage: string | null = `${baseURL}?page=${parseInt(page) - 1}&perPage=${parseInt(perPage)}`;
    let nextPage: string | null = `${baseURL}?page=${parseInt(page) + 1}&perPage=${parseInt(perPage)}`;

    if (parseInt(page) === 1) {

        prevPage = null;
    };

    const moviesNextPage = await listMoviesNextPageService(perPage, page);
    
    if (moviesNextPage.length === 0) {

        nextPage = null;
    };

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

    const moviesCount = await listAllMoviesService();

    const moviesWithPage = {
        prevPage,
        nextPage,
        count: moviesCount.length,
        data: listMovies
    };

    return moviesWithPage;
};

export {
    listMoviesService,
    listMoviesNextPageService,
    listAllMoviesService
};