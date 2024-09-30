FROM php:8.2-fpm-bullseye

# Define build arguments with default values
ARG user=muha
ARG uid=1000

# Install necessary packages
RUN apt-get update && apt-get install -y --no-install-recommends \
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
    libmagickwand-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install -j$(nproc) gd pdo_mysql zip

# Install PECL extensions
RUN pecl install mongodb \
    && echo "extension=mongodb.so" > $PHP_INI_DIR/conf.d/mongodb.ini \
    && pecl install imagick \
    && docker-php-ext-enable imagick \
    && pecl clear-cache

# Install Composer (latest stable version)
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Create application user without adding to root group
RUN useradd -m -u $uid -s /bin/bash $user \
    && usermod -aG www-data $user \
    && mkdir -p /home/$user/.composer \
    && chown -R $user:www-data /home/$user/.composer

# Create /var/ssl directory and set permissions
RUN mkdir -p /var/ssl \
    && chown -R $user:www-data /var/ssl \
    && chmod 755 /var/ssl

# Set working directory
WORKDIR /var/www/foodmenu

# Copy application code with correct ownership
COPY --chown=muha:www-data ./src /var/www/foodmenu

# Switch to the application user
USER muha

# Install Composer dependencies
RUN composer install --no-dev --optimize-autoloader

# Expose ports if necessary (optional)
EXPOSE 9000

# Start the PHP-FPM process
CMD ["php-fpm"]