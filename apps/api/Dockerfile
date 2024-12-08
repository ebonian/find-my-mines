FROM node:18-alpine AS base

RUN apk update && apk add --no-cache libc6-compat

#########################################################################

FROM base AS builder

WORKDIR /app

COPY . .

RUN npm install -g turbo@2
RUN turbo prune --scope=api --docker

#########################################################################

FROM base AS installer

WORKDIR /app

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/full/ .

RUN npm install -g pnpm@9 && pnpm install --frozen-lockfile --ignore-scripts
RUN pnpm turbo run build --filter=api

#########################################################################

FROM base AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 expressjs && adduser --system --uid 1001 expressjs
USER expressjs

COPY --from=installer --chown=expressjs:nodejs /app .

EXPOSE 3001

CMD ["node", "apps/api/dist/index.js"]