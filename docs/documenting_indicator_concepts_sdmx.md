# SDMX and the World Bank schema

> **Worked example:** [Quick start: Indicator](/quick_start_indicator.html) documents **SI.POV.DDAY** end-to-end (metadata only). This page explains how the indicator schema relates to SDMX.

The World Bank metadata schema for indicators aligns with the **Statistical Data and Metadata Exchange (SDMX)** standard, which enables machine-to-machine exchange of statistical data and metadata.

## Reference metadata and MSDs

The **descriptive and reference metadata** in the World Bank schema aligns with SDMX **Metadata Structure Definitions (MSDs)**. MSDs provide a framework for structuring metadata, but do not define which metadata elements to include. The World Bank schema complements SDMX by specifying detailed content that can be incorporated into SDMX MSDs and metadatasets.

In the Metadata Editor you can:

- **Export metadata templates as MSDs** — SDMX/XML 3.0 metadata structure definitions compatible with SDMX metadata structures.
- **Export indicator metadata as meta-datasets** — SDMX/JSON metadatasets for incorporation into SDMX-compliant systems.

See [Export and publish](/documenting_indicator_export_publish.html) and [Quick start: Indicator — Step 4](/quick_start_indicator.html#step-4-export-and-publish-metadata).

## Structural metadata and DSDs

The **structural metadata** in the World Bank schema — how observation data are organized in a CSV file or database — aligns with SDMX **Data Structure Definitions (DSDs)**.

From v1.3:

- DSDs and codelists are maintained in a **site-wide registry** ([Structural metadata](/structural_metadata.html)).
- Each indicator project **binds** to one DSD from the registry for validation and import ([Structural metadata at project level](/documenting_indicator_data_structure.html)).

Each column in the CSV is assigned an SDMX **column role** (for example geography, time period, indicator ID, observation value). See [Column types](/documenting_indicator_data_structure.html#column-types).

## Further reading

- [World Bank metadata schemas (Timeseries)](https://worldbank.github.io/metadata-schemas/#tag/Timeseries)
- [Reference metadata](/documenting_indicator_descriptive_metadata.html) — every field in the indicator template
- [Managing data structures](/managing_data_structures.html) — create and maintain DSDs in the registry
