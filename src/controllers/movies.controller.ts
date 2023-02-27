import { Request, Response } from "express";
import { tMovie } from "../interfaces/movies.interfaces";
import createMovieService from "../services/createMovie.services";
import deleteMovieService from "../services/deleteMovie.services";
import { listMoviesService } from "../services/listMovies.services";
import updateMovieService from "../services/updateMovie.services";


const createMovieController = async (req: Request, res: Response): Promise<Response> => {

    const movie = await createMovieService(req.body);

    return res.status(201).json(movie);
};

const listMoviesController = async (req: Request, res: Response): Promise<Response> => {

    const perPage: any = req.query.perPage;

    const page: any = req.query.page;

    const sort: any = req.query.sort;
    const order: any = req.query.order;

    const movies = await listMoviesService(perPage, page, sort, order);

    return res.json(movies);
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