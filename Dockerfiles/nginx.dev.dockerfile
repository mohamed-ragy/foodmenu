FROM nginx:latest

# Arguments defined in docker-compose.yml
ARG user
ARG uid

# Create system user to run Composer and Artisan Commands
RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user

ADD ./Dockerfiles/nginx/foodmenu.key /etc/nginx/
ADD ./Dockerfiles/nginx/foodmenu.pem /etc/nginx/
ADD ./Dockerfiles/nginx/default.dev.conf /etc/nginx/conf.d/

RUN mkdir -p /var/www/foodmenu
RUN mkdir -p /var/www/foodmenu/storage/framework
RUN mkdir -p /var/www/foodmenu/storage/framework/cache
RUN mkdir -p /var/www/foodmenu/storage/framework/cache/data
RUN mkdir -p /var/www/foodmenu/storage/framework/sessions
RUN mkdir -p /var/www/foodmenu/storage/framework/testing
RUN mkdir -p /var/www/foodmenu/storage/framework/views
