# Documenting a video

## The metadata standard

The metadata schema implemented in the Metadata Editor to document video files is a combination of elements extracted from the [Dublin Core Metadata Initiative](https://dublincore.org/) (DCMI) and from the [VideoObject (from schema.org)](https://schema.org/VideoObject) schemas.  

The Dublin Core is a generic and versatile standard, which we also use (in an augmented form) for the documentation of *Documents* and *Images*. It contains 15 core elements, to which we added a selection of elements from *VideoObject*. We also included the elements `keywords`, `topics`, `tags`, `datacite`, `provenance` and `additional` that are found in all standards supported by the Metadata Editor. 


## Preparing for the documentation and publishing of the video

### Generate a transcription

Videos typically come with limited metadata. To make them more discoverable, a transcription of the video content can be generated, stored, and indexed in the catalog. The metadata schema we propose includes an element `transcription` that can store transcriptions (and possibly their automatically-generated translations) in the video metadata. Word embedding models and topic models can be applied to the transcriptions to further augment the metadata. This will significantly increase the discoverability of the resource, and offer the possibility to apply semantic searchability on video metadata. 

Machine learning speech-to-text solutions are available (although not for all languages) to automatically generate transcriptions at a low cost. This includes commercial applications like [Whisper by openAI](https://openai.com/research/whisper), [Microsoft Azure](https://azure.microsoft.com/en-us/services/cognitive-services/speech-to-text/), or [Amazon Transcribe](https://aws.amazon.com/transcribe/pricing/). Open source Python solutions also exist. 

Transcriptions of videos published on Youtube are available on-line (see the example provided in the description of the `Embed URL` element below).


### Publish your video online

If you plan to publish the video metadata in a NADA catalog, with a possibility for the catalo users to view the video directly in NADA (i.e., if you want to embed the video in the NADA cataloguing page), the video must be published in a video streaming site like YouTube. NADA can embed a published video, but is not a video streaming application. 


## Documenting the video

### Create a new project

The first step in documenting a video in the Metadata Editor is to create a new project. You do that by clicking on `CREATE NEW PROJECT` in the *My projects* page, then selecting *Video* as data type when prompted. This will open a new, untitled *Project* page.

In that page, select the template you want to use to document the video. A default template is proposed; no action is needed if you want to use the default template. Otherwise, switch to another template by clicking on the template title in the *Templates* frame. Note that you can at any time change the template used for the documentation of a project. The selected template will determine what you see in the navigation tree and in the metadata entry pages, but switching from one template to another will not impact the metadata that has already been entered; no information will be deleted from the metadata.

### Enter information on metadata

The metadata information set is used to document the video metadata (not the video itself). This provides information useful for archiving purposes. This set is optional. It is recommended however to enter at least the identification and affiliation of the metadata producer, and the date of creation of the metadata. One reason for this is that metadata can be shared and harvested across catalogs/organizations, so metadata produced by one organization can be found in other data centers. 


### Enter the video description

The `Video description` section contains all elements that will be used to describe the video and its content. These are the elements that will be indexed and made searchable when published in a data catalog. We provide below a brief description and recommendations for the metadata elements included in the default metadata template in the Metadata Editor. 

In the list of metadata elements below, the *key* of each element in the metadata standard is provided between brackets next to the corresponding element's label in the template.


**TITLE STATEMENT**

- **`Primary ID`** (*idno*) An identification number that is used to uniquely identify a video in a catalog. It will also help users of the data cite the video properly. The best option is to obtain a [Digital Object Identifier (DOI)](https://www.doi.org/) for the video, as it will ensure that the ID is unique globally. Alternatively, it can be an identifier constructed by an organization using a consistent scheme. Note that the schema allows you to provide more than one identifier for a video (see `Other identifiers` below). This element maps to the “identifier” element in the Dublin Core. 

- **`Title`** (*title*) The title of the video. This element maps to the element *caption* in VideoObject.
  
- **`Other identifiers`** (*identifiers*)This element is used to enter video identifiers other than the `idno` element described above). It can for example be a Digital Object Identifier (DOI). Note that the identifier entered in `idno` can be repeated here, allowing to attach a "type" attribute to it.
  - **`Type`** (*type*) The type of unique identifier, e.g., "DOI".
  - **`Identifier`** (*value*) The identifier. 
 
- **`Alternate title`** (*alt_title*) An alias for the video title. This element maps to the element *alternateName* in VideoObject.


**AUTHORS AND CONTRIBUTORS**

- **`Creator`** (*creator*) Organization or person who created/authored the video. 
 
- **`Production company`** (*production_company*) The production company or studio responsible for the item. This element maps to the element *productionCompany* in VideoObject.

- **`Recorded at`** (*recorded_at*) This element maps to the element `recordedAt` in VideoObject schema. It identifies the event where the video was recorded (e.g., a conference, or a demonstration).
   
- **`Publisher`** (*Publisher*) The name of the publisher of the video.

- **`Translators`** (*Ttranslators*) Organization or person who adapted the video to different languages. This element maps to the element *translator* in VideoObject. 
  - **`First name`** (*first_name*) The first name of the translator. 
  - **`Initial`** (*initial*) The initials of the translator. 
  - **`Last name`** (*last_name*) The last name of the translator. 
  - **`Affiliation`** (*affiliation*) The affiliation of the translator.

- **`Sponsors`** (*sponsors*) This element is used to list the funders/sponsors of the video. If different funding agencies financed different stages of the production process, use the "role" attribute to distinguish them. 
  - **`Name`** (*name*) The name of the sponsor (person or organization) 
  - **`Abbreviation`** (*abbr*) The abbreviation (acronym) of the sponsor. 
  - **`Grant`** (*grant*) The grant (or contract) number. 
  - **`Role`** (*role*) The specific role of the sponsor.   
        
- **`Other contributors`** (*contributors*) Identifies the person(s) and/or organization(s) who contributed to the production of the video. The `role` attribute allows defining what the specific contribution of the identified person or organization was. 
  - **`Name`** (*name*) The name of the contributor (person or organization).  
  - **`Affiliation`** (*affiliation*) The affiliation of the contributor.  
  - **`Abbreviation`** (*abbr*) The abbreviation for the institution which has been listed as the affiliation of the contributor.        
  - **`Role`** (*role*) The specific role of the contributor. This could for example be "Cameraman", "Sound engineer", etc. 
  - **`URI`** (*uri*) A URI (link to a website, or email address) for the contributor.   

- **`Credits`** (*credit_text*) This element can be used to credit the person(s) and/or organization(s) associated with a published video. This element corresponds to the "creditText" element of VideoObject.
    
- **`Contacts`** (*contacts*) Users of the video may need further clarification and information. This section may include the name-affiliation-email-URI of one or multiple contact persons. This block of elements will identify contact persons who can be used as resource persons regarding problems or questions raised by the user community. The URI attribute should be used to indicate a URN or URL for the homepage of the contact individual. The email attribute is used to indicate an email address for the contact individual. It is recommended to avoid putting the actual name of individuals. The information provided here should be valid for the long term. It is therefore preferable to identify contact persons by a title. The same applies for the email field. Ideally, a "generic" email address should be provided. It is easy to configure a mail server in such a way that all messages sent to the generic email address would be automatically forwarded to some staff members.
  - **`Name`** (*name*) Name of a person or unit (such as a data help desk). It will usually be better to provide a title/function than the actual name of the person. Keep in mind that people do not stay forever in their position.
  - **`Role`** (*role*) The specific role of `name`, in regards to supporting users. This element is used when multiple names are provided, to help users identify the most appropriate person or unit to contact. 
  - **`Affiliation`** (*affiliation*) Affiliation of the person/unit.
  - **`Email`** (*email*) E-mail address of the person.
  - **`Telephone`** (*telephone*) A phone number that can be called to obtain information or provide feedback on the table. This should never be a personal phone number; a corporate number (typically of a data help desk) should be provided.
  - **`URL`** (*uri*) A link to a website where contact information for `name` can be found.  

     
 **DATES AND VERSION**

- **`Date created`** (*date_created*) The date the video was created. It is recommended to enter the date in the ISO 8601 format (YYYY-MM-DD or YYYY-MM or YYYY). The date the video is created refers to the date that the video was produced and considered ready for dissemination. 
 
- **`Date published`** (*date_published*) The date the video was published. It is recommended to use the ISO 8601 format (YYYY-MM-DD or YYYY-MM or YYYY). 

- **`Version`** (*version*) The version of the video refers to the published version of the video.
 
- **`Status`** (*status*) The status of the video in terms of its stage in a lifecycle. A controlled vocabulary should be used. Example terms include {`Incomplete, Draft, Published, Obsolete`}. Some organizations define a set of terms for the stages of their publication lifecycle. This element maps to the element *creativeWorkStatus* in VideoObject. 

 
**CONTENT**

- **`Description`** (*description*) A brief description of the video, typically about a paragraph long (around 150 to 250 words). This element maps to the element *abstract* in VideoObject.
 
- **`Genre`** (*genre*) The genre of the video, broadcast channel or group. This is a VideoObject element. A controlled vocabulary can be used.

- **`Audience`** (*audience*) A brief description of the intended audience of the video, i.e. the group for whom it was created.

- **`Keywords`** (*keywords*) A list of keywords that provide information on the core content of the video. Keywords provide a convenient solution to improve the discoverability of the video, as it allows terms and phrases not found elsewhere in the video metadata to be indexed and to make the video discoverable by text-based search engines. A controlled vocabulary will preferably be used (although not required), such as the [UNESCO Thesaurus](http://vocabularies.unesco.org/browser/thesaurus/en/). The list can combine keywords from multiple controlled vocabularies, and user-defined keywords.  
  - **`Keyword`** (*name*) The keyword itself. 
  - **`Vocabulary`** (*vocabulary*) The controlled vocabulary (including version number or date) from which the keyword is extracted, if any.
  - **`URL`** (*uri*) The URL of the controlled vocabulary from which the keyword is extracted, if any.  

- **`Topics`** (*topics*) Information on the topics covered in the video. A controlled vocabulary will preferably be used, for example the [CESSDA Topics classification](https://vocabularies.cessda.eu/vocabulary/TopicClassification), a typology of topics available in 11 languages; or the [Journal of Economic Literature (JEL) Classification System](https://en.wikipedia.org/wiki/JEL_classification_codes), or the [World Bank topics classification](https://documents.worldbank.org/en/publication/documents-reports/docadvancesearch). Note that you may use more than one controlled vocabulary. This element is a block of five fields:  
  - **`ID`** (*id*) The identifier of the topic, taken from a controlled vocabulary. 
  - **`Topic`** (*name*) The name (label) of the topic, preferably taken from a controlled vocabulary. 
  - **`Parent ID`** (*parent_id*) The parent identifier of the topic (identifier of the item one level up in the hierarchy), if a hierarchical controlled vocabulary is used. 
  - **`Vocabulary`** (*vocabulary*) The name (including version number) of the controlled vocabulary used, if any. 
  - **`URL`** (*uri*) The URL to the controlled vocabulary used, if any.   
 
- **`Persons`** (*persons*) A list of persons who appear in the video. 
  - **`Name`** (*name*) The name of the person. 
  - **`Role`** (*role*) The role of the person mentioned in `name`.     
 
- **`Main entity`** (*main_entity*) Indicates the primary entity described in the video. This element maps to the element `mainEntity` in VideoObject.

- **`Transcript`** (*transcript*) The transcript of the video content, provided as a text. Note that if the text is very long, an alternative is to save it in a separate text file and to make it available in a data catalog as an external resource. 
  - **`Language code`** (*language_code*) The code of the language of the transcript, preferably the ISO code.
  - **`Language name`** (*language_name*) The name of the language of the transcript. 
  - **`Text`** (*text*) The transcript itself. Adding the transcript in the metadata will make the video much more discoverable, as the content of the transcription can be indexed in catalogs.

- **`Album`** (*album*) When a video is published in a catalog containing many other videos, it may be desirable to organize them by album. Albums are collections of videos organized by theme, period, location, or other criteria. One video can belong to more than one album. Albums are "virtual collections".  
  - **`Name`**  (*name*) The name (label) of the album.  
  - **`Description`** (*description*) A brief description of the album. 
  - **`Owner`** (*owner*) The owner of the album. 
  - **`URL`** (*uri*) A link (URL) to the album. 

- **`Languages`** (*language*)Most videos will only be provided in one language. This is however a repeatable field, to allow for more than one language to be listed. For the language code, ISO codes will preferably be used. The language refers to the language in which the video is published. This is a block of two elements (at least one must be provided for each language): 
  - **`Name`** (*name*) The name of the language. 
  - **`Code`** (*code*) The code of the language. The use of [ISO 639-2](https://www.loc.gov/standards/iso639-2/php/code_list.php) (the alpha-3 code in Codes for the representation of names of languages) is recommended. Numeric codes must be entered as strings.   

- **`Is based on`** (*is_based_on*) A resource from which this video is derived or from which it is a modification or adaption. This element maps to the element *isBasedOn* in VideoObject. 
 
- **`Is part of`** (*is_part_of*) Indicates another video that this video is part of. This element maps to the element *isPartOf* in VideoObject. 
 
- **`Relations`** (*relations*) Defines, as a free text field, the relation between the video being documented and other resources. This is a Dublin Core element.


**GEOGRAPHIC AND TIME COVERAGE**

- **`Country`** (*country*) The list of countries (or regions) covered by the video, if applicable. This refers to the <u>content</u> of the video, not to the country where the video was released. This is a repeatable block of two elements: 
  - **`Name`** (*name*) The country/region name. Note that many organizations have their own policies on the naming of countries/regions/economies/territories, which data curators will have to comply with. 
  - **`Code`** (*code*) The country/region code (entered as a string, even for numeric codes). It is recommended to use a standard list of countries and regions, such as the ISO country list ([ISO 3166](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)).
 
- **`Spatial coverage`** (*spatial_coverage*) Indicates the place(s) which are depicted or described in the video. This element maps to the element `contentLocation` in VideoObject. This element complements the `ref_country` element. It can be used to qualify the geographic coverage of the video, in the form of a free text. 

- **`Bounding box`** (*bbox*) This element is used to define one or multiple bounding box(es), which are the (rectangular) fundamental geometric description of the geographic coverage of the video. A bounding box is defined by west and east longitudes and north and south latitudes, and includes the largest geographic extent of the video's geographic coverage. The bounding box provides the geographic coordinates of the top left (north/west) and bottom-right (south/east) corners of a rectangular area. This element can be used in catalogs as the first pass of a coordinate-based search. 
  - **`West`** (*west*) West longitude of the box 
  - **`East`** (*east*) East longitude of the box 
  - **`South`** (*south*) South latitude of the box 
  - **`North`** (*north*) North latitude of the box

 - **`Reference time`** (*content_reference_time*) The specific time described by the video, for works that emphasize a particular moment within an event. This element maps to the element `contentReferenceTime` in VideoObject. 
 
- **`Temporal coverage`** (*temporal_coverage*) Indicates the period that the video applies to, i.e. that it describes, either as a DateTime or as a textual string indicating a time period in ISO 8601 time interval format. This element maps to the element `temporalCoverage` in VideoObject.


**ACCESS AND RIGHTS**

- **`Videoprovider`** (*video_provider*) The person or organization who provides the video. This element maps to the element *provider* in VideoObject. 
                                          
- **`Video URL`** (*video_url*) URL of the video. This element maps to the element *url* in VideoObject.
 
- **`Embed URL`** (*embed_url*) A URL pointing to a player for a specific video. For example, "https://www.youtube.com/embed/7Aif1xjstws". To be embedded, a video must be hosted on a video sharing platform like Youtube (www.youtube.com). To obtain the "embed link" from youtube, click on the "Share" button, then "Embed". In the result box, select the content of the element `src = `.
   
   ```
  ![](./images/ReDoc_videos_46.JPG){width=100%}
  ```

- **`Repository`** (*repository*) The name of the repository (organization)           

- **`Rights`** (*rights*) A textual description of the rights associated to the video. If a copyright is available, the three following elements will be used instead of this element. 
 
- **`Copyright holder`** (*copyright_holder*) The party holding the legal copyright to the video. This element corresponds to the "copyrightHolder" element of VideoObject.
 
- **`Copyright notice`** (*copyright_notice*) Text of a notice appropriate for describing the copyright aspects of the video, ideally indicating the owner of the copyright. This element corresponds to the "copyrightNotice" element of VideoObject.
 
- **`Copyright year`** (*copyright_year*) The year during which the claimed copyright for the video was first asserted. This element corresponds to the "copyrightYear" element of VideoObject.
 
- **`Citation`** (*citation*) This element provides a required or recommended citation of the audio file. 


**TECHNICAL INFORMATION**

- **`Media`** (*media*) A description of the media on which the recording is stored (other than the online file format); e,g., "CD-ROM".    
 
- **`Duration`** (*duration*) The duration of the item (movie, audio recording, event, etc.) in ISO 8601 format. ISO 8601 durations are expressed using the following format, where (n) is replaced by the value for each of the date and time elements that <u>follows</u> the (n). For example: (3)H means 3 hours.
    
  Duration in ISO 8601 format is in the form:  **`P(n)Y(n)M(n)DT(n)H(n)M(n)S`** where: 
  - P is the **Period designator** and is always placed at the beginning of the duration 
    - (n)Y represents the number of years 
    - (n)M represents the number of months 
    - (n)W represents the number of weeks 
    - (n)D represents the number of days 
  - T is the **Time designator** and always precedes the time components 
    - (n)H represents the number of hours 
    - (n)M represents the number of minutes 
    - (n)S represents the number of seconds 
  
  For example, **P1Y2M20DT3H30M8S** represents a duration of one year, two months, twenty days, three hours, thirty minutes, and eight seconds.
  
  Date and time elements including their designator may be omitted if their value is zero, and lower-order elements may also be omitted for reduced precision. For example, "P23DT23H" and "P4Y" are both acceptable duration representations.
  
  As *M* can represent both Month and Minutes, the time designator *T* is used. For example, "P1M" is a one-month duration and "PT1M" is a one-minute duration.
  
  *This information on the ISO 8601 was adapted from [wikipedia](https://en.wikipedia.org/wiki/ISO_8601) where more detailed information can be found.*

- **`Encoding format`** (*encoding_format*) The video file format, typically expressed using a MIME format. This element corresponds to the "encodingFormat" element of VideoObject and maps to the element *format* of the Dublin Core.
 

#### DataCite

See section **Documenting - General instructions**.


#### Tags

See section **Documenting - General instructions**.


#### Provenance 

The **Provenance** container is used to document how and when the video was acquired, if the video and its metadata were extracted from an external catalog. It is used to ensure traceability. See section **Documenting - General instructions**.


#### External resources

External resources are all materials (and links) that relate to the video, if any. These materials and links are added in the External resources container. Select *External resources* in the navigation tree, then on `CREATE RESOURCE`. Enter the relevant information on the resource (at least a title), then provide either a filename (the file will then be uploaded on the server that hosts the Metadata Editor) or a URL to the resource.

External resources that have already been created for another project can also be imported. To do that, they must first be exported as JSON or RDF from the other project. Then click on `IMPORT` in the *External resources* page, and select the file. 
