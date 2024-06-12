FROM node:alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

FROM gcr.io/distroless/nodejs18

WORKDIR /app

COPY --from=build /app /app

CMD ["app.js"]
