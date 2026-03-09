FROM node:20-alpine as builder

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

FROM node:20-alpine as production

WORKDIR /app

COPY --from=builder /app/package*.json ./

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/piblic ./public

RUN npm ci --omit=dev

EXPOSE 3000

CMD ["node", "dist/main"]

