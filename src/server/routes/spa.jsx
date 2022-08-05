import { join, resolve } from "path";

import { ChunkExtractManager, ChunkExtractor } from '@loadable/server'
import fastifyStatic from "fastify-static";
import React from "react";
import { renderToString } from 'react-dom/server';
import { StaticRouter } from "react-router-dom/server";
import { ServerStyleSheet } from 'styled-components';

import { App } from "../../client/foundation/App";

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
    const sheet = new ServerStyleSheet();

    const statsFile = resolve('./dist/public/loadable-stats.json');

    const extractor = new ChunkExtractor({
      statsFile,
    });

    try {
      const app = renderToString(sheet.collectStyles(
        <ChunkExtractManager extractor={extractor}>
          <StaticRouter location={req.url}>
            <App />
          </StaticRouter>
        </ChunkExtractManager>
      ));
      const style = sheet.getStyleTags();
      const scriptTags = extractor.getScriptTags();
      const linkTags = extractor.getLinkTags();

      const header = `
      <html lang="ja">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>CyberTicket</title>
          ${linkTags}
          ${style}
          ${scriptTags}
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
