import moment from "moment";
import zenginCode from "zengin-code";
import { Between, LessThanOrEqual, MoreThanOrEqual } from "typeorm";

import { BettingTicket, Race, User } from "../../model/index.js";
import { createConnection } from "../typeorm/connection.js";
import { initialize } from "../typeorm/initialize.js";

/**
 * @type {import('fastify').FastifyPluginCallback}
 */
export const apiRoute = async (fastify) => {
  const conn = await createConnection();

  fastify.get("/users/me", async (req, res) => {
    const repo = conn.getRepository(User);

    res.header("Cache-Control", "no-cache, no-store");
    if (req.user != null) {
      res.send(req.user);
    } else {
      const user = await repo.save(new User());
      res.send(user);
    }
  });

  fastify.post("/users/me/charge", async (req, res) => {
    if (req.user == null) {
      throw fastify.httpErrors.unauthorized();
    }

    const { amount } = req.body;
    if (typeof amount !== "number" || amount <= 0) {
      throw fastify.httpErrors.badRequest();
    }

    const repo = conn.getRepository(User);

    req.user.balance += amount;
    await repo.save(req.user);

    res.header("Cache-Control", "no-cache, no-store");
    res.status(204).send();
  });

  fastify.get("/races", async (req, res) => {
    const since =
      req.query.since != null ? moment.unix(req.query.since) : undefined;
    const until =
      req.query.until != null ? moment.unix(req.query.until) : undefined;

    if (since != null && !since.isValid()) {
      throw fastify.httpErrors.badRequest();
    }
    if (until != null && !until.isValid()) {
      throw fastify.httpErrors.badRequest();
    }

    const repo = conn.getRepository(Race);

    const where = {};
    if (since != null && until != null) {
      Object.assign(where, {
        startAt: Between(
          since.utc().format("YYYY-MM-DD HH:mm:ss"),
          until.utc().format("YYYY-MM-DD HH:mm:ss"),
        ),
      });
    } else if (since != null) {
      Object.assign(where, {
        startAt: MoreThanOrEqual(since.utc().format("YYYY-MM-DD HH:mm:ss")),
      });
    } else if (until != null) {
      Object.assign(where, {
        startAt: LessThanOrEqual(until.utc().format("YYYY-MM-DD HH:mm:ss")),
      });
    }

    const races = await repo.find({
      order: {
        startAt: 'ASC',
      },
      where
    });

    res.header("Cache-Control", "no-cache, no-store");
    res.send({ races });
  });

  fastify.get("/races/:raceId", async (req, res) => {
    const repo = conn.getRepository(Race);

    const race = await repo.findOne(req.params.raceId);

    if (race === undefined) {
      throw fastify.httpErrors.notFound();
    }

    res.header("Cache-Control", "no-cache, no-store");
    res.send(race);
  });

  fastify.get("/races/:raceId/card", async (req, res) => {
    const repo = conn.getRepository(Race);

    const race = await repo.findOne(req.params.raceId, {
      relations: ["entries", "entries.player"],
    });

    if (race === undefined) {
      throw fastify.httpErrors.notFound();
    }

    res.header("Cache-Control", "no-cache, no-store");
    res.send(race);
  });

  fastify.get("/races/:raceId/odds", async (req, res) => {
    const repo = conn.getRepository(Race);

    const race = await repo.findOne(req.params.raceId, {
      relations: ["entries", "entries.player", "trifectaOdds"],
    });

    if (race === undefined) {
      throw fastify.httpErrors.notFound();
    }

    res.header("Cache-Control", "no-cache, no-store");
    res.send(race);
  });

  fastify.get("/races/:raceId/betting-tickets", async (req, res) => {
    if (req.user == null) {
      throw fastify.httpErrors.unauthorized();
    }

    const repo = conn.getRepository(BettingTicket);
    // TODO: createdAtをみてキャッシュさせる
    const bettingTickets = await repo.find({
      where: {
        race: {
          id: req.params.raceId,
        },
        user: {
          id: req.user.id,
        },
      },
    });

    res.header("Cache-Control", "no-cache, no-store");
    res.send({
      bettingTickets,
    });
  });

  fastify.get("/zengin", async (_, res) => {
    res.header('cache-control', 'max-age=604800');
    res.send(zenginCode);
  });

  fastify.post("/races/:raceId/betting-tickets", async (req, res) => {
    if (req.user == null) {
      throw fastify.httpErrors.unauthorized();
    }

    if (req.user.balance < 100) {
      throw fastify.httpErrors.preconditionFailed();
    }

    if (typeof req.body.type !== "string") {
      throw fastify.httpErrors.badRequest();
    }

    if (
      !Array.isArray(req.body.key) ||
      req.body.key.some((n) => typeof n !== "number")
    ) {
      throw fastify.httpErrors.badRequest();
    }

    const bettingTicketRepo = conn.getRepository(
      BettingTicket,
    );
    const bettingTicket = await bettingTicketRepo.save(
      new BettingTicket({
        key: req.body.key,
        race: {
          id: req.params.raceId,
        },
        type: req.body.type,
        user: {
          id: req.user.id,
        },
      }),
    );

    const userRepo = conn.getRepository(User);
    req.user.balance -= 100;
    await userRepo.save(req.user);

    res.header("Cache-Control", "no-cache, no-store");
    res.send(bettingTicket);
  });

  fastify.post("/initialize", async (_req, res) => {
    await initialize();
    res.status(204).send();
  });
};
