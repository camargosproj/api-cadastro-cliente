## DEVELOPMENT STAGE

FROM node:18 As development

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY package*.json pnpm-lock.yaml ./

RUN pnpm install 

COPY . .



CMD [ "pnpm", "start:dev"]

## PRODUCTION STAGE

FROM node:18 As production


ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

RUN pnpm add -g pm2

COPY package*.json pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile


COPY . .



RUN pnpm build

RUN pnpm prune --prod



CMD [ "pm2-runtime", "dist/main.js"]