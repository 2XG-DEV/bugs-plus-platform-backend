# ---- Development ----
FROM node:20-alpine AS dev

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY prisma ./prisma
COPY prisma.config.ts ./
COPY tsconfig.json ./

ENV DATABASE_URL="postgresql://postgres:password@db:5432/bugsplus"
RUN npx prisma generate

# Source code is mounted as a volume for hot reloading (see docker-compose)
EXPOSE 3001

CMD ["npx", "nodemon", "--exec", "tsx", "app/index.ts"]

# ---- Production ----
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY prisma ./prisma
COPY prisma.config.ts ./
COPY tsconfig.json ./

ENV DATABASE_URL="postgresql://postgres:password@db:5432/bugsplus"
RUN npx prisma generate

COPY . .
RUN npm run build

FROM node:20-alpine AS prod

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=build /app/public ./public
COPY --from=build /app/generated ./generated
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/prisma.config.ts ./

EXPOSE 3001

CMD ["node", "public/app/index.js"]
