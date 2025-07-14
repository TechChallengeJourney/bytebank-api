FROM node:20.16.0-alpine
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./

RUN npm install
COPY . .

RUN npm run build

EXPOSE 8080
CMD ["node", "dist/app.js"]