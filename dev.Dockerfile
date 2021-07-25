FROM node:16-alpine3.11

WORKDIR /var/www

ARG YANDEX_METRIKA_ID
ENV YANDEX_METRIKA_ID $YANDEX_METRIKA_ID

ARG API_BASE_PATH
ENV API_BASE_PATH $API_BASE_PATH

ARG DOCKER_API_BASE_PATH
ENV DOCKER_API_BASE_PATH $DOCKER_API_BASE_PATH

ARG FIREBASE_API_KEY
ENV FIREBASE_API_KEY $FIREBASE_API_KEY

ARG FIREBASE_AUTH_DOMAIN
ENV FIREBASE_AUTH_DOMAIN $FIREBASE_AUTH_DOMAIN

ARG FIREBASE_DATABASE_URL
ENV FIREBASE_DATABASE_URL $FIREBASE_DATABASE_URL

ARG FIREBASE_PROJECT_ID
ENV FIREBASE_PROJECT_ID $FIREBASE_PROJECT_ID

ARG FIREBASE_STORAGE_BUCKET
ENV FIREBASE_STORAGE_BUCKET $FIREBASE_STORAGE_BUCKET

ARG FIREBASE_MESSAGING_SENDER_ID
ENV FIREBASE_MESSAGING_SENDER_ID $FIREBASE_MESSAGING_SENDER_ID

ARG FIREBASE_APP_ID
ENV FIREBASE_APP_ID $FIREBASE_APP_ID

ARG YANDEX_METRIKA_ID
ENV YANDEX_METRIKA_ID $YANDEX_METRIKA_ID

COPY . /var/www
RUN rm package-lock.json && npm i

ENV HOST 0.0.0.0

CMD ["npm", "run", "dev"]
