# Quick start: Video

In this Quick start example, we will document a video titled *Reshaping Food Security Analytics: An In-Depth Look at Emerging Solutions for Rapid Insights* published on the World Bank Youtube channel  (https://www.youtube.com/watch?v=px1EeqpKDUI&list=PLopq6yGfmFAu3tscprzTPpoPrP1q0E9XZ)). The only file you need to reproduce this Quick-Start example is the image file *.../video/video_food_security.jpg*, a screenshot of the video introduction.

> This Quick Start section does not include detailed guidance on documenting videos. For comprehensive instructions, see the chapter **Documenting Data – Video**. 


## Step 1: Create a new project and add a thumbnail

To begin, open the Metadata Editor in your web browser (the URL is determined by where you installed the application), and log in with your username and password. The *My projects* page will be displayed, showing all projects you have previously created and those that have been shared with you by other data curators, if any. If you are using the application for the first time and no project has been shared with you, the project list will be empty.

![image](img/ME_UG_v1-0-0_quick_start_video_project_page.png)


Click on `CREATE NEW PROJECT` and select *Video* when prompted to indicate the type of resource you will be documenting.

![image](img/ME_UG_v1-0-0_quick_start_document_create_project_types.png)
  
A new project page will open in a new tab.

![image](img/ME_UG_v1-0-0_quick_start_video_new_project_home.png)

We will use the screenshot image *video_food_security.jpg* as a thumbnail (but feel free so select another JPG or PNG image file). Note that providing a thumbnail is not required, but recommended. The thumbnail will be displayed in the Metadata Editor project list, and in the NADA catalog if the metadata is published in NADA. Click on the `edit` icon in the screenshot image, and select the image file when prompted.  

![image](img/ME_UG_v1-0-0_quick_start_video_edit_thumbnail.png)


## Step 2: Enter metadata

In the navigation tree, select *Metadata information / Information on metadata* to enter information on who documented the publication and when. All information in this section is optional. Enter your name (as `Metadata producer`) and the `date` of the day in ISO format YYYY-MM-DD. This is the date when the metadata, not the video, was produced. Then click on `SAVE`.

![image](img/ME_UG_v1-0-0_quick_start_video_metadata_information_save.png)

You can now start entering the metadata related to the video itself. In the navigation tree, first select *Title statement* under *Video description*, and enter the required `Primary ID`, a unique identifier of your choice, e.g., JD_VDO_001 (if you want to publish the document in a NADA catalog, make sure that the identifier is not used by another user or for another project). Also, enter the `title` of the video: *Reshaping Food Security Analytics: An In-Depth Look at Emerging Solutions for Rapid Insights*.

![image](img/ME_UG_v1-0-0_quick_start_video_identifier.png)

Then proceed with the other sections in the navigation tree and fill out the following elements using the information belowprovided in the World Bank Youtube channel:
- ***Author:*** World Bank
- ***Description:*** New methods are paving the way for faster data and insight. Get an in-depth look at how AI and machine learning are reshaping food security analytics to deliver actionable information for humanitarian aid, policy-making, and crisis response. From conflict-affected regions to global inflation trends, discover how data-driven solutions—such as the Joint Monitoring Report (JMR), Real-Time Prices (RTP), and the World Food Security Outlook (WFSO)—generate crucial information to provide timely assistance where it matters most.
- ***Genre***: Documentary
- ***Keywords:*** Extract keywords you find relevant from the transcript or from the description of the video provided in the Youtube channel. Some suggestions:  "Food Security", "Famine", "Nutrition data", "Food crisis", "Global Alliance for Food security", "Dry corridor", "El Nino", "Hunger".
- ***Language:*** English (code EN)
- ***Date published:*** 2025-01-23 (in ISO format YYYY-MM-DD)
- ***Geographic coverage:*** Not specific, so we will enter "World" (code WLD)
- ***Duration:*** 3 minutes and 25 seconds. The duration must be entered in ISO8601 format: PT3M25S.
- ***Video URL:*** https://youtu.be/px1EeqpKDUI?list=PLopq6yGfmFAu3tscprzTPpoPrP1q0E9XZ
- ***Embed URL:*** https://www.youtube.com/embed/px1EeqpKDUI?list=PLopq6yGfmFAu3tscprzTPpoPrP1q0E9XZ *(Note: This information can be obtained by right-clicking on the video in Youtube. It will open a menu, in which you will find an option to "Copy embed code". Select only the URL (src) part of it.)*
  
  ![image](img/ME_UG_v1-0-0_quick_start_video_youtube_embed_code.png) 

- ***Transcript:*** *(This was copy/pasted from the Youtube channel, and edited for formatting)*: "In 2022 as 250 million people faced food crises, the G7 presidency and the Worldbank Group came together to launch the Global Alliance for Food Security, mobilising a swift, coordinated response to the growing global hunger crisis. Working alongside international partners, we transformed food and nutrition security data systems by introducing advanced country level assessment and prediction tools. The World Food Security Outlook was developed to enhance understanding of global food and nutrition security. Using machine learning to analyse data from various sources and project food security up to six years in advance. Instead of waiting for crises to emerge, we can now utilise these insights to proactively address and mitigate potential impacts. Additionally, we've created tools to monitor prices of household items and unofficial exchange rates in real time across many locations. This aids in understanding rapid changes in food and fuel affordability, and identifying areas of urgent need. Furthermore, second layer monitoring tools like the Joint Monitoring Report build on these new data sources to provide more in-depth insights into complex conflict affected areas. These innovations aim to provide precise, timely, and actionable food and nutrition security data to guide Worldbank programming and partner actions. For instance, in the Dry Corridor, the World Food Security Outlook has brought together government, humanitarian and development leaders to assess risks, scale up early action, strengthen safety nets, and adjust agricultural planning for El Nino impacts. In the Horn of Africa, real time prices track water and staple food prices during droughts. Enabling the identification of operational and funding gaps in real time. The shift towards machine learning and real time data is already transforming food security analysis.
Through the Joint Monitoring report, humanitarian and development partners now follow the same data driven approach to collectively recognise emerging crises early and enhance crisis preparedness. These first of their kind reports are speeding up response times and strengthening evidence based decision making, demonstrating how data driven tools deliver transparent, robust and high frequency analysis at a fraction of the cost of traditional food and nutrition security updates. Join the fight against hunger. Explore real time crises and the world food security outlook at microdata.worldbank.org. For more insights and our progress on Sustainable Development Goal 2, visit worldbank.org."

   ![image](img/ME_UG_v1-0-0_quick_start_video_youtube_transcript.png)
  
This information can be entered in the Metadata Editor template in the following elements: 

| Information               | In the metadata template                                     | 
| ------------------------- | ------------------------------------------------------------ | 
| Author                    | Video description / Authors and contributors / `Creator`     |
| Description               | Video description / Content / `Description`                  |
| Genre                     | Video description / Content / `Genre`                        |
| Keywords                  | Video description / Content / `Keywords`                     | 
| Language                  | Video description / Content / `Languages`                    |
| (derived)                 | Video description / `Status` ("Published")                   |
| Date published            | Video description / Dates and version / `Date published`     |
| Geographic coverage       | Video description / Geographic and time coverage / `Country` |
| Video URL                 | Video description / Access and rights / `Video URL`          | 
| Embed URL                 | Video description / Access and rights / `Embed URL`          | 
| Duration                  | Video description / Technical information / `Duration`       |

![image](img/ME_UG_v1-0-0_quick_start_video_metadata.png)

After entering all available information, click on `SAVE`. Click on *Preview* in the navigation tree to view all information you have entered so far.


## Step 3: Add information on related resources

Once you have entered the metadata, you can finalize the documentation of the video by documenting and attaching external resources. External resources include all materials (files and links) that you want to make accessible to users when you publish the video in a catalog. In this example, we will add one external resource: a link to the World Bank YouTube channel. 

To create an external resource, click on *External resources* in the navigation tree and then click on `Create resource`. Select the resource type ("Web Site"), give it a short `title` *(Video in the World Bank YouTube channel)*, and enter the `URL` in `Resource attachment` *(https://www.youtube.com/worldbank)*. 

![image](img/ME_UG_v1-0-0_quick_start_video_external_resource_youtube.png)

Then click `SAVE`. The video will now be listed as an external resource.


## Step 4: Export and publish metadata

In the *Project* page, a menu of options is available to you. 

![image](img/ME_UG_v1-0-0_quick_start_video_open_actions_menu.png)

![image](img/ME_UG_v1-0-0_quick_start_video_actions_menu.png)


- ***Export package (ZIP)***

  This option allows you to generate a ZIP file containing all metadata and resources related to the project. This package can be shared with others, who can then import it in their own Metadata Editor.


- ***Export JSON***-

  Export metadata to JSON will generate a JSON file containing the metadata. The option is provided to include all elements or only the non-private ones. The JSON file will look like this:

  ![image](img/ME_UG_v1-0-0_quick_start_video_action_JSON_exported.png)


- ***Export RDF/XML*** and ***Export RDF/XML***

  These options allow you to export the metadata related to external resources in JSON or XML format.


- ***PDF documentation***

  A PDF version of the metadata can be automatically created. Select PDF documentation then click on `GENERATE PDF`. When the PDF is generated, click on `DOWNLOAD PDF`. You will obtain a bookmarked PDF file with all entered metadata.

  ![image](img/ME_UG_v1-0-0_quick_start_video_exported_to_PDF.png)
  

- ***Publish to NADA***

  If you have a NADA catalog and the credentials to publish content in it, you can also *Publish to NADA*. Select a configured NADA catalog, select the options as shown in the screenshot below, and click `PUBLISH`.

  ![image](img/ME_UG_v1-0-0_quick_start_video_publish_to_NADA.png)

  The video will now be listed and made discoverable in the NADA catalog, with a link to the YouTube channel. The video can be viewed from within the NADA page.  

  ![image](img/ME_UG_v1-0-0_quick_start_video_in_NADA.png)



