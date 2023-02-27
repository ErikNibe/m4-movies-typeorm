import { DeepPartial } from "typeorm";
import { z } from "zod";
import { movieCreateSchema, movieSchema, moviesSchema } from "../schemas/movies.schemas";


type tMovieRequest = z.infer<typeof movieCreateSchema>;
type tMovie = z.infer<typeof movieSchema>;
type tMovies = z.infer<typeof moviesSchema>;
type tMovieUpdateRequest = DeepPartial<tMovieRequest>;

type tSortAcceptableKeys = "price" | "duration";
type tOrderAcceptableKeys = "ASC" | "DESC";

export {
    tMovieRequest,
    tMovie,
    tMovies,
    tSortAcceptableKeys,
    tOrderAcceptableKeys,
    tMovieUpdateRequest
};