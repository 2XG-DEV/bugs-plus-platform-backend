import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

app.use(cors());

app.get("/challenges", async (req: Request, res: Response) => {
  const challenges = await prisma.challenge.findMany({});
  if (challenges) {
    res.json(challenges);
  } else {
    res.status(404).send("No challenges found");
  }
});

app.get("/challenges/:title", async (req: Request<{ title: string }>, res: Response) => {
  const title = req.params.title;
  const challenge = await prisma.challenge.findUnique({
    where: {
      title,
    },
    include: {
      examples: true,
    },
  });
  if (challenge) {
    res.json(challenge);
  } else {
    res.status(404).send("No challenge found");
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
