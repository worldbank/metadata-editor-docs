# Example files: SI.POV.DDAY

These files support [Quick start: Indicator](/quick_start_indicator.html) and the [Documenting indicators](/documenting_indicator.html) guide. They all refer to the same World Bank indicator:

- **Code:** `SI.POV.DDAY`
- **Title:** Poverty headcount ratio at $3.00 a day (2021 PPP) (% of population)
- **Source:** World Development Indicators (WDI)

| File | Format | Use in documentation |
|------|--------|----------------------|
| [SI.POV.DDAY_countries_data.csv](./SI.POV.DDAY_countries_data.csv) | Wide (years as columns) | [Quick start](/quick_start_indicator.html) — geographic and time coverage (copy/paste countries). See [Long vs wide format](/documenting_indicator_concepts_long_wide.html). |
| [SI.POV.DDAY_countries_data-long.csv](./SI.POV.DDAY_countries_data-long.csv) | Long | Create DSD from CSV, [import observation data](/documenting_indicator_import_data.html), charts, [publish data](/publish_to_nada.html#indicators-dsd-and-observation-data) |

Also used by the quick start:

- `poverty_thumbnail.jpg` — project thumbnail (same folder)

The long file uses these columns:

`REF_AREA_LABEL`, `REF_AREA`, `INDICATOR_LABEL`, `INDICATOR`, `YEAR`, `VALUE`

Do not use the **wide** file for data import or DSD bootstrap from CSV — use the **long** file instead.
