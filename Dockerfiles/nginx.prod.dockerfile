FROM nginx:1.24.0

# Arguments defined in docker-compose.yml
ARG user
ARG uid

# Create system user to run Composer and Artisan Commands
RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user

ADD /nginx/default.prod.conf /etc/nginx/conf.d/
ADD /nginx/foodmenu.pem /etc/nginx/keys/
ADD /nginx/foodmenu.key /etc/nginx/keys/

RUN mkdir -p /var/www/foodmenu
