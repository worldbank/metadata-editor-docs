# Install and configure the FastAPI service

The **FastAPI service** ([Metadata Editor FastAPI](https://github.com/worldbank/metadata-editor-fastapi)) runs beside the Metadata Editor on the **same machine**. It handles CPU-intensive work: Stata/SPSS/CSV conversion, summary statistics, geospatial metadata (optional), and indicator DuckDB operations.

> **Security:** Bind to **`127.0.0.1`**. The FastAPI service is for **local processing on the same host**, not for external clients. Do not expose port 8000 to the internet. See [Run the FastAPI service](/tech_installation_fastapi.html) for production deployment.

This page covers install and configuration. For systemd/NSSM, see [Run the FastAPI service](/tech_installation_fastapi.html).


## Prerequisites

- Metadata Editor web application installed (or ready to install on the same host)
- Python **3.11+**
- **Miniconda3** — recommended on Windows and when using geospatial endpoints
- **`.venv`** — suitable for Linux production when geospatial endpoints are not required

Upstream reference: [FastAPI repository README](https://github.com/worldbank/metadata-editor-fastapi/blob/main/README.md).


## Step 1: Download the FastAPI service

Place the application in the `fastapi` folder next to the editor (see [Installation overview](/tech_installation.html#standard-folder-layout)).

```bash
cd /var/www/metadata-editor   # your parent directory
git clone https://github.com/worldbank/metadata-editor-fastapi fastapi
```

Or download and extract a [release zip](https://github.com/worldbank/metadata-editor-fastapi/releases) into `fastapi/`.


## Step 2: Configure environment (required)

The FastAPI service **will not start** until `.env` exists with an explicit `STORAGE_PATH` setting.

```bash
cd fastapi
cp .env.example .env
```

Edit `.env` at minimum:

```bash
# Production — absolute path to Metadata Editor project data storage
STORAGE_PATH=/var/www/metadata-editor/editor/datafiles

# Localhost only (default)
HOST=127.0.0.1
PORT=8000
```

| `STORAGE_PATH` value | Use |
|----------------------|-----|
| Absolute path to editor `datafiles` | **Production** — path validation enabled |
| Empty (`STORAGE_PATH=`) | **Local dev only** — disables path validation |

**Windows example:**

```bash
STORAGE_PATH=C:\inetpub\metadata-editor\editor\datafiles
HOST=127.0.0.1
PORT=8000
```

The directory must exist and the account running the FastAPI service must have read/write access. This path must align with the Metadata Editor storage configuration — see [Post-install configuration](/tech_post_install_configuration.html#link-storage-between-metadata-editor-and-fastapi-service).


## Step 3: Python environment

Choose **one** option.

### Option A: Conda (recommended for Windows and geospatial)

Best when you need **geospatial** endpoints or are on Windows (GDAL and related libraries from conda-forge).

```bash
conda create -n metadata-editor python=3.11 -y
conda activate metadata-editor
conda install -c conda-forge gdal fiona geopandas rasterio pyproj shapely -y   # skip for core-only
pip install -r requirements.txt
```

On Windows, enable “Add Miniconda3 to PATH” during Miniconda install.

Geospatial details: [FastAPI geospatial guide](https://github.com/worldbank/metadata-editor-fastapi/blob/main/README-geospatial.md).

### Option B: Virtual environment (core features)

Lightweight; suitable for Linux production when geospatial endpoints are not required. Use the directory name **`.venv`** (start scripts expect it).

**Linux / macOS:**

```bash
cd fastapi
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

**Windows:**

```bat
cd fastapi
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```


## Step 4: Test the FastAPI service

With `.env` configured and the virtual environment active:

**Linux / macOS:**

```bash
./start.sh -f
```

**Windows:**

```bat
start.bat -f
```

Or manually (debugging):

```bash
python -m uvicorn main:app --host 127.0.0.1 --port 8000
```

Do **not** use `--reload` or `0.0.0.0` in production.

Verify in a browser on the server: `http://127.0.0.1:8000` (OpenAPI docs should load).


## Step 5: Connect the Metadata Editor

In the Metadata Editor, point `data_api_url` at the FastAPI service:

**File:** `editor/application/config/editor.php`

```php
$config['editor']['data_api_url'] = 'http://127.0.0.1:8000/';
```

Or environment variable: `EDITOR_DATA_API_URL=http://127.0.0.1:8000/`

The URL must end with a trailing slash. Full wiring and smoke tests: [Post-install configuration](/tech_post_install_configuration.html).


## Production: run as a system service

For servers, install the FastAPI service as an OS service (starts at boot, dedicated account):

| OS | Mechanism | Documentation |
|----|-----------|---------------|
| Linux | systemd (`editor-fastapi`) | [Run the FastAPI service — Linux](/tech_installation_fastapi.html#linux-systemd) and [FastAPI deploy/linux](https://github.com/worldbank/metadata-editor-fastapi/blob/main/deploy/linux/README.md) |
| Windows | NSSM (`editor-fastapi`) | [Run the FastAPI service — Windows](/tech_installation_fastapi.html#windows-nssm) and [FastAPI deploy/windows](https://github.com/worldbank/metadata-editor-fastapi/blob/main/deploy/windows/README.md) |

Use the official `deploy/linux/install-service.sh` or `deploy/windows/install-service.bat` scripts in the FastAPI repository rather than ad-hoc batch files.


## Optional features

| Feature | Requirement |
|---------|-------------|
| Geospatial metadata endpoints | Conda + [README-geospatial.md](https://github.com/worldbank/metadata-editor-fastapi/blob/main/README-geospatial.md) |
| AI metadata reviewer | `requirements-reviewer.txt` + [README-reviewer.md](https://github.com/worldbank/metadata-editor-fastapi/blob/main/README-reviewer.md) |


## Troubleshooting

| Symptom | Check |
|---------|--------|
| App exits immediately on start | `.env` missing or `STORAGE_PATH` not set |
| “Path not allowed” errors | `STORAGE_PATH` in `.env` must cover paths the editor passes |
| Editor cannot import data | `data_api_url` / `EDITOR_DATA_API_URL`; FastAPI service running on `127.0.0.1:8000` |
| Permission errors | Service user can read/write `STORAGE_PATH` and editor `datafiles` |

Logs default to `fastapi/logs/app.log` when file logging is enabled (see FastAPI README logging section).
