
# Upgrade Guide

This guide provides general upgrade instructions, followed by version-specific notes for upgrading.

---

## General Upgrade Instructions

> Use these steps for all upgrades, unless otherwise noted.

### 1. Backup Your Environment

Before making any changes:

- **Application Files**: Copy the entire application directory to a secure location.
- **Database**: Export your database using a tool like `mysqldump`:

  ```bash
  mysqldump -u your_user -p your_database > backup.sql
  ```

---

### 2. Download the Latest Version

Download the latest release package from the GitHub repository:

👉 [https://github.com/worldbank/metadata-editor/releases](https://github.com/worldbank/metadata-editor/releases)

---

### 3. Replace Application Files

- Rename your current application folder to preserve it:

  ```bash
  mv metadata-editor metadata-editor-backup
  ```

- Unzip the new release and place it in the original folder path:

  ```bash
  unzip metadata-editor-v1.0.0.zip -d metadata-editor
  ```

---

### 4. Restore Configuration and User Data

Copy the following files and folders from your backup to the new installation:

- `datafiles/`
- `application/config/config.php`
- `application/config/email.php`
- `application/config/database.php`

---

### 5. Database updates

If the upgrade includes schema changes, apply them using SQL. Always review the release notes before applying migrations.

---

## Version-Specific Upgrade Notes

### Upgrading to **v1.0.0**  
**Release Date:** July 30, 2025  
**Tag:** `v1.0.0`
**Version release link:** https://github.com/worldbank/metadata-editor/releases/tag/V1.0.0

This is a major release that introduces key improvements and fixes:

- Added support for project versioning and locking.
- UI and API updates for managing publishing to NADA catalogs.
- Added validation checks for variable deletion (prevents deleting variables used as weights).
- Improved error reporting for publishing projects to NADA.
- Fixed handling of Stata special missing values (e.g. .a, .b, .c).
- Improved translations and batch variable editing.
- Miscellaneous fixes and minor improvements throughout.
- Backend FastAPI integration

#### ✅ Applies To:

All versions prior to `v1.0.0`, including:
- Pre-release/beta versions
- Clones of the `main` branch before July 2025

---

### 🔧 Additional Upgrade Steps for v1.0.0

#### 1. Run SQL Migration

Update your database schema:

```sql
ALTER TABLE `audit_logs` ADD COLUMN `obj_ref_id` INT NULL;

ALTER TABLE `editor_projects` 
ADD COLUMN `pid` INT NULL AFTER `study_idno`,
ADD COLUMN `is_locked` INT NULL AFTER `pid`,
ADD COLUMN `version_created` INT NULL AFTER `is_locked`,
ADD COLUMN `version_created_by` INT NULL AFTER `version_created`,
ADD COLUMN `version_notes` VARCHAR(500) NULL AFTER `version_created_by`,
ADD COLUMN `version_number` VARCHAR(15) NULL AFTER `study_idno`,
ADD UNIQUE INDEX `unq_idno` (`idno` ASC, `version_number` ASC);

CREATE INDEX idx_sid_fid_name ON editor_variables (sid, fid, name);
```

#### 2. Update Python Backend

If you're using the FastAPI-based service (https://github.com/worldbank/metadata-editor-fastapi):

- Download zip from https://github.com/worldbank/metadata-editor-fastapi
- Replace your current `metadata-editor-fastapi` with the contents from the zip
- Run from command line to install any dependencies 

```bash
cd backend
pip install -r requirements.txt
```

Make sure you're running Python 3.12+.

---

## 📘 Resources

- 🔗 [Changelog for v1.0.0](https://github.com/worldbank/metadata-editor/releases/tag/v1.0.0)
- 🐛 [Report an issue](https://github.com/worldbank/metadata-editor/issues)
- 📥 [Download latest release](https://github.com/worldbank/metadata-editor/releases)

---

## 🛟 Need Help?

If you encounter issues during upgrade, restore from your backup and report the problem through the GitHub Issues page. 

For email support contact: datatools [at] worldbank [dot] org
