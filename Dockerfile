FROM node:18-alpine

WORKDIR /usr/app/todo_app

COPY package*.json .

COPY . .

RUN npm install --only=production

RUN rm package*.json

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]