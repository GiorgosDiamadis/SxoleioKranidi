FROM node:12.4.0

WORKDIR /app/server

COPY ["package.json","./"]

RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["npm","start"]
