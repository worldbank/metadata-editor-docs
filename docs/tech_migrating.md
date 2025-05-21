# Migrating content from Nesstar or NADA

Some organizations may have used the Nesstar Publisher software to document microdata using the DDI Codebook metadata standard. And they may have published the metadata in a NADA catalog.

The Nesstar Publisher application saved data and metadata (including the description of the extenal resources, but not the external resources themselves) in a binary file with extension [.Nesstar]. This file contains the DDI metadata (XML), the RDF file (description of external resources), and the data files. 

The Metadata Editor does not provide an option to import Nesstar files. The reason for this is that the Nesstar files are only readable in Windows operating system. 

There are however two options to migrate the content of Nesstar files to the Metadata editor.


## Using the export utility and the Metadata Editor API

Nesstar provided an executable utility file that allows content of Nesstar files to be extracted as XML (the DDI metadata), RDF (the external resources metadata), and data files. The XML (DDI), RDF, and data files can be imported manually into the Metadata Editor. Then the external resource files listed in the RDF can be manually attached.

This process can be automated using the Metadata Editor API. Usin a R or Python script, the content of a series of Nesstar files can be extracted as XML, RDF, and datasets, then these files can be uploaded to the Metadata Editor as new projects. The R or Python scripts will need access to the Nesstar files, to the Nesstar executable utility file, and to the Metadata Editor API using the MetadataEditR package (for R users) or PyMetadataEditor (for Python users). To run the program, you will need an API key. We provide below an example of a R and Python script. 

> The Nesstar executable file can be downloaded from ... The MetadataEditR package ... The PyMetadataEditR ...


```

R script here

```


```

Python script here

```


## Importing content from NADA

If you have published the metadata (and related materials) in NADA, you can import the metadata from NADA and upload it in the Metadata Editor as new projects.


```

R script here

```


```

Python script here

```


