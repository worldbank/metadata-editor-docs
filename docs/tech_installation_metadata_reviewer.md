# Install the metadata reviewer (optional)

The **metadata reviewer** is an optional add-on to the [FastAPI service](/tech_installation_data_api.html). In the Metadata Editor, it adds AI-generated issues with suggested corrections when you click **Assess metadata** on the project **Issues** page.

For the end-user workflow, see [Metadata reviewer](/assess_metadata.html) and [Project issues](/project_issues.html). The sections below cover installation and site configuration.

The reviewer is built on [ai4data](https://worldbank.github.io/ai4data/docs/metadata-reviewer/overview.html). For agent design, output schema, and provider-specific client usage, see the [Metadata Reviewer documentation](https://worldbank.github.io/ai4data/docs/metadata-reviewer/overview.html) — do not duplicate that material here.


## Requirements

| Component | Required? |
|-----------|-----------|
| Metadata Editor (PHP) | Yes |
| FastAPI service (base install) | Yes |
| Reviewer Python packages + `reviewer.env` | Yes — this add-on |
| LLM provider credentials (Azure OpenAI, OpenAI, Ollama, Anthropic, etc.) | Yes |
| PHP **background worker** (`metadata-editor-worker`) | Yes — assessment runs as a background job |
| Site setting **Metadata assessment** enabled | Yes — default is off |

Microdata import and indicator timeseries **do not** require the reviewer. The core FastAPI service starts without it.


## Step 1 — Install reviewer packages on the FastAPI host

On the FastAPI server, with your Python environment activated:

```bash
cd fastapi
pip install -r requirements-reviewer.txt
```

Default extras target **Azure OpenAI**. For other providers, see [FastAPI README-reviewer.md](https://github.com/worldbank/metadata-editor-fastapi/blob/main/README-reviewer.md) and [ai4data installation](https://worldbank.github.io/ai4data/docs/metadata-reviewer/overview.html).

Restart the FastAPI service after installing packages.


## Step 2 — Configure reviewer credentials

Copy the example file next to the FastAPI app:

```bash
cp reviewer.env.example reviewer.env
```

Edit `reviewer.env` for your provider. Key settings include:

| Variable | Purpose |
|----------|---------|
| `REVIEWER_PROVIDER` | `azure`, `openai`, `ollama`, or `anthropic` |
| `REVIEWER_MODEL` | Model or deployment name |
| `REVIEWER_CONCURRENCY` | Parallel reviews (default 10) |
| `REVIEWER_JOB_TIMEOUT_SEC` | Per-job timeout (default 900) |

Provider API keys or Azure Entra settings go in this file. `reviewer.env` is gitignored.

Full variable list: `reviewer.env.example` in the [metadata-editor-fastapi](https://github.com/worldbank/metadata-editor-fastapi) repository.


## Step 3 — Verify FastAPI

After restart, confirm reviewer routes are registered:

- Startup log mentions metadata reviewer routes at `/review`
- OpenAPI docs at `http://127.0.0.1:8000/docs` list `/review/jobs` and related endpoints

Quick check:

```bash
curl http://127.0.0.1:8000/review/manifests
```

If reviewer packages are missing, the base FastAPI app still runs; `/review/*` routes are simply absent.


## Step 4 — Background worker

Assessment submits work to FastAPI, then a PHP job (`metadata_assessment_result`) polls for results and writes issues into the database. Install and run the worker:

- [Jobs and background workers](/tech_jobs_and_workers.html)
- Linux: `deploy/linux/install-service.sh`
- Windows: `deploy/windows/install-service.ps1`

Without the worker, **Assess metadata** may queue but never complete.


## Step 5 — Enable in the Metadata Editor

1. Log in as **Site Administrator**.
2. Open **Site administration → Settings** (site configurations).
3. Enable **Metadata assessment** — *Enable the Assess metadata feature on the Issues page*.
4. Save.

The setting is stored as `metadata_assessment_enabled` (default **off** on new sites).

Ensure `data_api_url` in `application/config/editor.php` points at the FastAPI service — see [Post-install configuration](/tech_post_install_configuration.html).


## Step 6 — Smoke test

1. Open a test project as administrator.
2. Go to **Issues → Assess metadata**.
3. Confirm the dialog does not warn that the worker or assessment service is offline.
4. After completion, new issues appear on the Issues list.
5. Optionally verify the job on [Managing background jobs](/managing_jobs.html).

Logs: `logs/metadata_assessment.log` and `logs/worker.log` under the Metadata Editor application root.


## Privacy and cost

Automated review sends **project metadata JSON** to the configured LLM provider. Review your organization’s data-handling and AI use policies before enabling production access.

Concurrency and timeouts in `reviewer.env` affect API cost and load.


## Troubleshooting

| Symptom | Check |
|---------|--------|
| No **Assess metadata** button | Site setting disabled; user is not site admin |
| Button disabled — worker offline | Start `metadata-editor-worker` |
| Button disabled — service unavailable | FastAPI running; reviewer routes registered; `data_api_url` correct |
| `503` on review submit | `reviewer.env` credentials invalid or missing |
| Job stuck / failed | [Managing background jobs](/managing_jobs.html); FastAPI `/jobs/{id}`; worker log |
| No `/review` in API docs | Re-run `pip install -r requirements-reviewer.txt` and restart FastAPI |

FastAPI-specific details: [README-reviewer.md](https://github.com/worldbank/metadata-editor-fastapi/blob/main/README-reviewer.md).

ai4data FAQ and advanced usage: [Metadata Reviewer User Manual](https://worldbank.github.io/ai4data/docs/metadata-reviewer/overview.html).
