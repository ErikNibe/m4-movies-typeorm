import { Request, Response } from "express";
import { tMovie, tOrderAcceptableKeys, tSortAcceptableKeys } from "../interfaces/movies.interfaces";
import createMovieService from "../services/createMovie.services";
import deleteMovieService from "../services/deleteMovie.services";
import { listAllMoviesService, listMoviesNextPageService, listMoviesService } from "../services/listMovies.services";
import updateMovieService from "../services/updateMovie.services";


const createMovieController = async (req: Request, res: Response): Promise<Response> => {

    const movie = await createMovieService(req.body);

    return res.status(201).json(movie);
};

const listMoviesController = async (req: Request, res: Response): Promise<Response> => {

    const perPage: any = req.query.perPage === undefined || Number(req.query.perPage) <= 0 || Number(req.query.perPage) > 5 ? 5 : !Number(req.query.perPage) ? 5 : req.query.perPage;

    const page: any = req.query.page === undefined || Number(req.query.page) <= 0 || !Number(req.query.page) ? 1 : req.query.page;

    const sort: any = req.query.sort;
    const order: any = req.query.sort === undefined ? undefined : req.query.order === undefined ? "ASC" : req.query.order;

    const sortAcceptableKeys: tSortAcceptableKeys[] = ["duration", "price"];
    const orderAcceptableKeys: tOrderAcceptableKeys[] = ["ASC", "DESC"]; 

    const sortIsRequiredKey: boolean = sortAcceptableKeys.includes(sort);
    const orderIsRequiredKey: boolean = order && orderAcceptableKeys.includes(order.toUpperCase());

    const movies = await listMoviesService(perPage, page, sort, order, sortIsRequiredKey, orderIsRequiredKey);

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

    const moviesCount = await listAllMoviesService();

    const moviesWithPage = {
        prevPage,
        nextPage,
        count: moviesCount.length,
        data: movies
    };

    return res.json(moviesWithPage);
};

const updateMovieController = async (req: Request, res: Response): Promise<Response> => {

    const { body, params } = req;
    const idMovie: number = parseInt(params.id);

    const updatedMovie: tMovie = await updateMovieService(body, idMovie);

    return res.json(updatedMovie);
};

const deleteMovieController = async (req: Request, res: Response): Promise<Response> => {

    await deleteMovieService(parseInt(req.params.id));

    return res.status(204).send();
};

export {
    createMovieController,
    listMoviesController,
    updateMovieController,
    deleteMovieController
};