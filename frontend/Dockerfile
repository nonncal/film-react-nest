FROM node:20-alpine as builder 

WORKDIR /app

COPY . .

RUN npm ci 

RUN npm run build 

FROM node:20-alpine as production

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist /dist

RUN npm ci 

CMD [ "npm", "run", "dev" ]

