import { join } from "path";
import { Readable } from "stream";

import fastifyStatic from "fastify-static";
import React from "react";
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from "react-router-dom/server";
import { ServerStyleSheet } from 'styled-components';

import { App } from "../../client/foundation/App";

/**
 * @type {import('fastify').FastifyPluginCallback}
 */
export const spaRoute = async (fastify) => {
  // TODO: 拡張子ごとに分けてcache-control
  fastify.register(fastifyStatic, {
    root: join(__dirname, "public"),
    wildcard: false,
  });

  fastify.get("/favicon.ico", () => {
    throw fastify.httpErrors.notFound();
  });

  fastify.get("*", (req, reply) => {
    const sheet = new ServerStyleSheet();

    try {
      const app = renderToString(sheet.collectStyles(
        <StaticRouter location={req.url}>
          <App sheet={sheet.instance} />
        </StaticRouter>
      ));
      const style = sheet.getStyleTags();

      const header = `
      <!DOCTYPE html>
      <html lang="ja">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>CyberTicket</title>
          ${style}
          <script src="/main.js" defer></script>
        </head>
        <body id="root">
    `;

      reply.type('text/html');
      reply.send(`${header}${app}</body></html>`);
    } catch (e) {
      reply.status(500);
    } finally {
      sheet.seal();
    }
  });
};
