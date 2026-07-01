# Clean URLs (remove `index.php`)

By default, the Metadata Editor generates links that include the front controller, for example:

`https://metadata-editor.example.org/index.php/projects`

**Clean URLs** hide `index.php` in the browser address bar:

`https://metadata-editor.example.org/projects`

This is **optional**. The application works with or without clean URLs. Most production sites enable them for a cleaner public URL.

> **Do not rename or delete `index.php`.** It remains the CodeIgniter front controller on disk. Only generated links and incoming requests are rewritten.


## Overview

Clean URLs require **two** changes:

1. **Web server rewrite rules** — route requests to `index.php` internally.
2. **Application config** — stop CodeIgniter from adding `index.php` to generated links.

The Metadata Editor ships rewrite configuration for Apache (`.htaccess`) and IIS (`web.config`) in the **editor** application root.


## Step 1: Application configuration

Edit **`editor/application/config/config.php`**:

```php
$config['index_page'] = '';
```

The default is `'index.php'`. Set it to an **empty string** after rewrite rules are working.

If you change this before the web server is configured, internal links and routes may return 404 errors.


## Step 2: Web server


### Apache

1. Enable **`mod_rewrite`**.
2. Set **DocumentRoot** to the **editor** folder (where `index.php` lives).
3. Allow `.htaccess` overrides, for example:

```apache
<Directory /var/www/metadata-editor/editor>
    AllowOverride All
    Require all granted
</Directory>
```

4. The application includes **`.htaccess`** in the editor root with rewrite rules. No copy step is needed if you deploy from the repository.

**Subfolder install** (site URL is `https://example.org/editor/` rather than the domain root): uncomment and adjust `RewriteBase` in `.htaccess`:

```apache
RewriteBase /editor/
```

**Verify:** open the site, log in, and click a few pages. Links in the address bar should not contain `index.php`.


### IIS

1. Install the [URL Rewrite Module](https://www.iis.net/downloads/microsoft/url-rewrite).
2. Point the IIS site or application physical path at the **editor** folder.
3. Ensure **`web.config`** is present in the editor root (included in the repository). It rewrites requests to `index.php/{path}`.

Full IIS setup: [Installation (Windows)](/tech_installation_windows.html#step-5-configure-iis) · [PHP installation (IIS)](/tech_installation_php.html).

**Verify:** browse to the site root and an inner page (e.g. `/projects` after login). URLs should not show `index.php`.


### NGINX

Point **`root`** at the editor folder and route unknown paths to `index.php`. Example:

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

Adjust `server_name`, paths, and the PHP-FPM socket for your system. Then set `$config['index_page'] = ''` as above.

More context: [Installation (Linux) — web server](/tech_installation_linux.html#step-5-web-server).


## Verify

| Check | Expected |
|-------|----------|
| Home / login page loads | No 404 |
| After login, navigation links | No `index.php` in the URL |
| Static assets (CSS, JS, images) | Load correctly |
| API call (if used) | Responds at your chosen base URL (see below) |

If pages 404 after changing `index_page`, revert to `'index.php'` temporarily, fix rewrite rules, then set `index_page` to `''` again.


## API, OIDC, and CLI URLs

**REST API** — With rewrite enabled, both forms often work:

- `https://example.org/index.php/api/...`
- `https://example.org/api/...`

Pick **one base URL** and use it consistently in clients and scripts. See [Introduction to the API](/ME_API.html).

**OpenID Connect** — The redirect URI registered with your IdP must **exactly** match the URL the application uses, for example:

- With `index.php`: `https://example.org/index.php/auth/oidc_callback`
- Clean URLs: `https://example.org/auth/oidc_callback`

Update the IdP and `application/config/auth.php` together. See [User authentication](/tech_user_authentication.html).

**CLI commands** — Always use the filesystem path; clean URLs do not apply:

```bash
php index.php cli/worker/run
php index.php cli/migrate latest
```


## Troubleshooting

| Symptom | Likely cause |
|---------|----------------|
| 404 on all pages except home | Rewrite not enabled; `index_page` empty too early |
| 404 only on inner pages | `RewriteBase` wrong for subfolder; NGINX `try_files` misconfigured |
| CSS/JS broken | Rewrite catching static files — check IIS `web.config` exclusions or NGINX `location` blocks |
| Links still show `index.php` | `config.php` still has `$config['index_page'] = 'index.php'` |
| API or OIDC fails after change | Client or IdP still using old URL with `index.php` |

## Related documentation

- [Post-install configuration](/tech_post_install_configuration.html)
- [Installation (Linux)](/tech_installation_linux.html)
- [Installation (Windows)](/tech_installation_windows.html)
