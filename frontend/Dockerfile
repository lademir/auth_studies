FROM node:alpine

# creating app folden in the docker container


WORKDIR /usr/src/frontend

# installing dependencies
COPY package*.json ./
RUN npm install


# Copy in the source code
COPY . .

# expose port
EXPOSE 3000

# running the application on dev mode
CMD ["npm", "run", "dev"]