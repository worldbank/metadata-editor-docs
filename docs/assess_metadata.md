# Metadata reviewer

The **metadata reviewer** is an AI-assisted review that helps you **improve** project metadata. It sends your metadata to the configured reviewer service, which returns findings — typos, missing fields, inconsistencies, unclear wording, and similar — often with suggested text you can apply to the project.

Findings appear as **issues** on the project **Issues** page. You work through them the same way as other issues: comment, accept, reject, dismiss, or **apply** a suggestion.

The metadata reviewer is built on [ai4data](https://worldbank.github.io/ai4data/docs/metadata-reviewer/overview.html). For pipeline design, categories, and severity scoring, see the [Metadata Reviewer overview](https://worldbank.github.io/ai4data/docs/metadata-reviewer/overview.html). For installation, API usage, and troubleshooting the reviewer package itself, see the [Metadata Reviewer User Manual](https://worldbank.github.io/ai4data/docs/metadata-reviewer/user-manual/index.html).

## How it works

1. Open the project **Issues** page and click **Assess metadata**.
2. The reviewer analyzes the metadata (this runs in the background; you can leave the page).
3. New issues appear on the **Open** tab when the run completes.
4. Review and resolve items using the [Project issues](/project_issues.html) workflow.

Your site must have the metadata reviewer installed and enabled. See [Install the metadata reviewer](/tech_installation_metadata_reviewer.html).


## When your site has it enabled

The **Assess metadata** button appears only when a site administrator has turned on **Metadata assessment** in site configurations **and** the required services are running.

Before starting, the application checks:

- The **assessment service** (FastAPI with the metadata reviewer add-on) is available.
- The **background worker** is running (review runs as a background job).

If the button is missing, the feature is disabled for your site. If it is disabled with a tooltip, contact your administrator.


## Running a review

1. Open the project **Issues** page.
2. Click **Assess metadata**.
3. Confirm in the dialog. It explains that metadata is sent to the quality assessment service and that new issues will be added to this list.
4. The job runs in the **background**. You may leave the page and return later; open **Assessment status** from the button while a run is in progress.

When the review completes, refresh the issue list. New items are categorized (for example typo/wording, inconsistency, missing data) and may include suggested metadata to apply.

Monitor jobs on [Managing background jobs](/managing_jobs.html) (`metadata_assessment_result`).


## Privacy

The metadata reviewer sends **project metadata** to the configured LLM provider (Azure OpenAI, OpenAI, Ollama, Anthropic, or similar). Review your organization’s data-handling and AI policies before using it on sensitive content.


## Related documentation

- [Project issues](/project_issues.html) — working with issues, comments, and suggestions
- [Install the metadata reviewer](/tech_installation_metadata_reviewer.html)
- [Metadata Reviewer overview](https://worldbank.github.io/ai4data/docs/metadata-reviewer/overview.html) — pipeline, categories, and output schema
- [Metadata Reviewer User Manual](https://worldbank.github.io/ai4data/docs/metadata-reviewer/user-manual/index.html) — reviewer package installation and API
- [Managing background jobs](/managing_jobs.html)
- [Jobs and background workers](/tech_jobs_and_workers.html)
