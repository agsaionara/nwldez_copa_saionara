import {FastifyRequest} from "fastify"

export async function authenticate(resquest: FastifyRequest) {
    await resquest.jwtVerify()
}