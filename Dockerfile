FROM node:22-alpine

# create system user and add it to the group
RUN addgroup app && adduser -S -G app app

# set user to run app
USER app

# set the working directory to /app
WORKDIR /app

# copy package json and package.json before copyx the rest of the file
COPY package*.json ./

# changx oowner back to root
USER root

# change owner of app directory to app user
RUN chown -R app:app /app

# chnage user back to app
USER app

# install dependencies
RUN npm install

# copy the rest of the application code
COPY . .

# expose the port the app runs on
EXPOSE 5173

# command to run the app
CMD ["npm", "run", "dev"]