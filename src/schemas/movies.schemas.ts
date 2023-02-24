import { z } from "zod";


const movieCreateSchema = z.object({
    name: z.string().max(50),
    description: z.string().optional().nullable(),
    duration: z.number().int().positive(),
    price: z.number().positive().int()
});

const movieSchema = movieCreateSchema.extend({
    id: z.number()
});

const moviesSchema = movieSchema.array();

const movieUpdateSchema = movieCreateSchema.partial()

export {
    movieCreateSchema,
    movieSchema,
    moviesSchema,
    movieUpdateSchema
};