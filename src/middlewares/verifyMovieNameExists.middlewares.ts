import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities/movies.entity";
import { AppError } from "../errors";

const verifyMovieNameExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const movieRepo: Repository<Movie> = AppDataSource.getRepository(Movie);

    const foundMovie = await movieRepo.findOne({
        where: {
            name: req.body.name
        }
    });
    
    if (foundMovie) {
        
        throw new AppError("Movie alredy exists.", 400);
    };

    return next();
};

export default verifyMovieNameExists;