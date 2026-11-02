FROM node:22-alpine

# openssl is needed by Prisma's migration engine
RUN apk add --no-cache openssl

WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

# On every start: apply migrations, (re)load the seed data, start the server.
CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && npm start"]
