# https://stackoverflow.com/questions/28599571/add-or-copy-a-folder-in-docker
FROM node:18-alpine
WORKDIR /app
COPY package*.json .
COPY ./src ./src
RUN npm ci
CMD ["npm", "run", "start"]