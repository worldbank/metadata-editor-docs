# Before you start

> **Getting started:** Follow [Quick start: Indicator](/quick_start_indicator.html) first. Use this chapter when you need field definitions or feature details.

This section describes what you document when working with indicators and the quality principles that apply. Refer to [General instructions](/documenting_general_instructions.html) for features common to all project types.

To document a **database of indicators** (a collection such as the World Development Indicators), see [Documenting a database or dataset](/documenting_dataset.html). Database projects document the container only — they do not support DSD binding, CSV import, or observation charts.


## What you will document

Documenting an indicator in the Metadata Editor typically involves some or all of the following:

- **Reference metadata** — Title, definition, sources, geographic and time coverage, methodology, and related elements entered in the indicator metadata template. Every indicator project includes this step. Field definitions: [Reference metadata](/documenting_indicator_descriptive_metadata.html).
- **Structural metadata** — A **data structure definition (DSD)** that describes how observation data are organized in a CSV file (column names, SDMX column types, codelists). Required when you import observation data. Registry: [Structural metadata](/structural_metadata.html). Project binding: [Structural metadata (project)](/documenting_indicator_data_structure.html).
- **Observation data** — Optional. Time series values imported from a [long-format](/documenting_indicator_concepts_long_wide.html) CSV, validated against the data structure, and explored or published from the editor. See [Observation data](/documenting_indicator_import_data.html).

You can publish **metadata only** (see [Quick start: Indicator](/quick_start_indicator.html)) or add structural metadata and observation data when needed.


## Key principles for producing high-quality metadata

The following general principles should be followed to ensure the production of high-quality metadata. They apply broadly across metadata elements used to document statistical indicators. [Reference metadata](/documenting_indicator_descriptive_metadata.html) provides detailed guidance for specific elements.

- **Standardize terminology**. Use consistent terms across all metadata. Where applicable, adopt internationally recognized controlled vocabularies or code lists (e.g., for topics, sectors, geographic areas) to enhance interoperability and comparability.
- **Maintain consistency in terminology and jargon**. Avoid mixing technical jargon with general terms unless clearly explained. Use consistent language and avoid introducing synonyms or alternative phrases for the same concept without clear justification.
- **Link related indicators**. Where applicable, establish links among related indicators. Group variants, disaggregations, or derived indicators using relationships such as: *Is part of*, *Has disaggregation*, *Derived from*. This helps users navigate the catalog and understand the relationships among indicators.
- **Spell out acronyms and abbreviations**. Avoid using unexplained acronyms, especially in definitions. Widely recognized acronyms (e.g., GDP, USD) may be used in titles, but must be spelled out or explained in the metadata definition or notes.
- **Use accessible and non-technical language**. Write metadata in a clear and accessible style. Avoid excessive technical detail. Complex methodological information should be included in referenced documentation, not embedded in core metadata fields.

For collaborative review and suggested corrections, see [Working with project issues](/project_issues.html).
