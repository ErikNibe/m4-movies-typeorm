import { z } from "zod";


const movieRequestSchema = z.object({
    name: z.string().max(50),
    description: z.string().optional().nullable(),
    duration: z.number(),
    price: z.number().positive()
});

const movieSchema = movieRequestSchema.extend({
    id: z.number()
});

const moviesSchema = movieSchema.array();

export {
    movieRequestSchema,
    movieSchema,
    moviesSchema
};