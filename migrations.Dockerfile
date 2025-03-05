FROM node:18-alpine as base

FROM base as migrator
WORKDIR /app

RUN npm i -g pnpm@9

COPY . .

RUN pnpm i --frozen-lockfile
RUN pnpm run prisma:generate

CMD ["pnpm", "run", "prisma:migrate"]
