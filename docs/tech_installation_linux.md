# Installation (Linux server)

Step-by-step installation of the Metadata Editor and FastAPI service on a Linux server using Apache or NGINX with PHP-FPM and MySQL/MariaDB.

Start with [Installation overview](/tech_installation.html) for components and folder layout. After this guide, complete [Install and configure the FastAPI service](/tech_installation_data_api.html) and [Post-install configuration](/tech_post_install_configuration.html).


## Prerequisites

| Component | Version |
|-----------|---------|
| OS | Ubuntu 20.04+, Debian 11+, RHEL/Rocky 8+, or similar |
| PHP | 8.2+ with FPM; extensions: `mysqli`, `xsl`, `xml`, `mbstring`, `curl`, `openssl`, `zip` |
| MySQL / MariaDB | 8.x / 10.x+ |
| Python | 3.11+ (for FastAPI service) |
| Web server | Apache 2.4+ or NGINX |

Install PHP and extensions via your distribution packages (e.g. `php-fpm`, `php-mysql`, `php-xml`, `php-mbstring`, `php-curl`, `php-zip`). Ensure `php-fpm` is enabled and running.


## Step 1: Create directory layout

```bash
sudo mkdir -p /var/www/metadata-editor
cd /var/www/metadata-editor
```

Target layout:

```
/var/www/metadata-editor/
├── editor/     ← Metadata Editor (index.php lives here)
└── fastapi/    ← FastAPI service
```


## Step 2: Download source

```bash
git clone https://github.com/worldbank/metadata-editor editor
git clone https://github.com/worldbank/metadata-editor-fastapi fastapi
```

Or extract release archives into `editor/` and `fastapi/`.


## Step 3: Database

```bash
sudo mysql -u root -p
```

```sql
CREATE DATABASE metadata_editor CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'editor_user'@'localhost' IDENTIFIED BY 'replace-with-strong-password';
GRANT ALL PRIVILEGES ON metadata_editor.* TO 'editor_user'@'localhost';
FLUSH PRIVILEGES;
```

Configure the editor:

```bash
cp editor/application/config/database.sample.php editor/application/config/database.php
```

Edit `database.php` — set `hostname`, `username`, `password`, and `database`.


## Step 4: Permissions

The web server user (often `www-data` on Debian/Ubuntu) needs read access to the editor code and read/write access to data directories:

```bash
cd /var/www/metadata-editor/editor
sudo chown -R www-data:www-data datafiles files logs
sudo chmod -R 775 datafiles files logs
```

Create `datafiles` if missing. If you use a custom `storage_path` in `editor.php`, apply the same ownership to that path.


## Step 5: Web server

Point the document root (or an alias) at **`/var/www/metadata-editor/editor`**, not the parent folder.

### NGINX (example)

Create a site config (adjust `server_name` and PHP socket path):

```nginx
server {
    listen 80;
    server_name metadata-editor.example.org;
    root /var/www/metadata-editor/editor;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
    }
}
```

Enable the site and reload NGINX.

For optional clean URLs (hide `index.php` in the browser), see [Clean URLs](/tech_installation_clean_urls.html).

### Apache (example)

Enable `mod_rewrite`. Set `DocumentRoot` to `/var/www/metadata-editor/editor`. Allow `.htaccess` overrides if the application uses them.

For optional clean URLs, see [Clean URLs](/tech_installation_clean_urls.html).

Detailed PHP setup: [PHP installation](/tech_installation_php.html) (Linux section).


## Step 6: Run the web installer

1. Open `http://your-server/` (or your configured URL) in a browser.
2. Confirm prerequisite checks pass (PHP extensions, writable folders, database).
3. Click **Install Database** and create the Site Administrator account.

Use a strong password (12+ characters, mixed case, numbers, symbols).


## Step 7: FastAPI service

Follow [Install and configure the FastAPI service](/tech_installation_data_api.html):

1. `cp fastapi/.env.example fastapi/.env` and set `STORAGE_PATH` to `/var/www/metadata-editor/editor/datafiles`
2. Create Python environment (`.venv` or Conda)
3. Test with `./start.sh -f`
4. For production: [Run the FastAPI service](/tech_installation_fastapi.html#linux-systemd)


## Step 8: Background worker (optional)

The Metadata Editor works without it. Install when you need batch jobs or API automation:

```bash
cd /var/www/metadata-editor/editor/deploy/linux
sudo ./install-service.sh --app-root /var/www/metadata-editor/editor
```

See [Jobs and background workers](/tech_jobs_and_workers.html).


## Step 9: Post-install

Complete [Post-install configuration](/tech_post_install_configuration.html): link `data_api_url`, verify storage paths, configure email, run smoke tests, and plan backups.


## Troubleshooting

| Issue | What to check |
|-------|----------------|
| 502 / blank PHP pages | PHP-FPM running; socket path in NGINX/Apache config |
| Installer cannot write files | Ownership on `datafiles`, `files`, `logs` |
| Database connection failed | `database.php` credentials; MySQL listening on `localhost` |
| Data import fails | FastAPI service running; [Post-install](/tech_post_install_configuration.html) smoke tests |
