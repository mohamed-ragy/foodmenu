FROM php:8.1-fpm


ARG user
ARG uid


RUN apt-get update && apt-get install -y \
    git \
    zip \
    unzip \
    curl \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libwebp-dev \
    libonig-dev \
    libxml2-dev \

    libcurl4-openssl-dev \
    pkg-config \
    libssl-dev \

    libzip-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg  --with-webp\
    && docker-php-ext-install -j$(nproc) gd pdo_mysql zip\
    && pecl install mongodb\
    && echo "extension=mongodb.so" > $PHP_INI_DIR/conf.d/mongodb.ini



RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN apt-get clean && rm -rf /var/lib/apt/lists/*



RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user

# Set working directory
WORKDIR /var/www/foodmenu

USER $user

