# Upgrade to v1.3.0

Upgrade **from v1.2.x to v1.3.0**. Follow the [general upgrade procedure](/tech_upgrading.html) first (backup, replace code, restore config and `datafiles/`), then apply the steps below.

For feature summaries and the full change list, see the [v1.3.0 release on GitHub](https://github.com/worldbank/metadata-editor/releases).

If you are on **v1.1.x or earlier**, upgrade to [v1.2.0](/tech_upgrading_v1_2.html) before upgrading to v1.3.0.


## 1. Update application code

Deploy Metadata Editor **v1.3.0** from [GitHub releases](https://github.com/worldbank/metadata-editor/releases).

Update the **FastAPI service** to a release compatible with v1.3 if you use:

- Microdata import (Stata, SPSS, CSV)
- **Indicator timeseries** (CSV import, charts, data explorer)

See [Install and configure the FastAPI service](/tech_installation_data_api.html) and [Post-install configuration](/tech_post_install_configuration.html) — `STORAGE_PATH` and `data_api_url` must match.


## 2. Apply database migrations

v1.3.0 includes substantial schema changes (global codelists, global data structures, project issues enhancements, job queue updates, roles).

### Recommended — Admin UI

1. Log in as Site Administrator.
2. Open **Admin → Settings → Database Updates**.
3. **Apply all pending migrations** in the order shown until none remain.

The list may include more than one step for v1.3 (for example a schema upgrade and a separate **indicator ID backfill** for existing bound indicator projects). The UI shows what is pending; you do not need to know migration file names.

### Command line

From the Metadata Editor application root:

```bash
php index.php cli/migrate latest
```

This applies every pending migration through the latest version for the installed code.

### Manual SQL

Use this only when you cannot run migrations through the Admin UI or CLI.

1. Apply the consolidated schema script:

   ```bash
   mysql -u your_user -p your_database < install/schema.mysql-update-1.3.sql
   ```

2. In **Admin → Database Updates**, **mark the v1.3 schema migration as applied** (if you ran the SQL by hand), then **apply any remaining pending migrations**.

   v1.3 may leave one pending migration that has **no SQL file** — a data backfill for indicator projects bound to a global DSD. Run it from the Admin UI or CLI if you use indicator DSD bindings; otherwise it is safe to leave skipped.

Re-running individual `ALTER` statements may produce duplicate-column errors if already applied — that is expected.


## 3. Legacy indicator DSD tables

The v1.3 migration **drops abandoned per-project DSD/codelist tables** if present and moves indicator structural metadata to the **global registry**. After upgrade:

- Review indicator projects that used the old DSD UI.
- Re-bind projects to global data structures if needed (see future indicator documentation).

Existing project **descriptive metadata** is not removed by this migration.


## 4. Optional services (new or expanded in v1.3)

| Service | Required? | When |
|---------|-----------|------|
| **FastAPI** | Yes for data | Microdata import; indicator CSV / timeseries |
| **Background worker** | Optional | Background publish, PDF jobs, API `/api/jobs/*`, metadata assessment |

Interactive indicator import in the editor uses FastAPI with **wait** in the HTTP request — the background worker is **not** required for that path. See [Jobs and background workers](/tech_jobs_and_workers.html).

Install or restart the worker after upgrade if you already use background jobs:

- Linux: `deploy/linux/install-service.sh` (or your existing systemd unit)
- Windows: `deploy/windows/install-service.ps1`


## 5. Configuration to review

| Setting | Location | Notes |
|---------|----------|-------|
| `data_api_url` / `EDITOR_DATA_API_URL` | `application/config/editor.php` | Required for indicator and microdata data features |
| `storage_path` + FastAPI `STORAGE_PATH` | `editor.php`, `fastapi/.env` | Must align; see [Post-install configuration](/tech_post_install_configuration.html) |
| Metadata assessment toggle | Site administration / site configurations | Shows the **Assess metadata** button on the Issues page; see [Metadata reviewer](/assess_metadata.html). [Project issues](/project_issues.html) are available independently. |
| Default Editor role, project sharing | Site configurations | New in v1.3 — review for your organization |
| Registry role assignments | Users and roles | Codelist manager, data structure manager, Project manager |

If you use OIDC, keep your existing `application/config/auth.php` — no change required unless release notes specify otherwise.


## 6. Post-upgrade verification

1. Log in; open **Admin → Database Updates** — no unexpected pending migrations.
2. Open an indicator project — DSD binding and overview load without errors.
3. If applicable: import a small indicator CSV or microdata file (confirms FastAPI).
4. If you use jobs: open [Managing background jobs](/managing_jobs.html) — worker banner shows healthy state for admins.
5. Assign **Project manager** or registry roles if your workflow requires them ([Managing users and roles](/tech_roles_permissions.html) — update role docs separately if still on pre-v1.3 text).


## Related

- [General upgrade procedure](/tech_upgrading.html)
- [Jobs and background workers](/tech_jobs_and_workers.html)
- [GitHub releases](https://github.com/worldbank/metadata-editor/releases)
