#!/bin/bash

cd /home/editor/app
php-fpm -y /home/editor/_app/php-fpm.conf -t
cp -r /home/editor/_app/* /home/editor/app

php-fpm -y /home/editor/app/php-fpm.conf