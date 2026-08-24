# JSON Schema guidelines for custom types

Custom schemas must be valid **JSON Schema Draft-07** documents. The Metadata Editor validates schema files on upload and uses them to validate project metadata and to generate templates.

See [Managing custom schemas](/managing_custom_schemas.html) for registry workflows.


## JSON Schema version

- Declare Draft-07 in `$schema`, for example `https://json-schema.org/draft-07/schema` or `http://json-schema.org/draft-07/schema#`.
- Other drafts are **rejected** at upload time.

Use standard Draft-07 constructs. In particular, **`items`** must be an object schema or an array of schemas — not a bare boolean (a Draft 2019-09+ shortcut that Draft-07 does not allow).


## Main and related files

- One **main** schema file defines the root document validated for projects of that type.
- Additional **related** files are optional; upload them when the main schema uses `"$ref": "./other-file.json"` (or similar relative references).
- All uploaded files must be valid JSON and valid JSON Schema documents.
- The registry resolves and compiles references from the schema directory before accepting an upload.


## Schema UID

When you create a schema in the UI, the **UID** becomes the project **type** value and the folder name under user schema storage.

Rules:

- 3–64 characters: letters, numbers, hyphen (`-`), underscore (`_`).
- Must be **unique** in the registry.
- **Cannot be renamed** after creation.

Reserved UIDs (used by core types) must not be reused: `survey`, `microdata`, `geospatial`, `timeseries`, `timeseries-db`, `document`, `image`, `video`, `table`, `script`, `admin_meta`, `custom`. The registry may also list core types under display aliases (for example **indicator** for timeseries); choose a UID that does not collide with any existing row in the schema list.

Choose a short, stable UID (for example `org-publication` or `lab_instrument`).


## Reserved root property names

The Metadata Editor stores system and catalogue fields **outside** the user metadata blob (or strips them on save). Therefore your main schema must **not** declare these names as **root-level** properties in `properties`:

`id`, `idno`, `type`, `pid`, `title`, `abbreviation`, `authoring_entity`, `nation`, `year_start`, `year_end`, `study_idno`, `metafile`, `dirpath`, `thumbnail`, `varcount`, `published`, `is_shared`, `is_locked`, `created`, `changed`, `created_by`, `changed_by`, `created_utc`, `changed_utc`, `schema`, `schema_version`, `user_id`, `template_uid`, `version_number`, `version_created`, `version_created_by`, `version_notes`, `attributes`, `metadata`, `partial_update`.

**Allowed:** the same names **nested** inside an object (for example `person.title` under a `person` property).

**Not allowed:** a root-level `"title"` or `"idno"` field in the schema, because curators could not persist values there reliably.

If a schema already in the registry violates this rule, the list shows a warning; open the schema, fix the JSON, and **replace the main schema file**.

### Example: good vs problematic root layout

**Problematic** — reserved names at the root:

```json
{
  "$schema": "https://json-schema.org/draft-07/schema",
  "type": "object",
  "properties": {
    "title": { "type": "string" },
    "idno": { "type": "string" },
    "topic": { "type": "string" }
  }
}
```

**Better** — group business fields under a dedicated object:

```json
{
  "$schema": "https://json-schema.org/draft-07/schema",
  "type": "object",
  "properties": {
    "identification": {
      "type": "object",
      "properties": {
        "idno": { "type": "string" },
        "title": { "type": "string" }
      }
    },
    "topic": { "type": "string" }
  }
}
```

Map **IDNO** and **Title** in [core field mappings](/managing_custom_schemas.html#core-field-mappings) to the JSON pointers that curators will fill (for example `/identification/idno` and `/identification/title`).


## Designing for templates and validation

- Prefer clear **object groupings** (`identification`, `description`, …) so generated templates and core mappings stay readable.
- Use `description` on properties — they flow into generated template field help where supported.
- Use `enum`, `pattern`, `minimum` / `maximum`, and `required` arrays for validation rules the editor should enforce. How those schema rules surface in the project editor and API is described in [Validating metadata](/validating_metadata.html).
- Keep `$id` stable if you reference the schema externally; relative `$ref` between uploaded sibling files is the usual pattern for multi-file schemas.


## Core catch-all type `custom`

The registry includes a built-in **core** type with UID `custom` — a catch-all for content that does not match another core type. That is separate from **custom schemas** you register (`Type` = Custom in the registry). Do not use UID `custom` for a new organization schema.


## Testing before upload

1. Validate JSON syntax.
2. Validate as Draft-07 (for example with a Draft-07-aware linter).
3. Confirm no [reserved root property names](#reserved-root-property-names).
4. If using `$ref`, upload all referenced files together on create, or add related files before switching the main schema to reference them.

After upload, use **Preview schema** and create a **test project** to confirm mappings and template behaviour before rolling out to curators.
