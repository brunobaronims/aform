# syntax=docker/dockerfile:1

FROM node:18-alpine as build

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package*.json ./

EXPOSE 3000

RUN npm ci

COPY . .

ENV NODE_ENV production

RUN npm run build

## Bugfix
##COPY ./node_modules/next/dist/compiled/jest-worker ./.next/standalone/node_modules/next/dist/compiled/jest-worker

FROM node:18-alpine as production

WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=build /app/public ./public

COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

EXPOSE 3000

ENV HOST=127.0.0.1

USER nextjs

CMD ["node", "server.js"]
