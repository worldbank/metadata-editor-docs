# Docker installation

### Create a directory somewhere and cd to it, its going to be our docker working dir
### Make directories to contain nginx and mariadb configurations
```bash
mkdir mariadb nginx
```

### mariadb dir will need ```50-server.cnf``` and ```init.sql``` nginx dir will need ```nginx.conf```
### Other required files are ``Dockerfiles``, ``Docker compose file``, ``php-fpm.conf``, ``run_fpm.sh`` the script to the php service
### Just copy-paste everything from this dir
### Create volumes to contain database and php project
```bash
sudo docker volume create database
sudo docker volume create app
```

### Clone from git. The commits below were working as of writing, so I'll checkout to them
```bash
git clone --branch main https://github.com/mah0001/pydatatools
cd pydatatools && git checkout a1ac7ffab4733ea9920f1f24b610bddd0914dca0

cd ..

git clone --branch main https://github.com/ihsn/editor
cd editor && git checkout 897970a86bddf1d4831f8c9a0ca0e54c99fa120b
cd ..
```

### Move your database file here and edit it to your hearts content.
```bash
mv editor/application/config/database.sample.php database.php
vim database.php
```
### The values below for database configuration work with the files I've provided
```php
<?php
$active_group = 'default';
$query_builder = TRUE;

$db['default'] = array(
        'dsn'   => '',
        'hostname' => '192.168.199.2',
        'username' => 'editor',
        'password' => 'Editor123',
        'database' => 'metadata_editor',
        'dbdriver' => 'mysqli',
        'dbprefix' => '',
        'pconnect' => FALSE,
        'db_debug' => FALSE,
        'cache_on' => FALSE,
        'cachedir' => '',
        'char_set' => 'utf8',
        'dbcollat' => 'utf8_general_ci',
        'swap_pre' => '',
        'encrypt' => FALSE,
        'compress' => FALSE,
        'stricton' => FALSE,
        'failover' => array(),
        'save_queries' => TRUE
);
```

### Build docker your docker images
```bash
sudo docker build -f editor.Dockerfile -t editor .
sudo docker build -f pydatatools.Dockerfile -t pydatatools .
```

### Go ahead and run your services. This should take some time but look for the following
```bash
sudo docker compose up
```
```
mariadb-1      | 2025-06-08 02:04:06+05:00 [Note] [Entrypoint]: /usr/local/bin/docker-entrypoint.sh: running /docker-entrypoint-initdb.d/init.sql
mariadb-1      |
mariadb-1      |
mariadb-1      | 2025-06-08  2:04:06 0 [Note] mariadbd (initiated by: unknown): Normal shutdown
mariadb-1      | 2025-06-08 02:04:06+05:00 [Note] [Entrypoint]: Stopping temporary server
```
### that means the init script for the database has been executed and now there shouldn't be any issues in connecting to the php service
### Try vising http://yourapp/index.php now
