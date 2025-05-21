# How to produce standard-compliant metadata?

Standard-compliant metadata can be produced and edited through three main approaches: **using a Metadata Editor** software application, **programmatically** using a language like R or Python, or through **other metadata-enabled software** applications. Each approach offers distinct advantages depending on the level of automation, user expertise, and the specific type of data being documented.

## Using a metadata editor
   
A metadata editor is a specialized software application designed to facilitate the creation, editing, and management of structured metadata in a user-friendly manner. This approach is particularly beneficial for non-programmers and for data types that require significant manual curation, such as microdata.

The World Bank Metadata Editor provides an intuitive environment for documenting various types of data, including indicators, geographic datasets, microdata, and scripts. Users begin by selecting the relevant data type and choosing from predefined metadata templates based on internationally recognized standards. The Metadata Editor then automatically generates metadata entry forms tailored to the chosen template, allowing users to input metadata systematically.

Key features of the Metadata Editor include:

- ***Template-based metadata entry*** – ensuring standardization and consistency.
- ***Support for multiple output formats*** – metadata can be saved in standard-compliant JSON or XML formats, ready for integration into data catalogs or conversion to PDF, HTML, or other formats.
- ***Automated metadata extraction*** – for certain data types, such as microdata and geographic datasets, metadata embedded within data files (e.g., variable names, variable labels, and value labels in microdata files, of features in geographic vector datasets) can be automatically extracted, significantly reducing manual effort of generating detailed metadata.
- ***Collaboration and multi-user workflows*** – enabling teams to work on metadata documentation efficiently.
- ***Option to lock and version metadata*** – allowing implementation of quality assurance and governance for the review and use of the metadata.


## Programmatically

Metadata can be generated programmatically using R or Python (or similar language), Metadata files are JSON or XML files which correspond closely to R lists or Python dictionaries structured. The programmatic approach offers significant advantages for users with programming expertise, including:

- ***Automation and scalability in metadata creation*** – metadata generation can be scripted, making it highly efficient for large datasets or frequently updated data.
- ***Automation in metadata maintenance*** – the programmatic approach allows metadata to be edited in a dynamic, scripted manner. 
- ***Integration with data pipelines*** – programmatic metadata creation allows seamless embedding into existing data processing workflows.
- ***Machine-learning-based metadata enrichment*** – advanced techniques, such as natural language processing (NLP) and machine learning, can be applied to automatically extract, enhance, or classify metadata elements.

Metadata generated programmatically can be saved as JSON or XML, or published in various applications. They can be published directly in the Metadata Editor, which can then serve as a central repository for the metadata.

To be compatible with the Metadata Editor, the metadata must be generated in compliance with the schemas outlined in [ReDoc URL].


## Other metadata-enabled software applications

Several data management and survey processing tools integrate metadata standardization features. While these applications typically generate only a subset of required metadata elements, they offer valuable automated metadata extraction capabilities.

Examples include:

- ***Survey Solutions (World Bank)*** – allows exporting metadata compliant with the DDI Codebook metadata standard for survey data.
- ***CsPro (U.S. Census Bureau)*** – includes a function for exporting structured metadata, primarily focused on file- and variable-level documentation.
- ***QGIS*** - Exports metadata for geographic datasets, compatible with the ISO19139 standard.
  
While these tools generate essential metadata elements, they may not provide complete metadata coverage needed for full documentation. The metadata exported from such applications can be further edited, enriched, and completed using the Metadata Editor, ensuring full compliance with metadata standards.


## Choosing the right approach

The choice of metadata generation method depends on the nature of the data, user expertise, and the level of automation required:

- For non-technical users or for datasets requiring manual curation, the Metadata Editor provides an accessible, structured environment.
- For organizations managing large datasets or requiring automated workflows, programmatic metadata generation (or a combination of programmatic metadata generation and editing of the metadata in the Metadata Editor) is highly efficient.
- For users leveraging metadata from existing data management tools, the Metadata Editor can complement and enhance the metadata to ensure full documentation.
