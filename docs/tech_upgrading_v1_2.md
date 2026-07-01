# Upgrade to v1.2.0

Upgrade **from v1.1.x (or earlier) to v1.2.0**. Follow the [general upgrade procedure](/tech_upgrading.html) first, then apply the steps below.

For feature summaries and the full change list, see the [v1.2.0 release on GitHub](https://github.com/worldbank/metadata-editor/releases).

After v1.2.0, continue to [Upgrade to v1.3.0](/tech_upgrading_v1_3.html) for the latest release.


## 1. Update application code

Deploy Metadata Editor **v1.2.0** from [GitHub releases](https://github.com/worldbank/metadata-editor/releases).

Install or update the **FastAPI service** if you use microdata import — v1.2 expects a compatible [metadata-editor-fastapi](https://github.com/worldbank/metadata-editor-fastapi) release.


## 2. Apply database updates

v1.2.0 introduces the job queue, geospatial tables, analytics, tags, indicator DSD tables, project issues, metadata schemas, and project type renames.

### Recommended — Admin UI

1. Log in as Site Administrator.
2. Open **Admin → Settings → Database Updates**.
3. Apply all pending migrations for v1.2.

### Command line

```bash
php index.php cli/migrate latest
```

### Manual SQL

```bash
mysql -u your_user -p your_database < install/schema.mysql-update-1.2.sql
```

Key changes include `job_queue`, `metadata_schemas`, geospatial feature tables, analytics tables, tags, `indicator_dsd`, `project_issues`, and updates to `editor_projects.type` values.


## 3. New optional components

| Component | Purpose |
|-----------|---------|
| **FastAPI service** | Microdata import/export; required for data file features |
| **Background worker** | Optional — job queue for PDF, background publish, large imports via API |

See [Jobs and background workers](/tech_jobs_and_workers.html) and [Post-install configuration](/tech_post_install_configuration.html).

### OIDC

If you plan to use OpenID Connect, configure `application/config/auth.php` after upgrade — [User authentication (OpenID)](/tech_user_authentication.html).


## 4. Post-upgrade verification

1. Log in and confirm **Database Updates** shows no unexpected pending migrations.
2. Import a small microdata file (confirms FastAPI connectivity).
3. Optionally start the background worker and enqueue a test job.


## Related

- [General upgrade procedure](/tech_upgrading.html)
- [Upgrade to v1.3.0](/tech_upgrading_v1_3.html) — next step for current releases
- [GitHub releases](https://github.com/worldbank/metadata-editor/releases)
