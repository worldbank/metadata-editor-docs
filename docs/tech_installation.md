# Installation overview

The Metadata Editor is deployed as a **web application** on a server (or as a **desktop bundle** for training). Most production setups run three cooperating components on the same host:

| Component | Role | Required? |
|-----------|------|-----------|
| **Metadata Editor** | Web UI, API, MySQL metadata, job queue | Yes |
| **FastAPI service** | Microdata conversion, statistics, indicator DuckDB | Yes, when importing or processing data |
| **Background worker** | Job queue processing (batch, API automation) | Optional — see [Jobs and background workers](/tech_jobs_and_workers.html) |

The FastAPI service is the [Metadata Editor FastAPI](https://github.com/worldbank/metadata-editor-fastapi) application — a local companion for file conversion and indicator storage, not a public API.

Installing on a server supports collaboration, centralized storage, and integration with your organization’s authentication. For a personal training setup, see [Installation (Desktop)](/tech_installation_desktop.html).


## Choose your installation path

| Environment | Guide |
|-------------|--------|
| **Linux server** (Apache or NGINX) | [Installation (Linux)](/tech_installation_linux.html) |
| **Windows server** (IIS) | [Installation (Windows)](/tech_installation_windows.html) |
| **Desktop** (Windows 10/11, training) | [Installation (Desktop)](/tech_installation_desktop.html) |
| **Upgrade an existing install** | [Upgrading](/tech_upgrading.html) |

After platform-specific steps, complete [Post-install configuration](/tech_post_install_configuration.html) (FastAPI service connection, storage paths, email, verification).


## Standard folder layout

Use a single parent directory on the server. Names below are conventions used in this guide; your paths may differ as long as configuration files point to the correct locations.

```
metadata-editor/
├── editor/          ← Metadata Editor (PHP application root; contains index.php)
└── fastapi/         ← FastAPI service (Metadata Editor FastAPI application root)
```

**Examples:**

- Linux: `/var/www/metadata-editor/editor` and `.../fastapi`
- Windows (IIS): `C:\inetpub\metadata-editor\editor` and `...\fastapi`

Clone or extract releases from:

- [Metadata Editor](https://github.com/worldbank/metadata-editor)
- [Metadata Editor FastAPI](https://github.com/worldbank/metadata-editor-fastapi)

Prefer [tagged releases](https://github.com/worldbank/metadata-editor/releases) over the default branch for production.


## System requirements

| Component | Requirement |
|-----------|-------------|
| **CPU** | Dual-core or higher |
| **RAM** | 4 GB minimum; 8 GB+ recommended for large datasets |
| **Storage** | 20 GB+ free; project data grows under the editor `datafiles` area |
| **Database** | MySQL 8.x or MariaDB 10.x+ |
| **PHP** | 8.2+ with extensions: `mysqli`, `xsl`, `xml`, `mbstring`, `curl`, `openssl`, `zip` |
| **Python** | 3.11+ for the FastAPI service (Conda or `.venv`; see [Install and configure the FastAPI service](/tech_installation_data_api.html)) |
| **Web server** | Apache 2.4+, NGINX, or IIS 10+ |

PHP installation details: [PHP installation](/tech_installation_php.html). Architecture summary: [Technical specifications](/tech_technical_specifications.html).


## Installation checklist (all server paths)

1. Install web server, PHP, MySQL, and Python (platform guide).
2. Create `metadata-editor/editor` and `metadata-editor/fastapi`; download source.
3. Create MySQL database and user; configure `editor/application/config/database.php`.
4. Set permissions on `datafiles`, `files`, and `logs` under the editor root.
5. Run the **web installer** in a browser (creates schema and admin account).
6. [Install and configure the FastAPI service](/tech_installation_data_api.html) (`.env`, `STORAGE_PATH`, test).
7. [Post-install configuration](/tech_post_install_configuration.html) — link editor to FastAPI service, email, smoke tests.
8. *(Optional)* [Background worker](/tech_jobs_and_workers.html#installing-the-background-worker) for batch and API jobs.
9. *(Production)* [Run the FastAPI service](/tech_installation_fastapi.html) and enable backups.


## Related documentation

- [Install and configure the FastAPI service](/tech_installation_data_api.html)
- [Run the FastAPI service](/tech_installation_fastapi.html)
- [Jobs and background workers](/tech_jobs_and_workers.html)
- [Post-install configuration](/tech_post_install_configuration.html)
- [Clean URLs](/tech_installation_clean_urls.html)
- [Upgrading](/tech_upgrading.html)
