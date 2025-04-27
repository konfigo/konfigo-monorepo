FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

RUN pnpm install --frozen-lockfile
RUN pnpm rebuild

RUN pnpm run build

FROM node:22-slim AS production

WORKDIR /app

COPY --from=base /app/dist /app
COPY --from=base /app/node_modules /app/node_modules
 
EXPOSE 3000

CMD ["node", "main.js"]