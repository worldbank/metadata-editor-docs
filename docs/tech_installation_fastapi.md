# Run the FastAPI service

Install the **Metadata Editor FastAPI** service as an operating-system service (`editor-fastapi`) so it starts at boot and runs under a dedicated account.

> **Install first:** Complete [Install and configure the FastAPI service](/tech_installation_data_api.html) (`.env`, `STORAGE_PATH`, Python environment, manual test) before installing a system service.

> **Not the background worker.** The Metadata Editor [background worker](/tech_jobs_and_workers.html) is a separate PHP process for the job queue.


## Prerequisites

- FastAPI service tested manually (`./start.sh -f` or `start.bat -f`)
- `.env` configured with production `STORAGE_PATH` and `HOST=127.0.0.1`
- Python interpreter path known (Conda `metadata-editor` env or `fastapi/.venv/bin/python`)

Official scripts live in the [metadata-editor-fastapi](https://github.com/worldbank/metadata-editor-fastapi) repository under `deploy/linux/` and `deploy/windows/`.


## Linux (systemd)

From the FastAPI application directory:

```bash
cd /var/www/metadata-editor/fastapi/deploy/linux
sudo ./install-service.sh
```

The script creates a systemd unit (typically `editor-fastapi`), sets permissions on shared storage when configured, and enables the service.

Verify:

```bash
sudo systemctl status editor-fastapi
journalctl -u editor-fastapi -f
curl -s http://127.0.0.1:8000/docs | head
```

Full parameters, manual setup, and shared-storage permissions: [FastAPI deploy/linux README](https://github.com/worldbank/metadata-editor-fastapi/blob/main/deploy/linux/README.md).


## Windows (NSSM)

1. Install [Miniconda](https://docs.anaconda.com/miniconda/) and create the `metadata-editor` environment (see [Install and configure the FastAPI service](/tech_installation_data_api.html)), **or** use a `.venv` Python path.

2. Find the Python executable:

```bat
conda activate metadata-editor
where python
```

3. Open **Administrator** Command Prompt:

```bat
set CONDA_PYTHON_PATH=C:\Users\you\miniconda3\envs\metadata-editor\python.exe
cd /d C:\inetpub\metadata-editor\fastapi\deploy\windows
install-service.bat
```

Adjust paths to match your installation.

Verify:

```bat
nssm status editor-fastapi
curl http://127.0.0.1:8000/docs
```

Details and service account options: [FastAPI deploy/windows README](https://github.com/worldbank/metadata-editor-fastapi/blob/main/deploy/windows/README.md).


## Do not use in production

- `uvicorn ... --reload`
- Binding to `0.0.0.0` without firewall restrictions
- Running as root (Linux) or LocalSystem without considering file permissions
- Batch files that run `pip install` on every service start

Use the deploy scripts and a fixed Python interpreter path instead.


## Troubleshooting

| Symptom | Action |
|---------|--------|
| Service fails immediately | Check `journalctl` / NSSM logs; confirm `.env` and `STORAGE_PATH` |
| Editor cannot reach FastAPI service | Confirm `HOST=127.0.0.1`, port 8000, and `data_api_url` in editor config |
| Permission denied on files | Align service user with web server group on `datafiles` |

Return to [Post-install configuration](/tech_post_install_configuration.html) for end-to-end verification.
