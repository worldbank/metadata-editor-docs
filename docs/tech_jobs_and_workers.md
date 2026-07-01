# Jobs and background workers

The Metadata Editor uses **background jobs** for long-running tasks: publishing to NADA, large microdata imports, PDF generation, and similar work that should not block the web browser.

This page explains how the job system works, when the **Metadata Editor background worker** is needed, and how to install it. For day-to-day use of the Jobs page in the application, see [Managing background jobs](/managing_jobs.html).

> **Do not confuse two different job systems.** The **FastAPI service** (Metadata Editor FastAPI) handles data conversion and indicator timeseries operations and runs its own internal jobs for heavy data work. The **background worker** service (`metadata-editor-worker`) processes the Metadata Editor **job queue** stored in MySQL (`job_queue`). See [When each service is required](#when-each-service-is-required) below.


## Is the background worker required?

**No.** The Metadata Editor **works without the background worker enabled.** You can document metadata, manage projects, import data through the editor UI, and use most day-to-day features with only the main **Metadata Editor application** (and the **FastAPI service** when working with data files).

The background worker is **optional but recommended** when you need any of the following:

- **Batch or heavy processing** — large imports, PDF generation, or NADA publishes that run in the background instead of blocking the browser
- **API automation** — scripts or integrations that enqueue work via `/api/jobs/*` (for example `import_microdata`, `import_indicator_data`, `publish_to_nada`)
- **Reliable queue processing** — jobs that should continue if the user closes the browser or the HTTP request ends

If the background worker is **not** running, the application remains usable. Jobs that are enqueued (manually or via the API) stay in `pending` until an administrator starts the worker. Features that complete in the browser or in a single web request are unaffected.

**Summary:** treat the background worker as a **production recommendation**, not a prerequisite for installing or using the editor.


## Architecture overview

```
Browser  →  Metadata Editor  →  MySQL (job_queue)
                ↓
         Background worker (metadata-editor-worker service)
                ↓
         FastAPI service (when the job needs data processing)
```

1. A user or API client enqueues a job. The Metadata Editor writes a row to the `job_queue` table with status `pending`.
2. The **background worker** polls the queue, claims the next job, and runs the matching job handler.
3. Some handlers call the **FastAPI service** (for example microdata import or indicator CSV replace). The FastAPI service must be running for those jobs to succeed.
4. When the job finishes, the worker updates the row to `completed` or `failed`. Users track progress on the [Jobs](/managing_jobs.html) page or via the Jobs API.

Interactive work in the editor (such as importing indicator CSV data with **wait** enabled) can call the FastAPI service directly from the web request without using the background worker. Queued and API-driven flows use the background worker instead.


## When each service is required

| Task | FastAPI service | Metadata Editor | Background worker |
|------|:------------------:|:---------------:|:-----------------:|
| Edit metadata, manage projects | — | ✓ | — |
| Microdata import via editor UI (typical) | ✓ | ✓ | — |
| Microdata import via `/api/jobs/import_microdata` | ✓ | ✓ | ✓ |
| Indicator CSV import via editor UI (`wait: true`) | ✓ | ✓ | — |
| Indicator import via `/api/jobs/import_indicator_data` | ✓ | ✓ | ✓ |
| Publish to NADA (background job) | ✓* | ✓ | ✓ |
| PDF documentation (background) | — | ✓ | ✓ |
| Metadata assessment jobs | — | ✓ | ✓ |

See [Metadata reviewer](/assess_metadata.html) for how to run and resolve reviews, and [Install the metadata reviewer](/tech_installation_metadata_reviewer.html) for setup. [Project issues](/project_issues.html) work without the reviewer.

\* Publish jobs may call the FastAPI service to export data (for example indicator timeseries CSV) before upload to NADA.

**Practical rule:**

- Run the **FastAPI service** when you import or process data files in the editor.
- Run the **background worker** when you rely on the **job queue** — batch work, heavy background tasks, or API-driven automation. It is not required for normal interactive editor use.


## Job types

The application registers one handler per job type. The main types are:

| Job type | Purpose |
|----------|---------|
| `import_microdata` | Import a microdata file (Stata, SPSS, CSV) in the background |
| `import_indicator_data` | Import indicator timeseries CSV via resumable upload (automation / API) |
| `publish_project` | Publish project metadata and resources to NADA in the background |
| `generate_pdf` | Generate PDF documentation for a project |
| `generate_microdata_resource` | Build or refresh a microdata external resource |
| `metadata_assessment_result` | Store results from automated metadata quality assessment |

The API also accepts the alias `pdf_generation` for `generate_pdf`.


## Job statuses

| Status | Meaning |
|--------|---------|
| `pending` | Queued; waiting for the background worker |
| `held` | Paused by an administrator; will not run until released |
| `processing` | Currently being handled by the background worker |
| `completed` | Finished successfully |
| `failed` | Finished with an error (see job details) |
| `cancelled` | Cancelled while still pending |

Jobs are **not** deleted automatically when they fail or expire. Administrators can delete completed, failed, or cancelled jobs from the Jobs page.

### Stale and stuck jobs

Configuration in `application/config/editor.php` controls maintenance behaviour:

| Setting | Default | Effect |
|---------|---------|--------|
| `jobs_stale_pending_hours` | 48 | Jobs pending longer than this are flagged as **stale** in the UI |
| `jobs_expire_pending_hours` | 168 | Very old pending jobs are marked **failed** by the worker (record kept) |
| `jobs_stuck_processing_hours` | 2 | Jobs stuck in `processing` are reset to `pending` |

The background worker runs this maintenance at startup and approximately every hour.


## Installing the background worker

The background worker is **optional**. Install it when your deployment needs queued or API-driven jobs (see [Is the background worker required?](#is-the-background-worker-required)).

The worker is a command-line process (PHP CLI) started from the Metadata Editor application root — the directory that contains `index.php` and `worker.sh`. On production servers it runs as the **`metadata-editor-worker`** service (systemd on Linux, NSSM on Windows).

### Option 1: Linux (systemd) — recommended for production

From the application’s `deploy/linux/` directory:

```bash
sudo ./install-service.sh
```

Defaults assume the app at `/var/www/metadata-editor` running as `www-data`. Override as needed:

```bash
sudo ./install-service.sh \
    --app-root /srv/metadata-editor \
    --user nginx \
    --group nginx \
    --max-jobs 100
```

Verify:

```bash
sudo systemctl status metadata-editor-worker
journalctl -u metadata-editor-worker -f
```

See the [Linux deploy README](https://github.com/worldbank/metadata-editor/blob/develop/deploy/linux/README.md) in the application repository for manual setup and parameters.


### Option 2: Windows (NSSM)

Open **PowerShell as Administrator** and run from `deploy\windows\`:

```powershell
.\install-service.ps1
```

Defaults assume `C:\inetpub\metadata-editor`. Example with custom path:

```powershell
.\install-service.ps1 -AppRoot "D:\www\metadata-editor" -MaxJobs 100
```

Verify:

```powershell
Get-Service metadata-editor-worker
Get-Content D:\www\metadata-editor\logs\worker.log -Tail 50 -Wait
```

See the [Windows deploy README](https://github.com/worldbank/metadata-editor/blob/develop/deploy/windows/README.md) for service account and NSSM options.


### Option 3: Manual start (development or testing)

**Linux / macOS** — use the helper script:

```bash
./worker.sh start          # background
./worker.sh status
./worker.sh logs -f
./worker.sh stop
```

**Any platform** — run the worker directly:

```bash
php index.php cli/worker/run
php index.php cli/worker/run --poll-interval=10 --max-jobs=50
```

Optional arguments:

| Argument | Default | Description |
|----------|---------|-------------|
| `--poll-interval=N` | 5 | Seconds between queue polls |
| `--max-jobs=N` | 0 (unlimited) | Exit after N jobs; service manager restarts the process to limit memory growth |

When using systemd or NSSM, `--max-jobs=50` (or similar) is recommended so the worker process is recycled periodically.


## Worker health and logs

The background worker writes:

- **Log file:** `logs/worker.log` (under the application root)
- **PID file:** `{storage_path}/tmp/worker.pid`
- **Heartbeat file:** `{storage_path}/tmp/worker.heartbeat` (updated every 5 seconds)

Site administrators see background worker status on the [Jobs](/managing_jobs.html) page (green banner when running, red when stopped).

API: `GET /api/jobs/worker_status` (admin only).


## The FastAPI service is separate

Install and run the Metadata Editor FastAPI service as described in [Installation](/tech_installation.html) and [Run the FastAPI service](/tech_installation_fastapi.html).

- The FastAPI service URL is configured in `application/config/editor.php` as `data_api_url`, or via the environment variable `EDITOR_DATA_API_URL`.
- Internal jobs on the FastAPI service (for example during indicator CSV import in the editor) do **not** replace the background worker for **job queue** tasks.

If queued jobs never complete but the Jobs page banner shows the worker as **running**, check that the FastAPI service is reachable from the server and that data paths are visible to both the Metadata Editor and the FastAPI service where required.


## Jobs API (automation)

Background jobs can be created and monitored via the REST API. See [Introduction to the API](/ME_API.html) for authentication.

Common endpoints:

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/jobs` | Create a job (body includes `job_type` and `payload`) |
| `GET` | `/api/jobs` | List jobs (filters: status, job_type, user_id, active/history) |
| `GET` | `/api/jobs/{uuid}` | Job details |
| `GET` | `/api/jobs/status` | Queue statistics |
| `GET` | `/api/jobs/worker_status` | Background worker health (admin) |
| `POST` | `/api/jobs/publish_to_nada` | Enqueue NADA publish |
| `POST` | `/api/jobs/generate_pdf` | Enqueue PDF generation |
| `POST` | `/api/jobs/import_indicator_data` | Enqueue indicator data import |
| `POST` | `/api/jobs/{uuid}/retry` | Retry a failed job |
| `POST` | `/api/jobs/{uuid}/cancel` | Cancel a pending job |

Convenience endpoints wrap the generic create call with validation for specific job types.


## Troubleshooting

| Symptom | Likely cause | What to check |
|---------|--------------|---------------|
| Jobs stay `pending` | Background worker not running | `metadata-editor-worker` service, `./worker.sh status`, Jobs page banner |
| Worker banner red | Service stopped or crashed | `logs/worker.log`, systemd/NSSM status |
| Job fails immediately | Invalid payload or permissions | Job detail dialog → error message |
| Import/publish job fails mid-run | FastAPI service down or path error | `editor-fastapi` service, `EDITOR_DATA_API_URL`, shared storage |
| Job stuck in `processing` | Worker killed during job | Wait for maintenance or restart worker; job may reset to `pending` |
| “Server has gone away” in logs | Long job lost MySQL connection | Worker uses keep-alive; ensure MySQL `wait_timeout` is adequate |

After fixing the underlying issue, use **Retry** on failed jobs from the Jobs page or API.


## Related documentation

- [Managing background jobs](/managing_jobs.html) — Jobs page for users and administrators
- [Run the FastAPI service](/tech_installation_fastapi.html) — not the background worker
- [Installation](/tech_installation.html) — Full server setup
- [Publish to NADA](/publish_to_nada.html) — Publishing options including background publish
