import { z } from "zod";
import { movieRequestSchema, movieSchema, moviesSchema } from "../schemas/movies.schemas";


type tMovieRequest = z.infer<typeof movieRequestSchema>;
type tMovie = z.infer<typeof movieSchema>;
type tMovies = z.infer<typeof moviesSchema>;

type tSortAcceptableKeys = "price" | "duration";
type tOrderAcceptableKeys = "ASC" | "DESC";

export {
    tMovieRequest,
    tMovie,
    tMovies,
    tSortAcceptableKeys,
    tOrderAcceptableKeys
};