FROM node:alpine

WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .

# RUN npm install -g yarn
RUN yarn install
COPY . .

RUN yarn run build

EXPOSE 3000
CMD ["yarn", "run", "start"]
