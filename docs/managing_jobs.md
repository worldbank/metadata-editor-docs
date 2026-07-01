# Managing background jobs

Long-running tasks in the Metadata Editor—such as publishing to NADA, generating PDF documentation, or importing large datasets via the jobs API—can run as **background jobs**. You can view and manage them from the **Jobs** page.

The Metadata Editor **does not require** the background worker for normal use. If the worker is stopped, the rest of the application still works; only queued jobs wait until the worker is started. See [Is the background worker required?](/tech_jobs_and_workers.html#is-the-background-worker-required).

For installation of the background worker and architecture details, see [Jobs and background workers](/tech_jobs_and_workers.html).


## Opening the Jobs page

1. Log in to the Metadata Editor.
2. Open **Jobs** from the main navigation menu.

All authenticated users with editor access can open the page. What you see depends on your role:

- **Regular users** see only jobs they created.
- **Site administrators** see all jobs, queue statistics, worker status, and administrative actions.


## Active and history tabs

The page has two tabs:

| Tab | Shows |
|-----|--------|
| **Active** | Jobs that are `pending`, `held`, or `processing` |
| **History** | Jobs that are `completed`, `failed`, or `cancelled` |

Use **Refresh** to reload the list. The table supports paging (10, 25, 50, or 100 rows per page).


## Filtering jobs

Use the sidebar filters to narrow the list:

- **Status** — e.g. pending, failed, completed
- **Job type** — e.g. publish to NADA, PDF generation, microdata import
- **User** — administrators only; filter by who created the job
- **Stale** — active tab only; show jobs pending longer than the configured threshold

Click **Clear filters** to reset. Active filters appear as chips above the table.


## Understanding job status

| Status | What it means |
|--------|----------------|
| **pending** | Waiting in the queue for the background worker |
| **held** | Paused; an administrator must release it before it runs |
| **processing** | Currently running |
| **completed** | Finished successfully |
| **failed** | Stopped with an error — open job details for the message |
| **cancelled** | Cancelled before it started processing |

A **Stale** chip on a pending job means it has been waiting longer than expected (see [Jobs and background workers](/tech_jobs_and_workers.html#stale-and-stuck-jobs)). The job may still run once the worker is available.


## Viewing job details

Click a row or the eye icon to open **Job details**. The dialog shows:

- UUID, type, status, timestamps
- Number of attempts (failed jobs may retry up to the configured maximum)
- **Payload** — input parameters (project ID, options, etc.)
- **Result** — output when completed successfully
- **Error message** — when failed

Use the copy icon next to the UUID when sharing a job reference with an administrator or support.


## Actions on individual jobs

Available actions depend on status and your role:

| Action | When available | Who |
|--------|----------------|-----|
| **Hold** | Job is `pending` | Administrator |
| **Release** | Job is `held` | Administrator |
| **Cancel** | Job is `pending` | Job owner or administrator |
| **Retry** | Job is `failed` | Job owner or administrator |
| **Delete** | Job is `completed`, `failed`, or `cancelled` | Administrator |

Open job details and use the buttons at the bottom of the dialog, or select multiple jobs for batch actions.


## Batch actions

Select rows with the checkboxes, then use the toolbar:

- **Hold pending** — pause selected pending jobs (admin)
- **Release held** — resume selected held jobs (admin)
- **Cancel pending** — cancel selected pending jobs
- **Retry failed** — create new retry jobs for selected failures
- **Delete** — remove selected terminal jobs from the list (admin)

Administrators also see **Hold all pending** and **Release all held** when the queue has jobs in those states.


## Queue dashboard (administrators)

Administrators see a summary row of counts: pending, held, processing, failed, and related totals. Click a stat card to filter the table to that status.

A banner at the top reports **background worker** status:

- **Green** — background worker is running; pending jobs will be processed.
- **Red** — background worker is not running; pending jobs will not move until the worker is started (see [Installing the background worker](/tech_jobs_and_workers.html#installing-the-background-worker)).
- **Yellow** — status could not be determined.


## Which tasks use background jobs?

Typical user-facing flows:

| Task | Background job? | Notes |
|------|-----------------|-------|
| Publish to NADA (from Publish page) | Often yes | Long publishes run as `publish_project` jobs |
| Generate PDF documentation | Yes | `generate_pdf` |
| Microdata import in editor | Usually no | Direct import in the project UI |
| Microdata import via API | Yes | `import_microdata` |
| Indicator CSV import in editor | Usually no | Editor waits on FastAPI in the same request |
| Indicator import via API | Yes | `import_indicator_data` |
| Metadata assessment | Yes | `metadata_assessment_result` (admin-driven) |

If you only use the editor interactively and do not enqueue API jobs, you may still see jobs for PDF generation or NADA publish. **Those specific tasks** need the background worker to finish; everything else in the editor continues to work if the worker is off.


## API access

The same jobs can be listed and managed programmatically. See [Introduction to the API](/ME_API.html) and the `/api/jobs` endpoints in the API reference.

Non-admin API users only see their own jobs, matching the Jobs page behaviour.


## Getting help

If jobs remain pending with a red worker banner, contact your site administrator—they need to start or repair the **background worker** service (`metadata-editor-worker`).

If jobs fail repeatedly, open **Job details**, note the error message and UUID, and check whether FastAPI and NADA connectivity are configured (for publish and data jobs).
