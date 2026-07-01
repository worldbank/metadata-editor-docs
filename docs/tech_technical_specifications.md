# Technical specifications

## Architecture
The application follows a **three-tier architecture**:
- **Frontend**: Built using **Vue.js**, providing a responsive and interactive user interface for metadata editing.
- **Backend (Metadata Editor)**: PHP / CodeIgniter — application logic, authentication, sessions, job queue orchestration, and requests to the FastAPI service.
- **FastAPI service**: Implemented using **FastAPI (Python)** ([Metadata Editor FastAPI](https://github.com/worldbank/metadata-editor-fastapi)), offering high-performance endpoints for reading, validating, and converting statistical data (SPSS, Stata, CSV), and for indicator timeseries import, queries, charts, and export.

A separate **background worker** (`metadata-editor-worker` service) optionally processes long-running tasks from the Metadata Editor job queue (publish to NADA, PDF generation, API-driven imports). The application runs without it; the worker is recommended for batch, heavy, and automated workflows. See [Jobs and background workers](/tech_jobs_and_workers.html).


## Frontend (Vue.js)
- **Framework**: Vue.js
- **Key Libraries**:
  - Vuetify
  - Vuex (state management)
  - Axios (API communication)
  - Vue Router



## Backend (PHP)
- **Framework**: CodeIgniter
- **Responsibilities**:
  - Routing and user session management
  - Authentication and role-based access control
  - Background job queue (`job_queue` table) and background worker CLI
  - Request dispatch to the FastAPI service for data operations
  - Logging and error handling



## FastAPI service (Python)
- **Framework**: FastAPI
- **Dependencies** (include among others):
  - `pandas`: Data manipulation and structure transformation
  - `pyreadstat`: Import/export of statistical file formats (SPSS, Stata, SAS)
  - Indicator timeseries: CSV import, validation, paging, charts, and export
- **Note**: The FastAPI service runs its own internal jobs for some operations (e.g. large indicator CSV import). That is separate from the Metadata Editor **background worker**.



## Background worker (optional)
- **Service name**: `metadata-editor-worker`
- **Command**: `php index.php cli/worker/run` (PHP CLI)
- **Purpose**: Process job queue entries (publish, PDF, API imports, metadata assessment)
- **Required?** No — the Metadata Editor functions without it; recommended for batch, heavy processing, and API automation
- **Deployment**: systemd (Linux), NSSM (Windows), or `worker.sh` for manual/development use
- **Documentation**: [Jobs and background workers](/tech_jobs_and_workers.html)




## Deployment
- **Server requirements**:
  - PHP 8.2+
  - Apache/Nginx or IIS
  - Python 3.11+ (FastAPI service)
  - MySQL 8.x or MariaDB 10.x+
