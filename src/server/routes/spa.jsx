import { join } from "path";

import fastifyStatic from "fastify-static";

/**
 * @type {import('fastify').FastifyPluginCallback}
 */
export const spaRoute = async (fastify) => {
  fastify.register(fastifyStatic, {
    preCompressed: true,
    root: join(__dirname, "public"),
    wildcard: false
  });

  fastify.get("/favicon.ico", () => {
    throw fastify.httpErrors.notFound();
  });

  fastify.get("*", (req, reply) => {
    return reply.sendFile("index.html", join(__dirname, "public"));
  });
};
