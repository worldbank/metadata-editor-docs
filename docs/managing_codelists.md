# Managing codelists

Codelists are controlled vocabularies (for example ISO country codes, SDMX frequency codes, or organization-specific code lists). Components in a [data structure](/managing_data_structures.html) can reference a **standard codelist** from the registry instead of defining codes inline.

See [Structural metadata](/structural_metadata.html) for how the registry relates to indicator projects.


## Open the codelists registry

From the main navigation, click **Codelists**.


## Create or edit a codelist

1. Click **Create codelist** (or open an existing draft codelist).
2. Enter identifying metadata (for example agency, name, version, label).
3. Add **codes** (code, label, and optional description). You can add **translations** for codelist labels and individual code labels (ISO language codes).
4. Save the codelist.

### Status workflow

Codelists move through a lifecycle:

- **Draft** — editable; not yet used as the canonical published version.
- **Published / active** — available for linking from data structure components.
- **Locked** — published codelists become read-only in the registry. Create a new version or draft copy to change codes after publication.

When [creating a data structure from CSV](/managing_data_structures.html#create-a-data-structure-from-a-csv-file), you can **create a codelist from CSV** for geography or dimension columns during the import mapping step.


## Import and export

From a codelist detail or edit view you can transfer codelists between sites or bulk-load codes:

| Action | Formats |
|--------|---------|
| **Import** | JSON, CSV, SDMX (structure message with codelist) |
| **Export** | JSON, CSV, SDMX 2.1, SDMX 3.0 |

Use export for backup, migration, or publishing codelists alongside DSDs to other systems.


## Next steps

- [Managing data structures](/managing_data_structures.html)
- [Attach a data structure to an indicator project](/documenting_indicator_data_structure.html)
