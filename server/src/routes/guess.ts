import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { authenticate } from "../plugins/authenticate";

export async function guessRoutes(fastify: FastifyInstance){
    fastify.get('/guesses/count', async() =>{
        const count  = await prisma.guess.count();

        return {count}
    })

    fastify.post('/pools/:poolId/games/:gameId/guesses',{
        onRequest: [authenticate]
    }, async (request, reply) =>{
        const createGuessesParams = z.object({
            poolId: z.string(),
            gameId: z.string(),
        })

        const createGuessesBody = z.object({
            firstTeamPoints: z.number(),
            secondTeamPoints: z.number(),
        })

        const{poolId, gameId} = createGuessesParams.parse(request.params);
        const{firstTeamPoints, secondTeamPoints} = createGuessesBody.parse(request.body);

        return {
            poolId,
            gameId,
            firstTeamPoints,
            secondTeamPoints,
        }
    })

}