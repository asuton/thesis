FROM node:12-alpine  
RUN apk --no-cache add --virtual builds-deps build-base python
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "run", "dev"]