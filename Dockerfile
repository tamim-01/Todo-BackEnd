FROM node:20.12.2

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy the .env file
COPY .env .

# Build the application (if needed)
# RUN npm run build

# Expose the port
EXPOSE ${MY_PORT}

# Set environment variables
ENV NODE_ENV=${NODE_ENV}
ENV PGPORT=${PGPORT}
ENV PGHOST=${PGHOST}
ENV PGDATABASE=${PGDATABASE}
ENV PGUSER=${PGUSER}
ENV PGPASSWORD=${PGPASSWORD}
ENV ENDPOINT_ID=${ENDPOINT_ID}
ENV PGSSL=${PGSSL}
ENV BCRYPT_ROUNDS=${BCRYPT_ROUNDS}
ENV SIGN_KEY=${SIGN_KEY}

# Start the application
CMD ["npm", "start"]