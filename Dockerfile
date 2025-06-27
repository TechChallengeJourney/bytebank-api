FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps && npm cache clean --force
COPY . .
EXPOSE 8080
CMD ["node", "src/app.js"]