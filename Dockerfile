FROM nginx:stable321321

# Set the working directory
WORKDIR /usr/share/nginx/html

# Remove default Nginx static resources
RUN rm -rf ./*

# Copy the built Angular app from the local 'dist' directory
COPY dist/ .

# Expose the default Nginx port
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
