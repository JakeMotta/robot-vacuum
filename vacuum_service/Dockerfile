FROM node:16

# Set the working directory
WORKDIR /

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Start the application
CMD [ "npm", "start" ]