FROM php:8.3.4RC1-fpm-bullseye

# Arguments defined in docker-compose.yml
ARG user
ARG uid

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libwebp-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libcurl4-openssl-dev \
    pkg-config \
    libssl-dev


# Clear cache

RUN pecl install mongodb 
RUN echo "extension=mongodb.so" > $PHP_INI_DIR/conf.d/mongodb.ini

# Install PHP extensions
# RUN docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd
# RUN apt-get update && apt-get install -y libpq-dev && docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd
RUN set -e; \
    docker-php-ext-configure gd --with-jpeg --with-webp --with-freetype; \
    docker-php-ext-install -j$(nproc) gd && docker-php-ext-enable gd
# RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd
RUN docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath

RUN apt-get clean && rm -rf /var/lib/apt/lists/*


# Clear cache
#RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Get latest Composer
COPY --from=composer:2.6.5 /usr/bin/composer /usr/local/bin/composer

# Create system user to run Composer and Artisan Commands
RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user

# Set working directory
WORKDIR /var/www/foodmenu

USER $user
