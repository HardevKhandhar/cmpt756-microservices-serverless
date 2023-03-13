FROM node:lts-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY . /usr/src/app
#orders
EXPOSE 8080
ENV MONGODB_URI mongodb+srv://Rithik:123456abc@cluster0.x7lwnt0.mongodb.net/?retryWrites=true&w=majority
CMD [ "node", "orders.js" ]
