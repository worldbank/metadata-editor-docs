# Introduction to the Metadata Editor API

The **Metadata Editor API** is a RESTful web service that allows users to interact programmatically with the Metadata Editor. It enables automation of key tasks such as uploading, transforming, validating, and exporting metadata across supported formats.

The API adheres to REST principles and supports standard HTTP methods (`GET`, `POST`, `PUT`, `DELETE`) for resource operations. All responses are returned in JSON format, and endpoints are secured using API keys tied to user permissions.

## Key Features
- Upload and retrieve metadata files
- Convert between metadata formats (e.g., CSV to DDI XML)
- Validate metadata against predefined schemas
- Manage projects, datasets, and schema mappings

## Programming Language Support

The Metadata Editor API can be used with any language that supports HTTP requests. Official libraries are available for the following languages:

### Python
A Python client library is provided to simplify interaction with the API using familiar data structures like `pandas.DataFrame`.

See: [Python package →](https://github.com/mah0001/pymetadataeditor)

### R
An R package is also available, enabling integration into R-based data workflows and analysis scripts.

See: [R package →](https://github.com/ihsn/metadataeditr)

---

Refer to the following chapters for detailed usage instructions, including authentication, endpoint references, and code examples in both Python and R.



## Warnings and Recommendations

Access to the Metadata Editor API requires a valid **API key**.

### Key Ownership and Permissions
- Each API key is uniquely tied to a **registered user account**.
- The key carries the **same permissions and roles** as the user within the Metadata Editor interface.
- Any action permitted via the UI is also permitted through the API — and vice versa.

### Security Guidelines
- **Keep your API key secret**. Do not share it or expose it in public repositories, scripts, or notebooks.
- Treat your API key like a **password**. Hardcoding it in plaintext files is strongly discouraged.
- If you believe your API key has been compromised:
  - **Revoke it immediately** and generate a new one.
  - **Notify your system administrator** so usage logs can be reviewed for unauthorized activity.

### Additional Security Recommendations
- Use environment variables or secure credential stores (e.g., `.env` files, secret managers) to manage keys in production environments.

By following these precautions, you help ensure the integrity and security of your metadata workflows.


## Getting Started

To begin using the Metadata Editor API, you’ll need to generate an API key and use it to authenticate your requests.

---

### Step 1: Generate an API Key

1. **Log in** to the Metadata Editor through the web interface.
2. Navigate to **User profile** page.
3. Click on **"Generate API Key"**.
4. Copy and securely store your key.
5. Use this key in your API requests as an `X-API-kEY` header:

```http
X-API-Key: YOUR_API_KEY_HERE
```

### Quick examples

#### Python example using `requests`

```
import requests

API_KEY = "your_api_key_here"
headers = {"X-API-Key": API_KEY}

response = requests.get("https://your-metadata-editor.org/api/projects", headers=headers)

print(response.json())
```


#### Python example using `requests`

```
import requests

API_KEY = "your_api_key_here"
headers = {"X-API-Key": API_KEY}

response = requests.get("https://your-metadata-editor.org/api/projects", headers=headers)

print(response.json())
```

#### R example using `httr`

```
library(httr)

api_key <- "your_api_key_here"
url <- "https://your-metadata-editor.org/api/projects"

res <- GET(url, add_headers(`X-API-Key` = api_key))
content(res, "parsed")
```


