FROM php:8.4.8-fpm-bookworm

RUN apt-get update && \
    apt-get install -y \
        libxslt-dev \
        libxml2-dev \
        libzip-dev \
        zlib1g-dev \
        libonig-dev \
        libpng-dev && \
    docker-php-ext-install xsl xml mbstring mysqli gd zip && \
    useradd -u 6969 -ms /bin/bash editor && \
    curl -sS https://getcomposer.org/installer -o /tmp/composer-setup.php && \
    php /tmp/composer-setup.php --install-dir=/usr/local/bin \
       --filename=composer && \
    echo 'export PATH="/usr/local/bin:$PATH"' >> /home/editor/.bashrc

# _app dir is temporary, app dir is not written to till its time for execution
# this is to prevent the directory from being overwritten by the volume
WORKDIR /home/editor/app
COPY editor/ /home/editor/_app/
COPY database.php /home/editor/_app/application/config/
COPY php-fpm.conf /home/editor/_app/
COPY run_fpm.sh /home/editor/_app/

RUN mkdir /home/editor/app/logs && \
    touch /home/editor/_app/logs/php-fpm.log && \
    mv /home/editor/_app/composer.json /home/editor/app/. && \
    mv /home/editor/_app/composer.lock /home/editor/app/. && \
    chown -R editor:editor /home/editor/_app && \
    chown -R editor:editor /home/editor/app && \
    chmod -R 777 /home/editor/app && \
    chmod -R 775 /home/editor/_app/datafiles /home/editor/_app/files /home/editor/_app/logs && \
    chown -R editor:editor /usr/local/var/log && \
    chmod -R 775 /usr/local/var/log && \
    chmod +x /home/editor/_app/run_fpm.sh

USER editor
RUN composer install

CMD ["/home/editor/_app/run_fpm.sh"]