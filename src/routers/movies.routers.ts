import { Router } from "express";
import { createMovieController, listMoviesController } from "../controllers/movies.controller";
import validateData from "../middlewares/validateData.middlewares";
import verifyMovieNameExists from "../middlewares/verifyMovieNameExists.middlewares";
import { movieRequestSchema } from "../schemas/movies.schemas";

const moviesRoutes: Router = Router();

moviesRoutes.post("", verifyMovieNameExists, validateData(movieRequestSchema), createMovieController);
moviesRoutes.get("", listMoviesController);

export default moviesRoutes;