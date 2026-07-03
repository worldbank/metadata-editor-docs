# Export and publish

> **Worked example:** [Quick start: Indicator — Step 4](/quick_start_indicator.html#step-4-export-and-publish-metadata) exports metadata and publishes to NADA (metadata only).

This page describes export formats and publish options for **indicator** projects. For browsing or downloading imported observations from the editor, see [Observation data](/documenting_indicator_import_data.html).


## DataCite, provenance, and tags

See [General instructions](/documenting_general_instructions.html).


## External resources

External resources are materials and links related to the indicator — methodology documents, scripts, photos, videos, and other digital assets. They are added in the **External resources** container: click **External resources** in the navigation tree, then **CREATE RESOURCE**. Enter at least a title, then provide a filename (uploaded to the Metadata Editor server) or a URL.

Resources created in another project can be imported as JSON or RDF: click **IMPORT** on the External resources page and select the export file.

External resources are included in the project ZIP package and can be published to NADA. See [Quick start — Step 3](/quick_start_indicator.html#step-3-add-information-on-related-resources).


## Export options (Actions menu)

Open the project **Actions** menu to export metadata and related materials.

| Option | Description |
|--------|-------------|
| **Export package (ZIP)** | ZIP containing metadata, external resources, and — when observation data have been imported — `indicator_data.csv` mirrored from the published dataset. |
| **Export JSON** | Metadata as JSON; option to include private template elements and external resources. |
| **Export MSD (SDMX/XML 3.0)** | Metadata structure definition (MSD) for SDMX 3.0. See [SDMX and the World Bank schema](/documenting_indicator_concepts_sdmx.html). |
| **Export MetadataSet (SDMX/JSON)** | Indicator metadata as an SDMX 3.0 metadataset. |
| **Export SDMX CSV** | Observation data in SDMX CSV format (indicator projects with imported data only). |
| **Export RDF/XML** / **Export RDF/JSON** | External resources metadata in RDF formats. |
| **PDF documentation** | Generate and download a bookmarked PDF of entered metadata. |

For observation CSV download from the data explorer (without the Actions menu), see [Observation data — Browse and export](/documenting_indicator_import_data.html#browse-and-export-data).


## Publish to NADA

Indicator projects can publish **study metadata**, **external resources**, and — when a DSD is bound and data imported — the **data structure (DSD)** and **observation data** to a configured NADA catalog.

General catalog setup and shared publish options (overwrite, draft vs publish, collections) are in [Publish to NADA](/publish_to_nada.html).

**Indicator-specific options** (publish DSD, publish observation data, overwrite DSD on NADA) are documented in [Publish to NADA — Indicators](/publish_to_nada.html#indicators-dsd-and-observation-data).

Metadata-only publish (no DSD or data) matches the flow in [Quick start — Step 4](/quick_start_indicator.html#step-4-export-and-publish-metadata).

Background publish may use the job queue; see [Jobs and background workers](/tech_jobs_and_workers.html).
