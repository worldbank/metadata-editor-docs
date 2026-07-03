# Long vs wide format

> **Worked example:** [Quick start: Indicator](/quick_start_indicator.html) uses a **wide** CSV to paste geographic coverage into metadata. **Long** format is required to import observation data.

## Definitions

| Format | Layout | Use in Metadata Editor |
|--------|--------|------------------------|
| **Wide** | One row per series (for example country); years or periods as **column headers** | **Not imported** as observation data. Useful for extracting coverage lists and for sources like WDI exports. |
| **Long** | One row per **observation value**; columns for geography, time period, dimensions (if any), indicator ID, and value | **Required** for CSV import, DSD bootstrap from CSV, and data validation. |

In long format, each row represents a single observed value — for example poverty rate in Argentina in 2010.

## Example: SI.POV.DDAY

Example files for the World Bank indicator **SI.POV.DDAY** (*Poverty headcount ratio at $3.00 a day (2021 PPP) (% of population)*) are in [`quick_start_files/indicator/`](/quick_start_files/indicator/README.html).

### Wide file (metadata coverage only)

[`SI.POV.DDAY_countries_data.csv`](/quick_start_files/indicator/SI.POV.DDAY_countries_data.csv) — countries as rows, years as columns. Use it in the [Quick start](/quick_start_indicator.html) to copy/paste country names and codes into **Geographic and time coverage**.

Do **not** use this file to create a data structure from CSV or to import observations — year columns would be misread as separate components.

### Long file (import and DSD)

[`SI.POV.DDAY_countries_data-long.csv`](/quick_start_files/indicator/SI.POV.DDAY_countries_data-long.csv) — one row per country-year observation:

| REF_AREA | REF_AREA_LABEL | INDICATOR | YEAR | VALUE |
|----------|----------------|-----------|------|-------|
| ARG | Argentina | SI.POV.DDAY | 2010 | 1.5 |
| ARG | Argentina | SI.POV.DDAY | 2015 | 1.1 |
| ARM | Armenia | SI.POV.DDAY | 2010 | 2.9 |

Use this file when [creating a data structure from CSV](/managing_data_structures.html#create-a-data-structure-from-a-csv-file) or [importing observation data](/documenting_indicator_import_data.html). At import, select indicator ID **`SI.POV.DDAY`** (the same code used as *Other identifiers* in reference metadata).

## Converting wide to long

If your source data are wide (common for WDI and similar databases), pivot them before import — for example one row per geography-period with columns `REF_AREA`, `YEAR`, `VALUE`, and `INDICATOR`. The [ME_API Example 3](/ME_API.html#example-3-extract-time-series-and-related-metadata-from-an-excel-file-and-publish-in-the-metadata-editor) shows wide-to-long reshaping in R.

## See also

- [Structural metadata at project level](/documenting_indicator_data_structure.html) — attach a DSD and validate
- [Dimensions vs separate indicators](/documenting_indicator_concepts_dimensions.html) — when the long file includes breakdown columns
