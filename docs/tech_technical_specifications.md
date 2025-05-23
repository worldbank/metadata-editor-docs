# Technical specifications

## Architecture
The application follows a **three-tier architecture**:
- **Frontend**: Built using **Vue.js**, providing a responsive and interactive user interface for metadata editing.
- **Backend**: Developed in **PHP**, managing application logic, user authentication, session handling, and orchestration of API requests.
- **Data Conversion API**: Implemented using **FastAPI (Python)**, offering high-performance endpoints for reading, validating, and converting data from SPSS and STATA.


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
  - Request dispatch to Python API
  - Logging and error handling



## Data conversion API (FastAPI – Python)
- **Framework**: FastAPI
- **Dependencies**:
  - `pandas`: Data manipulation and structure transformation
  - `pyreadstat`: Import/export of statistical file formats (SPSS, Stata, SAS)




## Deployment
- **Server requirements**:
  - PHP 8.2+
  - Apache/Nginx
  - Python 3.8+ environment
  - MySQL or MariaDB
