FROM node:18-alpine AS base

RUN apk update && apk add --no-cache libc6-compat

#########################################################################

FROM base AS builder

WORKDIR /app

COPY . .

RUN npm install -g turbo@2
RUN turbo prune --scope=web --docker

#########################################################################

FROM base AS installer

WORKDIR /app

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/full/ .

RUN npm install -g pnpm@9 && pnpm install --frozen-lockfile --ignore-scripts
RUN pnpm turbo run build --filter=web

#########################################################################

FROM base AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

EXPOSE 3000

CMD ["node", "apps/web/server.js"]
