FROM node:16.12.0 AS builder

WORKDIR /home/node
COPY --chown=node:node . .

ARG BUILD_EXPIRE=${BUILD_EXPIRE:-""}
ARG BUILD_DOMAIN=${BUILD_DOMAIN:-""}

USER node

RUN yarn install --network-timeout 1000000
RUN ./scripts/build.sh

FROM nginx:mainline-alpine

COPY --from=builder /home/node/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
