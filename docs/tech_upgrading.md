# Upgrading the Metadata Editor

This page describes the **general upgrade procedure** that applies to every release. Version-specific database changes, new services, and breaking changes are documented on separate pages — start with the guide for the version you are upgrading **to**.

## Upgrade to the latest version

| Target version | Upgrade steps | Release notes |
|----------------|---------------|---------------|
| **v1.3.0** | [Upgrade to v1.3.0](/tech_upgrading_v1_3.html) | [GitHub release](https://github.com/worldbank/metadata-editor/releases) |
| **v1.2.0** | [Upgrade to v1.2.0](/tech_upgrading_v1_2.html) | [GitHub release](https://github.com/worldbank/metadata-editor/releases) |

If you are more than one major version behind, apply upgrades **in order** (for example 1.1 → 1.2 → 1.3), running each version's database migrations before moving to the next.

Official release packages and GitHub release notes:

👉 [https://github.com/worldbank/metadata-editor/releases](https://github.com/worldbank/metadata-editor/releases)


## 1. Back up your environment

Before making any changes:

- **Application files** — copy the entire Metadata Editor directory (and the FastAPI folder if installed separately).
- **Database** — export your MySQL/MariaDB database:

  ```bash
  mysqldump -u your_user -p your_database > backup-$(date +%Y%m%d).sql
  ```

- **Configuration** — note copies of `application/config/database.php`, `editor.php`, `email.php`, `auth.php`, and `fastapi/.env` if you customized them.


## 2. Download the new release

Download the release package for the target version from GitHub:

👉 [https://github.com/worldbank/metadata-editor/releases](https://github.com/worldbank/metadata-editor/releases)

If you use Git, check out the release tag instead of `main` or `develop`.


## 3. Replace application files

Preserve your current installation, then deploy the new code:

```bash
mv metadata-editor metadata-editor-backup
unzip metadata-editor-vX.Y.Z.zip -d metadata-editor
```

Or merge a Git checkout over your deployment path, keeping local config files.


## 4. Restore configuration and user data

Copy from your backup into the new installation:

| Path | Action |
|------|--------|
| `datafiles/` | **Restore** — project uploads and derived data |
| `files/` | Restore if you store custom assets there |
| `application/config/database.php` | **Keep** your database credentials |
| `application/config/email.php` | **Keep** your SMTP settings |
| `application/config/editor.php` | **Merge** — keep `storage_path`, `data_api_url`, and other local values |
| `application/config/auth.php` | **Keep** if you configured OIDC or custom auth |
| `fastapi/.env` | **Keep** — especially `STORAGE_PATH` |

Do **not** replace `datafiles/` with an empty folder from the release archive.

Also update the **FastAPI service** from [metadata-editor-fastapi](https://github.com/worldbank/metadata-editor-fastapi) when the release notes require it (indicator data and microdata import depend on a compatible FastAPI version).


## 5. Apply database updates

Each release may include schema changes. **Always read the version-specific upgrade page** before running migrations.

### Versions prior to v1.2.0

Apply SQL scripts from the release notes manually:

```bash
mysql -u your_user -p your_database < install/schema.mysql-update-X.Y.sql
```

### v1.2.0 and later

The application ships **database migration files** under `application/migrations/`. Apply pending migrations in one of these ways:

**Recommended — Site administration**

1. Log in as Site Administrator.
2. Open **Admin → Settings → Database Updates**.
3. Apply each pending migration in order.
4. Use **Mark as applied** only when you already ran the equivalent SQL manually.

**Command line**

From the Metadata Editor application root:

```bash
php index.php cli/migrate latest
```

**Manual SQL**

When migrations are unavailable, use the consolidated script named in the version upgrade guide, for example:

- v1.2.0: `install/schema.mysql-update-1.2.sql`
- v1.3.0: `install/schema.mysql-update-1.3.sql`

Ignore duplicate column/table errors if you re-run statements that were already applied.


## 6. Post-upgrade checks

After code and database updates:

1. Confirm the application loads and you can log in.
2. Verify the [FastAPI service](/tech_installation_data_api.html) is running if you use data import or indicator timeseries.
3. If you use background jobs, confirm the [background worker](/tech_jobs_and_workers.html) service is running.
4. Review [Post-install configuration](/tech_post_install_configuration.html) for smoke tests (microdata import, email, optional job queue).

Then follow any **additional steps** listed on the version-specific upgrade page.


## Resources

- [All releases](https://github.com/worldbank/metadata-editor/releases)
- [Report an issue](https://github.com/worldbank/metadata-editor/issues)
- [Jobs and background workers](/tech_jobs_and_workers.html)
- [Post-install configuration](/tech_post_install_configuration.html)


## Need help?

If an upgrade fails, restore from your backup and report the problem on GitHub Issues.

For email support: datatools [at] worldbank [dot] org
