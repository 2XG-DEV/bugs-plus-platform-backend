import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import dotenv from "dotenv";

dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const challenges = [
  {
    title: "Incrementor",
    description: "Build a board that adds 1 to the input value.",
    content:
      "Given an input X, construct a Bug+ board that outputs X + 1. The Out port should contain the result. If the result is zero, Left should be 1 and Right should be 0; otherwise Left should be 0 and Right should be 1.",
    examples: [
      { xValue: 5, yValue: 0, expectedValue: 6 },
      { xValue: -3, yValue: 0, expectedValue: -2 },
      { xValue: 0, yValue: 0, expectedValue: 1 },
    ],
    testCases: [
      { xValue: 10, yValue: 0, expectedValue: 11 },
      { xValue: -1, yValue: 0, expectedValue: 0 },
      { xValue: 999, yValue: 0, expectedValue: 1000 },
      { xValue: -1000, yValue: 0, expectedValue: -999 },
    ],
  },
  {
    title: "Decrementor",
    description: "Build a board that subtracts 1 from the input value.",
    content:
      "Given an input X, construct a Bug+ board that outputs X - 1. The Out port should contain the result.",
    examples: [
      { xValue: 5, yValue: 0, expectedValue: 4 },
      { xValue: 0, yValue: 0, expectedValue: -1 },
      { xValue: -3, yValue: 0, expectedValue: -4 },
    ],
    testCases: [
      { xValue: 10, yValue: 0, expectedValue: 9 },
      { xValue: 1, yValue: 0, expectedValue: 0 },
      { xValue: -999, yValue: 0, expectedValue: -1000 },
      { xValue: 1000, yValue: 0, expectedValue: 999 },
    ],
  },
  {
    title: "Is Zero",
    description:
      "Build a board that checks if the sum of two inputs equals zero.",
    content:
      "Given inputs X and Y, construct a Bug+ board that checks whether X + Y equals zero. If it does, Right should be 1, Left should be 0, and Out should be 0. If it does not, Left should be 1 and Right should be 0.",
    examples: [
      { xValue: 3, yValue: -3, expectedValue: 0 },
      { xValue: 5, yValue: 2, expectedValue: 7 },
      { xValue: 0, yValue: 0, expectedValue: 0 },
    ],
    testCases: [
      { xValue: 10, yValue: -10, expectedValue: 0 },
      { xValue: -5, yValue: 5, expectedValue: 0 },
      { xValue: 1, yValue: 1, expectedValue: 2 },
      { xValue: -3, yValue: -3, expectedValue: -6 },
    ],
  },
  {
    title: "Increment by Two",
    description: "Build a board that adds 2 to the input value.",
    content:
      "Given an input X, construct a Bug+ board that outputs X + 2. The Out port should contain the result.",
    examples: [
      { xValue: 5, yValue: 0, expectedValue: 7 },
      { xValue: -3, yValue: 0, expectedValue: -1 },
      { xValue: 0, yValue: 0, expectedValue: 2 },
    ],
    testCases: [
      { xValue: 10, yValue: 0, expectedValue: 12 },
      { xValue: -2, yValue: 0, expectedValue: 0 },
      { xValue: 998, yValue: 0, expectedValue: 1000 },
      { xValue: -1000, yValue: 0, expectedValue: -998 },
    ],
  },
  {
    title: "Decrement by Two",
    description: "Build a board that subtracts 2 from the input value.",
    content:
      "Given an input X, construct a Bug+ board that outputs X - 2. The Out port should contain the result.",
    examples: [
      { xValue: 5, yValue: 0, expectedValue: 3 },
      { xValue: 0, yValue: 0, expectedValue: -2 },
      { xValue: -3, yValue: 0, expectedValue: -5 },
    ],
    testCases: [
      { xValue: 10, yValue: 0, expectedValue: 8 },
      { xValue: 2, yValue: 0, expectedValue: 0 },
      { xValue: -998, yValue: 0, expectedValue: -1000 },
      { xValue: 1000, yValue: 0, expectedValue: 998 },
    ],
  },
  {
    title: "Assignment",
    description: "Build a board that passes the input value through unchanged.",
    content:
      "Given an input X, construct a Bug+ board where Out equals X and Left equals 1. This is a basic identity/assignment operation.",
    examples: [
      { xValue: 5, yValue: 0, expectedValue: 5 },
      { xValue: -3, yValue: 0, expectedValue: -3 },
      { xValue: 0, yValue: 0, expectedValue: 0 },
    ],
    testCases: [
      { xValue: 42, yValue: 0, expectedValue: 42 },
      { xValue: -100, yValue: 0, expectedValue: -100 },
      { xValue: 999, yValue: 0, expectedValue: 999 },
      { xValue: 1, yValue: 0, expectedValue: 1 },
    ],
  },
  {
    title: "Change Sign",
    description: "Build a board that negates the input value (multiply by -1).",
    content:
      "Given an input X, construct a Bug+ board that outputs X * -1. The Out port should contain the negated value.",
    examples: [
      { xValue: 5, yValue: 0, expectedValue: -5 },
      { xValue: -3, yValue: 0, expectedValue: 3 },
      { xValue: 0, yValue: 0, expectedValue: 0 },
    ],
    testCases: [
      { xValue: 10, yValue: 0, expectedValue: -10 },
      { xValue: -20, yValue: 0, expectedValue: 20 },
      { xValue: 1, yValue: 0, expectedValue: -1 },
      { xValue: -1, yValue: 0, expectedValue: 1 },
    ],
  },
  {
    title: "Subtraction",
    description: "Build a board that subtracts Y from X.",
    content:
      "Given inputs X and Y, construct a Bug+ board that outputs X - Y. The Out port should contain the result.",
    examples: [
      { xValue: 10, yValue: 3, expectedValue: 7 },
      { xValue: 5, yValue: 5, expectedValue: 0 },
      { xValue: -3, yValue: 4, expectedValue: -7 },
    ],
    testCases: [
      { xValue: 20, yValue: 10, expectedValue: 10 },
      { xValue: -5, yValue: -5, expectedValue: 0 },
      { xValue: 0, yValue: 15, expectedValue: -15 },
      { xValue: 15, yValue: 0, expectedValue: 15 },
    ],
  },
  {
    title: "Equality",
    description: "Build a board that checks if two values are equal.",
    content:
      "Given inputs X and Y, construct a Bug+ board that checks whether X equals Y. If they are equal, Right should be 1. If they are not equal, Left should be 1.",
    examples: [
      { xValue: 5, yValue: 5, expectedValue: 1 },
      { xValue: 3, yValue: 7, expectedValue: 0 },
      { xValue: -2, yValue: -2, expectedValue: 1 },
    ],
    testCases: [
      { xValue: 0, yValue: 0, expectedValue: 1 },
      { xValue: 10, yValue: -10, expectedValue: 0 },
      { xValue: -15, yValue: -15, expectedValue: 1 },
      { xValue: 1, yValue: 2, expectedValue: 0 },
    ],
  },
  {
    title: "Is Larger",
    description: "Build a board that checks if X is greater than Y.",
    content:
      "Given inputs X and Y, construct a Bug+ board that checks whether X > Y. If X is larger, Right should be 1. Otherwise (including when equal), Left should be 1.",
    examples: [
      { xValue: 10, yValue: 5, expectedValue: 1 },
      { xValue: 3, yValue: 7, expectedValue: 0 },
      { xValue: 5, yValue: 5, expectedValue: 0 },
    ],
    testCases: [
      { xValue: 20, yValue: 10, expectedValue: 1 },
      { xValue: -5, yValue: -10, expectedValue: 1 },
      { xValue: 0, yValue: 0, expectedValue: 0 },
      { xValue: -1, yValue: 1, expectedValue: 0 },
    ],
  },
  {
    title: "Multiplication",
    description: "Build a board that multiplies two input values.",
    content:
      "Given inputs X and Y, construct a Bug+ board that outputs X * Y. The Out port should contain the product.",
    examples: [
      { xValue: 3, yValue: 4, expectedValue: 12 },
      { xValue: -2, yValue: 5, expectedValue: -10 },
      { xValue: 0, yValue: 100, expectedValue: 0 },
    ],
    testCases: [
      { xValue: 7, yValue: 7, expectedValue: 49 },
      { xValue: -3, yValue: -3, expectedValue: 9 },
      { xValue: 20, yValue: 0, expectedValue: 0 },
      { xValue: -10, yValue: 2, expectedValue: -20 },
    ],
  },
];

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.testCase.deleteMany();
  await prisma.example.deleteMany();
  await prisma.challenge.deleteMany();

  for (const challenge of challenges) {
    await prisma.challenge.create({
      data: {
        title: challenge.title,
        description: challenge.description,
        content: challenge.content,
        examples: {
          create: challenge.examples,
        },
        testCases: {
          create: challenge.testCases,
        },
      },
    });
    console.log(`  Created challenge: ${challenge.title}`);
  }

  console.log(`Seeded ${challenges.length} challenges.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
