# Introduction to the Metadata Editor API

## Overview

The Metadata Editor provides a user-friendly interface for creating and maintaining standards-compliant metadata. Beyond its visual interface, the application is built on a powerful Application Programming Interface (API) that allows for full programmatic access.

An API is a set of rules and tools that enables other software applications to communicate directly with the Metadata Editor. The Metadata Editor API allows users to interact programmatically with the Metadata Editor. It enables automation of key tasks such as uploading, transforming, validating, and exporting metadata across supported formats. Every action available through the user interface—from creating and updating records to searching and exporting metadata—can also be performed automatically with a script. By using the API, you can manage metadata for indicators, microdata, geographic datasets, and documents programmatically using languages like R or Python.

The Metadata Editor API is a RESTful web service. It adheres to REST principles and supports standard HTTP methods (`GET`, `POST`, `PUT`, `DELETE`) for resource operations. All responses are returned in JSON format, and endpoints are secured using API keys tied to user permissions.

## How the API Works: Endpoints

The API is structured around endpoints, which are unique URLs that a script or application can send requests to. Think of an endpoint as a specific "door" into the application, with each door designed for a particular task.

For example, a script could send a GET request to the /indicators endpoint to retrieve a list of all indicator metadata records. To create a new record, it would send a POST request to that same endpoint.

Common tasks handled by endpoints include:
  - Retrieving a list of all projects in a collection.
  - Getting the complete metadata for a single project.
  - Creating a new metadata record.
  - Updating a specific field within a record.
  - Searching for records that match certain criteria.

The official API documentation serves as a directory, detailing which endpoint to use for each action, what parameters are required, and what format to expect in the response.

## API Documentation

The full documentation of the Metadata Editor API (list and description of all endpoints) is available in annex to this document. Many users will however prefer to make use of the R package or Python library provided to interact with the software (see below).


## Secure and Controlled Access

### Access Control Using API keys

Programmatic access is managed through a robust security model that ensures data integrity and control. Access is governed by roles and permissions. While some endpoints may be public for read-only access (e.g., for a public catalog), most actions—especially creating or editing metadata—require authorization. This is managed through API keys.

To generate an API Key, you must have access to the Metadata Editor. You can then:
   1. **Log in** to the Metadata Editor through the web interface.
   2. Navigate to **User profile** page.
   3. Click on **"Generate API Key"**.
   4. Copy and securely store your key.
   
An API key is a unique, secret token that functions like a password. Each API key is uniquely tied to a registered user account. The key carries the same permissions and roles as the user within the Metadata Editor interface. Any action permitted via the UI is also permitted through the API — and vice versa. 

API keys must be treated with the same level of security as passwords. Some keys grant powerful roles, such as administrator or editor, with the ability to add, modify, or delete content. If an API key is exposed, anyone who finds it can perform actions using your identity and permissions. It is critical to keep API keys confidential and avoid sharing them in any form where others might see, copy, or store them.

  - Keep your API key secret. Treat your API key like a password. Do not share it or expose it in public repositories, scripts, or notebooks.
  - Never hard-code keys directly in scripts or notebooks. Code is often shared, versioned, and reviewed, and embedding keys creates a high risk of accidental disclosure.
  - If you believe your API key has been compromised. For example, it was accidentally committed to a repository, shared in a message, or appeared in a screenshot—immediately revoke the key and issue a new one. Notify your system administrator or security team so usage logs can be reviewed for unauthorized activity. Rapid revocation and replacement are essential to limit the window of exposure and protect the integrity of your metadata.
    
**Recommended Practices for Securely Managing API Keys**

There are multiple ways you can protect your API keys:

  - **Use Environment Variables**: Store your API key in an environment variable (e.g., METADATA_EDITOR_API_KEY) and have your script read it at runtime. Ensure that files containing these variables are not committed to version control (e.g., by adding them to .gitignore).
  - **Use a Secrets Manager**: For enterprise applications, use a dedicated secrets vault like AWS Secrets Manager or Azure Key Vault. Your application can then retrieve the key securely when needed.
  - **Encrypt Configuration Files**: If you must use a configuration file, encrypt it or protect it with OS-level permissions. Never store unencrypted keys in shared locations or repositories.
  - **Leverage OS-level Keychains**: On local machines, use the operating system’s secure credential storage (e.g., macOS Keychain, Windows Credential Manager) and access the key programmatically.
  - **Implement Runtime Prompts**: For interactive scripts, prompt the user to enter the key at runtime instead of embedding it in the code.
  - **Practice Logging Hygiene**: Ensure that your logging configuration does not print request headers or payloads that might contain the API key.
  - **Follow the Principle of Least Privilege**: Issue keys with only the minimum permissions required for the task (e.g., read-only vs. editor). Use separate keys for different workflows and rotate them regularly.

## Advantages of an API-Enabled System

Interacting with the Metadata Editor programmatically unlocks significant opportunities for automation and integration.

  1.	**Automation at Scale**: Manually entering or updating metadata for thousands of datasets is time-consuming and error-prone. With the API, you can write a script to perform these tasks automatically, ensuring consistency and freeing up your team to focus on more analytical work. For instance, you could automate the process of updating the "last modified" date for a large batch of documents.

  2.	**Integration with Other Systems**: The API allows the Metadata Editor to become a central, connected component of your data ecosystem. You can link it to other tools and platforms. For example, when a new dataset is added to a database, a script can automatically call the Metadata Editor's API to create its corresponding metadata record.
  
  3.	**Two-Way Communication**: The API supports both reading and writing information.
    - Extracting Information: Use the API to read, search, and export any metadata stored in the application. This is useful for generating reports, populating a public data catalog, or performing automated quality checks.
    - Posting and Editing Information: Use the API to create new records, update existing ones, or delete them. This enables programmatic maintenance and bulk updates, ensuring your metadata remains current.

## Examples of Use Cases

Here are examples of use cases for the use of the Metadata Editor API:

  1.	**Automated onboarding of new datasets**: When a new dataset is published in a data warehouse, a Python script detects it, creates a standards-compliant metadata record via the API, assigns tags and classifications, links to documentation, and sets review tasks—ensuring every dataset enters the catalog with complete, consistent metadata without manual steps.
  2.	**Batch updates for policy changes**: If a metadata standard changes, an R script using MetadataEditR scans all affected records, updates the field across thousands of entries, logs changes, and triggers validation via endpoints—bringing the catalog into compliance quickly and reliably.
  3.	**Quality assurance and validation pipelines**: Nightly jobs extract all newly edited records via the API, run automated checks for missing fields, inconsistent code lists, or invalid references, and post corrections (or flag issues for human review) back into the system, raising metadata quality continuously.
  4.	**Synchronizing with external catalogs**: A scheduled integration reads public catalog entries from another platform, compares them with local projects, and programmatically creates or updates metadata in the Editor.
  5.	**Versioning and release management**: For indicators updated monthly, a script creates a new metadata version for each release, copies prior fields, updates time coverage and source notes, assigns the release tag, and publishes the project—providing clear version history and reproducibility.
  6.	**Bulk document association**: When a large set of methodological notes or reports is finalized, a workflow attaches the correct PDFs to their corresponding datasets via endpoints, updates citation fields, and adds keywords—saving hours of manual uploading and ensuring documents are discoverable.
  7.	**Role-based editorial workflow**: Using API keys with embedded permissions, a pipeline routes new metadata to an editor role for review, then to an approver role for final publishing, recording actions and comments—formalizing governance and ensuring only authorized users can publish changes.
  8.	**Event-driven notifications and dashboards**: A monitoring service listens for changes in key endpoints (e.g., new microdata added or access level modified) and updates a dashboard, sends email alerts, or posts messages to collaboration tools—keeping stakeholders informed and enabling timely interventions.
  9.	**Data privacy and access controls at scale**: Scripts apply or update access levels across sensitive microdata collections (e.g., switching from “internal” to “restricted” with masked variables), verify compliance with policies, and audit who accessed what via API logs—strengthening data protection.
  10.	**Research reproducibility packs**: A researcher’s workflow uses PyMetadata to pull the exact metadata version referenced in a publication, bundles it with datasets and code, and pushes a curated “replication package” project into the Editor—making studies easier to reproduce and cite with complete provenance.

## R and Python Support

The Metadata Editor API can be used with any language that supports HTTP requests, such as R or Python commands. For example, the following commands will extract, return, and print a list of projects found in your Metadata Editor:

```Python
import requests
API_KEY = "your_api_key_here"
headers = {"X-API-Key": API_KEY}
response = requests.get("https://your-metadata-editor.org/api/projects", headers=headers)
print(response.json())
```

```r
library(httr)
api_key <- "your_api_key_here"
url <- "https://your-metadata-editor.org/api/projects"
res <- GET(url, add_headers(`X-API-Key` = api_key))
content(res, "parsed")
```

To help users leverage the API without needing deep programming expertise, we developed specialized open-source packages for R and Python users. These packages are available on GitHub and provide a more accessible entry point to the API's capabilities.

  - **metadataeditr**: An R package providing high-level functions to connect to the Metadata Editor, retrieve metadata, and integrate it directly into R-based data analysis workflows. See https://github.com/ihsn/metadataeditr 
   - **PyMetadataEditor**: A Python library designed for developers and data engineers that simplifies authentication, API calls, and management of metadata records within Python applications. See https://github.com/mah0001/pymetadataeditor 


## Generating Metadata Programmatically - Principles

### Using R
In R, metadata is generated by constructing a list object comprising nested lists that correspond to the groups of metadata elements defined in the standard. The organization of elements and their associated data types must adhere strictly to the schema specifications set forth in the Bank’s metadata standards. Within the description of standards, curly brackets { } signify that a group of elements must be represented as a list, while square brackets [ ] indicate repeatable elements which are implemented as lists of lists. The Figure below illustrates the mapping between schema notation and the corresponding R list structure.
 

### Using Python

In Python, metadata is organized as dictionaries, with nested dictionaries and lists reflecting the metadata standard's hierarchy. Non-repeatable elements use dictionaries, while repeatable ones are stored as lists of dictionaries. In the documentation of standards, { } denotes a dictionary and [ ] indicates repeatable items as lists of dictionaries. The Figure below illustrates the mapping between schema notation and the corresponding Python dictionary structure. 


## Code Examples

The examples below show how MetadataEditR (or PyMetadataEditor) are used in combination with base commands and functions from other packages (for R) or libraries (for Python) to automate tasks. 

Example 1: Generating metadata for a document and publishing it in the Metadata Editor

We assume you have a PDF document (file “Doc01.PDF”) in a folder “C:\MyFolder”. You want to capture its cover page to be used as a thumbnail, generate core metadata for the document, and upload the metadata and the document in the Metadata Editor as a new project with ID = D001. 


 




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



