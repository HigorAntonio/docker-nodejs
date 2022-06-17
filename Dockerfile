FROM node:16.15.1-alpine
WORKDIR /app
COPY package.json .
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
      then yarn install; \
      else yarn install --production; \
      fi
COPY . ./
EXPOSE 3333
CMD ["node", "./src/server.js"]
