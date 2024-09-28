# Use OpenResty (Nginx with Lua) as the base image
FROM openresty/openresty:alpine

# Install OpenSSL for SSL support
RUN apk update && apk add openssl

# Arguments for user and UID passed from docker-compose.yml
ARG user
ARG uid

# Create a system user with the specified UID using Alpine's adduser
RUN adduser -u $uid -D -h /home/$user $user && \
    addgroup $user www-data && \
    addgroup $user root

# Set up the home directory permissions for Composer
RUN mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user

# Copy the Nginx configuration file to the container
ADD /nginx/default.prod.conf /etc/nginx/conf.d/

# Create the document root directory for the application
RUN mkdir -p /var/www/foodmenu

# Expose HTTP and HTTPS ports
EXPOSE 80 443

# Start OpenResty (Nginx + Lua)
CMD ["openresty", "-g", "daemon off;"]
