# Before you start

Before you start documenting a micro-dataset, it is highly recommended to carefully prepare the data and the related materials.

- **Prepare your data files**
   - ***Variable and value labels.*** Ensure that all variables and values are labeled in the data files (if the data are stored in Stata, SPSS, or another application that allows documentation of variables).
   - ***Direct identifiers and confidential information.*** Drop the direct identifiers from the dataset (names, phone number of respondents, addresses, social security numbers, etc) and other confidential information if you plan to share the data. 
   - ***Unique identifiers and relationships.*** Check that all observations in each data file has a unique identifier, in the form of a specific variable or a combination of variables. The unique identifiers can vary across data files. Ensure that there are no duplicated identifiers in any data file. If your dataset is composed of multiple related data files, check that the files can be merged without any issue. For example, if you have distinct data files at the household and individual levels (i.e., if you have a hierarchical data structure), use a statistical package to verify that all households have at least one corresponding individual, and that each individual belongs to one and only one household.
   - ***Missing values.*** It is preferable (but not required) to use system missing values (instead of values like '999') for indicating missing values. If missing values are indicated by values other than *system missing*, make sure you are aware of these values (which will have to be marked as representing *missing values* when documenting the data in the Metadata Editor.   
   - ***Temporary variables.*** Drop all temporary variables (variables that were created for testing or other purpose, but that do not need to be kept in the dataset) and other unnecessary variables from the data files.  
   - ***Weighting.*** For sample survey datasets, it is recommended to include the relevant sampling weight variables in all data files where they apply (for the convenience of data users). 
   - ***File names.*** It is recommended to name your data files (and all other files you want to share) using a consistent naming convention, and in a way that will make it easier for users to understand the content of the file.
   - ***Data file formats.*** The Metadata Editor provides an option to read data files to automatically extract the metadata available in them. If necessary, export your data files to a format supported by the Metadata Editor.

- **Prepare the related materials to be included as external resources**
  External resources are all the electronic files (documents, data files, scripts, or other) that you want to preserve or disseminate with the data. All these digital resources should be gathered, and saved preferably in open or standard format under user-friendly names. When documenting a survey or census dataset for example, ensure that you: 
   - Have a copy of the questionnaire(s) in electronic format. Include the file in both the original format and in a PDF version. If the survey was conducted using computer-assisted interviews using a software like Survey Solutions or CsPro, generate a PDF copy of the electronic form (Survey Solutions provide an otion to generate such a file).
   - Collect an electronic copy of all other relevant documents, such interviewer manuals, technical documentation on sampling, survey technical and analytical reports, presentations of results, press releases, etc. For documents available in non-standard format, generate a PDF copy.
   - Collect all other digital materials related to the dataset, such as data scripts, photos, videos, and others.
