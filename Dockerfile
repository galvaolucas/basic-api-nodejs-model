FROM node:18-alpine as development

WORKDIR /usr/src/app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn

COPY . .

RUN yarn build

FROM node:18-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV={NODE_ENV}

WORKDIR /usr/src/app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install --frozen-lockfile

COPY --from=development /usr/src/app/dist ./dist

EXPOSE $PORT

#CMD ["sh", "-c", "yarn typeorm migration:run && yarn dev:server"]

CMD ["yarn", "start:prod"]
