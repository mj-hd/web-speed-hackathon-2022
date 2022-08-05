import { join } from "path";

import fastifyStatic from "fastify-static";

/**
 * @type {import('fastify').FastifyPluginCallback}
 */
export const spaRoute = async (fastify) => {
  fastify.register(fastifyStatic, {
    maxAge: 604800,
    preCompressed: true,
    root: join(__dirname, "public"),
    wildcard: false
  });

  fastify.get("/favicon.ico", (req, reply) => {
    throw fastify.httpErrors.notFound();
  });

  fastify.get("/races*", (req, reply) => {
    reply.header('cache-control', 'max-age=604800');
    return reply.sendFile("race.html", join(__dirname, "public"));
  });

  fastify.get("*", (req, reply) => {
    reply.header('cache-control', 'max-age=604800');
    return reply.sendFile("index.html", join(__dirname, "public"));
  });
};
