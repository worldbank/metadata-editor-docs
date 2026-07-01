# Project issues

The **Issues** feature helps you **improve** project metadata through tracking, **comments**, and **suggestions**. Use the **Issues** page to record review notes, collaborate with colleagues, and apply suggested corrections.

Issues work on **any project type** (microdata, indicator, document, geographic, and others).


## When to use Issues

- At any stage of a project — while entering metadata, during review, or after updates.
- When collaborating and you want a shared list of review items, comments, and suggested changes.
- To link feedback to specific metadata fields and see open items while you edit.


## Open the Issues page

**From a project**

1. Open the project.
2. Open the project **Options** menu (main navigation).
3. Click **Issues**.

**Across projects**

Open **Issues** from the main navigation bar (alongside Projects, Collections, Templates, and similar tabs). You see issues from all projects you are allowed to view.


## Issue list

The list has two tabs:

| Tab | Shows |
|-----|--------|
| **Open** | Issues still under review (`open`, `accepted`, and other non-closed statuses in this scope). |
| **Closed** | Resolved or dismissed issues (`fixed`, `rejected`, `dismissed`, `false_positive`, and related). |

Use the filters above the table:

- **Status** — e.g. open, accepted, rejected
- **Category** — typo/wording, inconsistency, missing data, format, completeness, other
- **Severity** — low, medium, high, critical
- **Applied** — whether a suggested correction was already applied to project metadata

Select rows for **Bulk actions**: accept, reject, dismiss, mark as false positive, or delete selected.


## Creating issues

### With AI (metadata reviewer)

Run a review from the project **Issues** page by clicking **Assess metadata**. The **metadata reviewer** analyzes your metadata with AI and **automatically adds issues** — often with field paths, categories, severity, and **suggested** corrections.

When the review completes, new items appear on the **Open** tab. You and your colleagues then comment, accept, reject, or apply suggestions like any other issue.

See [Metadata reviewer](/assess_metadata.html) for how it works and what to expect.

### Your own review notes

If you have **edit** access on the project, click **New Issue** to record **comments**, improvement ideas, or **suggestions** yourself — for example during peer review.


## Issues on metadata fields

While editing metadata, fields with **open issues** show a small warning chip (for example `2 issues`) beside the label. Click the chip to open the list of issues for that field.

After you resolve or close issues, chips update when the issue list is refreshed.


## View and work with an issue

Click an issue description to open its detail view. You will typically see:

- **Description** of the issue (comment or finding)
- **Field path** — which metadata element is affected (when applicable)
- **Current** and **suggested** metadata — with a diff when suggestions exist
- **Status**, **severity**, **category**, and **notes**

Common actions (when you have edit access):

| Action | When to use |
|--------|-------------|
| **Apply** | Write suggested metadata into the project (marks the issue as applied). |
| **Accept** | Acknowledge the issue without applying automatically. |
| **Reject** | The issue or suggestion is not valid for this project. |
| **Dismiss** | Close without further action. |
| **False positive** | The item was flagged incorrectly. |
| **Fixed** | You improved the metadata yourself outside the suggestion. |

Save the project metadata after applying changes. Re-check related items on the **Open** tab.


## Permissions

| Action | Typical requirement |
|--------|---------------------|
| View Issues | View access on the project (or global Issues list for accessible projects). |
| Create / edit / apply issues | Edit access on the project. |

See [Managing users and roles](/tech_roles_permissions.html) for how sharing and project roles work.


## Related documentation

- [Metadata reviewer](/assess_metadata.html) — AI-powered metadata review
- [Publish to NADA](/publish_to_nada.html)
- [Documenting data](/documenting_general_instructions.html)
