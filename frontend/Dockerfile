# Use an official Node runtime as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /TechMentor/frontend

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that the Vite server will run on
EXPOSE 5173

# Start the Vite development server
CMD ["npm", "run", "dev"]
