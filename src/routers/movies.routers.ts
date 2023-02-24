import { Router } from "express";
import { createMovieController, deleteMovieController, listMoviesController, updateMovieController } from "../controllers/movies.controller";
import validateData from "../middlewares/validateData.middlewares";
import verifyMovieIdExists from "../middlewares/verifyMovieIdExists.middlewares";
import verifyMovieNameExists from "../middlewares/verifyMovieNameExists.middlewares";
import { movieCreateSchema, movieUpdateSchema } from "../schemas/movies.schemas";


const moviesRoutes: Router = Router();

moviesRoutes.post("", verifyMovieNameExists, validateData(movieCreateSchema), createMovieController);
moviesRoutes.get("", listMoviesController);
moviesRoutes.patch("/:id", verifyMovieIdExists, verifyMovieNameExists, validateData(movieUpdateSchema), updateMovieController);
moviesRoutes.delete("/:id", verifyMovieIdExists, deleteMovieController);

export default moviesRoutes;