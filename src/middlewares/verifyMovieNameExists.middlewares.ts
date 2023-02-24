import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities/movies.entity";
import { AppError } from "../errors";

const verifyMovieNameExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
    
    if (req.body.name) {

        const foundMovie = await movieRepository.findOne({
            where: {
                name: req.body.name
            }
        });
        
        if (foundMovie) {
            
            throw new AppError("Movie already exists.", 409);
        };
    };


    return next();
};

export default verifyMovieNameExists;