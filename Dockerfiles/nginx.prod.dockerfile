# Use OpenResty (Nginx with Lua) as the base image
FROM openresty/openresty:alpine

# Install OpenSSL and other required packages
RUN apk update && apk add \
    openssl \
    perl \
    curl \
    git


# Arguments for user and UID passed from docker-compose.yml
ARG user=muha
ARG uid=1000

# Create a system user with the specified UID using Alpine's adduser
RUN adduser -u $uid -D -h /home/$user $user && \
    addgroup $user www-data

# Set up the home directory permissions for Composer
RUN mkdir -p /home/$user/.composer && \
    chown -R $user:www-data /home/$user

# Copy the Nginx configuration file to the container
ADD Dockerfiles/nginx/default.prod.conf /etc/nginx/conf.d/
ADD Dockerfiles/nginx/foodmenu.pem /etc/nginx/keys/
ADD Dockerfiles/nginx/foodmenu.key /etc/nginx/keys/

# Ensure SSL directory and set correct permissions (shared with PHP container)
RUN mkdir -p /etc/nginx/keys/websites && \
    chown -R $user:www-data /etc/nginx/keys/websites && \
    chmod -R 755 /etc/nginx/keys/websites

# Create the document root directory for the application
RUN mkdir -p /var/www/foodmenu

# Pre-create the nginx-client-body directory and set ownership
RUN mkdir -p /var/run/openresty/nginx-client-body && \
    chown -R $user:www-data /var/run/openresty

# Pre-create the logs directory and set ownership
RUN mkdir -p /usr/local/openresty/nginx/logs && \
    chown -R $user:www-data /usr/local/openresty/nginx/logs

# Expose HTTP and HTTPS ports
EXPOSE 80 443

# Switch to the application user
USER $user

# Start OpenResty (Nginx + Lua)
CMD ["openresty", "-g", "daemon off;"]
# CMD ["/usr/local/openresty/bin/openresty", "-g", "daemon off;"]
