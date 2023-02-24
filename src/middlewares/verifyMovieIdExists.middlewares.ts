import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities/movies.entity";
import { AppError } from "../errors";


const verifyMovieIdExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

    const foundMovie = await movieRepository.findOne({
        where: {
            id: parseInt(req.params.id)
        }
    });

    if (!foundMovie) {

        throw new AppError("Movie not found", 404);
    };

    return next();
};

export default verifyMovieIdExists;