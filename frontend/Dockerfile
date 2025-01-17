# frontend/Dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -D npm-run-all
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

