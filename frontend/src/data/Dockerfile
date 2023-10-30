FROM node:18-alpine3.15

COPY . .

RUN npm install -g json-server

EXPOSE 3001

ENTRYPOINT [ "json-server", "--watch", "db.json", "--port", "3001", "--host", "0.0.0.0" ]