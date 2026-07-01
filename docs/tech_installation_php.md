# PHP installation

PHP runs the **Metadata Editor** web application (`editor/` folder). The **FastAPI service** is separate (Python) — see [Install and configure the FastAPI service](/tech_installation_data_api.html).

This page covers PHP version, extensions, and `php.ini` settings. For full server setup, use:

| Platform | Guide |
|----------|--------|
| Linux (Apache or NGINX + PHP-FPM) | [Installation (Linux)](/tech_installation_linux.html) |
| Windows (IIS) | [Installation (Windows)](/tech_installation_windows.html) |

The web **installer** (first browser visit after deploy) checks PHP version, extensions, upload limits, and timezone — use it to confirm your configuration before creating the database.


## Requirements

| Setting | Requirement |
|---------|-------------|
| **PHP version** | **8.2 or later** |
| **Architecture (Windows IIS)** | **Non-Thread Safe (NTS) x64** |
| **Architecture (Windows Apache)** | Thread Safe x64 (if using Apache on Windows) |
| **Database driver** | `mysqli` (MySQL 8.x or MariaDB 10.x+) |

### Extensions

The installer validates XML/XSL support. Enable the following in `php.ini` (or via PHP Manager on IIS):

| Extension | Required? | Purpose |
|-----------|-----------|---------|
| `xsl` | **Yes** | DDI and XML metadata transforms |
| `xml`, `simplexml`, `xmlreader` | **Yes** | XML parsing |
| `mysqli` | **Yes** | MySQL / MariaDB |
| `curl` | **Yes** (production) | HTTP client (NADA publish, FastAPI service, external APIs) |
| `openssl` | **Yes** (production) | HTTPS and secure connections |
| `mbstring` | **Strongly recommended** | Multibyte strings |
| `zip` | **Strongly recommended** | Archive import/export |
| `gd` | Optional | Image handling (marked optional in the installer) |

**Linux package names** (Debian/Ubuntu examples): `php-xml`, `php-xsl`, `php-mysql`, `php-curl`, `php-mbstring`, `php-zip`, `php-gd`.

**Windows IIS** (`php.ini` or PHP Manager): enable `extension=mysqli`, `extension=xsl`, `extension=curl`, `extension=openssl`, `extension=mbstring`, `extension=zip`, and ensure XML support is available in your PHP build.


## Recommended `php.ini` settings

Large microdata uploads and long-running imports need generous limits:

| Setting | Recommended value | Notes |
|---------|-------------------|--------|
| `memory_limit` | `512M` or higher | Windows guide uses `528M`; increase for very large files |
| `max_execution_time` | `300` | Seconds; background jobs may run longer via CLI worker |
| `post_max_size` | `2000M` | Must be ≥ `upload_max_filesize` |
| `upload_max_filesize` | `2000M` | Adjust to your largest expected upload |
| `file_uploads` | `On` | Required for data import |
| `date.timezone` | e.g. `UTC` or your region | **Required** — installer fails if unset |

Set `date.timezone` explicitly. See [PHP timezone list](https://www.php.net/manual/en/timezones.php).


## Linux (PHP-FPM)

On Linux, install PHP and extensions from your distribution, then use **PHP-FPM** with Apache or NGINX.

**Debian / Ubuntu example:**

```bash
sudo apt update
sudo apt install php8.2-fpm php8.2-mysql php8.2-xml php8.2-xsl php8.2-curl \
  php8.2-mbstring php8.2-zip php8.2-gd
sudo systemctl enable --now php8.2-fpm
```

Edit `/etc/php/8.2/fpm/php.ini` (path may vary) for upload limits and timezone, then restart FPM:

```bash
sudo systemctl restart php8.2-fpm
```

Point the web server document root at the **editor** folder (e.g. `/var/www/metadata-editor/editor`). NGINX and Apache examples: [Installation (Linux)](/tech_installation_linux.html#step-5-web-server).

Verify:

```bash
php -v
php -m | grep -E 'mysqli|xsl|curl|mbstring|zip'
```


## Windows — IIS (recommended)

Production Windows installs use **IIS** with **PHP 8.2+ NTS x64**. Also install:

- [URL Rewrite Module](https://www.iis.net/downloads/microsoft/url-rewrite) — front-controller routing
- [PHP Manager for IIS 10](https://www.iis.net/downloads/community/2018/05/php-manager-150-for-iis-10) — optional but simplifies extension and `php.ini` management

Download PHP: [windows.php.net](https://windows.php.net/download/) — choose **VS16 x64 Non Thread Safe** (or current equivalent for PHP 8.2+).

### Install PHP with PHP Manager

1. Extract the PHP zip to a fixed path, e.g. `C:\PHP\PHP82`.
2. Open **IIS Manager** → select the **server** node (not a single site) → open **PHP Manager**.
3. Click **Register new PHP version** and select `php-cgi.exe` or `php.exe` from the extracted folder.
4. For the Metadata Editor site, ensure the registered version is **PHP 8.2+**.
5. Open **Manage all settings** and set upload limits, `memory_limit`, `max_execution_time`, and `date.timezone` (see table above).
6. Open **Enable or disable an extension** and enable the extensions listed in the table above.

Create the IIS site or application with physical path **`...\metadata-editor\editor`** (the folder containing `index.php`), app pool **No Managed Code**, Integrated pipeline. Full walkthrough: [Installation (Windows)](/tech_installation_windows.html).


## Windows — Apache (optional)

Apache on Windows is supported for development or legacy setups. Use the **Thread Safe (TS) x64** PHP build matched to your Apache architecture.

1. Download PHP TS x64 from [windows.php.net](https://windows.php.net/download/).
2. Install [Apache Lounge](https://www.apachelounge.com/download/) or another Apache 2.4 build for Windows.
3. Extract PHP to e.g. `C:\php` and add to `httpd.conf`:

```apache
LoadModule php_module "C:/php/php8apache2_4.dll"
AddHandler application/x-httpd-php .php
PHPIniDir "C:/php"
```

4. Configure `php.ini` (extensions and limits as above), restart Apache, and confirm with `phpinfo()`.

For production on Windows, prefer **IIS** — it is the path covered in [Installation (Windows)](/tech_installation_windows.html).


## Verify before install

1. Browse to the Metadata Editor URL (document root = `editor/`).
2. On the **installer** page, expand **Required PHP Extensions** — all required rows should show enabled.
3. Expand **Other PHP settings** — confirm upload sizes and timezone.
4. Fix any red items, then proceed with **Install Database**.

After PHP is working, continue with [Install and configure the FastAPI service](/tech_installation_data_api.html) and [Post-install configuration](/tech_post_install_configuration.html).
