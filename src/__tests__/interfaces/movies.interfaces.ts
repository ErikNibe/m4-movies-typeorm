import { DeepPartial, Repository } from 'typeorm';
import { z } from 'zod';
import { Movie } from '../../entities/movies.entity';
import { movieCreateSchema } from '../../schemas/movies.schemas';


type iMovieCreate = z.infer<typeof movieCreateSchema>;
type iMovieUpdate = DeepPartial<Movie>;
type iMovieRepo = Repository<Movie>;

export { iMovieCreate, iMovieUpdate, iMovieRepo };