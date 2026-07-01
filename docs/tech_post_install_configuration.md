# Post-install configuration

After the [platform installation](/tech_installation.html) and [FastAPI service setup](/tech_installation_data_api.html), complete these steps before handing the system to users.


## Link storage between Metadata Editor and FastAPI service

Both components must agree on where project data files live.

### Metadata Editor

**File:** `editor/application/config/editor.php`

```php
$config['editor']['storage_path'] = '/var/www/metadata-editor/editor/datafiles';
```

Adjust to your actual path. On Windows, use a full path such as `C:\inetpub\metadata-editor\editor\datafiles`.

Writable folders under the editor root (default layout):

- `datafiles/` — project data and uploads
- `files/` — application files
- `logs/` — application logs

### FastAPI service

**File:** `fastapi/.env`

```bash
STORAGE_PATH=/var/www/metadata-editor/editor/datafiles
```

Use the **same absolute path** as (or a parent of) the editor storage area. The FastAPI service validates file paths against `STORAGE_PATH` in production.

The web server user and the FastAPI service account both need read/write access to this directory.


## Connect Metadata Editor to the FastAPI service

**File:** `editor/application/config/editor.php`

```php
$config['editor']['data_api_url'] = 'http://127.0.0.1:8000/';
```

Or set the environment variable (trailing slash required):

```bash
export EDITOR_DATA_API_URL=http://127.0.0.1:8000/
```

The config key is `data_api_url`; use `127.0.0.1`, not a public hostname, when both services run on the same host.


## Email (SMTP)

Many features (registration, password reset, notifications) require outbound email.

**File:** `editor/application/config/email.php`

```php
$config['useragent']        = 'PHPMailer';
$config['protocol']         = 'smtp';
$config['smtp_host']        = 'your-smtp-server.example.org';
$config['smtp_auth']        = true;
$config['smtp_user']        = 'your-account@example.org';
$config['smtp_email']       = 'your-account@example.org';
$config['smtp_pass']        = 'your-password';
$config['smtp_port']        = 587;
$config['smtp_crypto']      = 'tls';
```

| Setting | Description |
|---------|-------------|
| `smtp_host` | SMTP server hostname |
| `smtp_auth` | `true` if authentication is required |
| `smtp_user` / `smtp_email` | Account or from-address |
| `smtp_pass` | Password (empty if not required) |
| `smtp_port` | e.g. 25, 587, 465 |
| `smtp_crypto` | `tls`, `ssl`, or empty |

### Test email

1. **Forgot password** — log out, use forgot password with a known account email.
2. **Site admin** — **Settings → SMTP settings → Test email configurations** (reads from `email.php` when configured).


## Smoke tests

Run these checks before go-live:

| # | Test | Expected result |
|---|------|-----------------|
| 1 | Open Metadata Editor URL | Login page loads |
| 2 | Log in as Site Administrator | Dashboard / projects page |
| 3 | Visit `http://127.0.0.1:8000` on the server | FastAPI docs or health response |
| 4 | Create a test microdata project; import a small CSV or Stata/SPSS file | Import completes without FastAPI service errors |
| 5 | *(Optional)* Enqueue a background job or generate PDF | Job completes if [background worker](/tech_jobs_and_workers.html) is running |
| 6 | Send test email | Message received or admin test page reports success |

If microdata import fails, verify the FastAPI service is running, `STORAGE_PATH` matches editor storage, and `data_api_url` is correct.


## Production services

| Service | When | Guide |
|---------|------|--------|
| FastAPI service (`editor-fastapi`) | Always, for data features | [Run the FastAPI service](/tech_installation_fastapi.html) |
| Background worker (`metadata-editor-worker`) | Batch / API jobs only | [Jobs and background workers](/tech_jobs_and_workers.html) |

Ensure services start on boot (`systemctl enable` / Windows service **Automatic**).


## Backups

The Metadata Editor is often a central metadata repository. Plan regular backups of:

- **MySQL database** — full dump of `metadata_editor` (or your database name)
- **`datafiles/`** — project uploads and derived data
- **Configuration** — `application/config/database.php`, `editor.php`, `email.php`, `fastapi/.env` (store secrets securely)

Test restore procedures periodically.


## Security reminders

- Do not expose the FastAPI service (port 8000) to the internet; use `HOST=127.0.0.1`.
- Use HTTPS in front of the Metadata Editor for production user access.
- Restrict file permissions on config files containing passwords.
- Keep PHP, Python, and MySQL patched.


## Optional: clean URLs

To hide `index.php` from browser URLs (e.g. `/projects` instead of `/index.php/projects`), configure URL rewriting and set `$config['index_page'] = ''` in `config.php`.

Full steps for Apache, IIS, and NGINX: [Clean URLs](/tech_installation_clean_urls.html).
