import { defineUserConfig } from 'vitepress-export-pdf';
import userConfig from './config.mjs';

function extractLinksFromConfig(config) {
  const links = [];

  function extractLinks(sidebar) {

    if (sidebar.items) {
        for (const item of sidebar.items) {            
          if (item.items) {
            extractLinks(item.items);
          } else if (item.link) {
            links.push(`${item.link}.html`);
          }
        }
    }

  }

  for (const key in config.sidebar) {
    extractLinks(config.sidebar[key]);
  }


  return links;
}

const links = extractLinksFromConfig(userConfig.themeConfig);

const routeOrder = [
  '/index.html',
  ...links,
];

const headerTemplate = `<div style="margin-top: -0.4cm; height: 70%; width: 100%; display: flex; justify-content: center; align-items: center; color: lightgray; border-bottom: solid lightgray 1px; font-size: 10px;font-family: arial; ">
  <span class="title"></span>
</div>`;

const footerTemplate = `<div style="margin-bottom: -0.4cm; height: 70%; width: 100%; display: flex; justify-content: center; align-items: center; color: lightgray; border-top: solid lightgray 1px; font-size: 10px; font-family: arial;">
  <span style="margin-left: 15px;">Page <span class="pageNumber"></span> of <span class="totalPages"></span> | Chapter: <span class="title"></span></span>
</div>`;

// print all links
console.log('Links:', links);


export default defineUserConfig({
    //exclude
    routePatterns: [
        "!/",
        "!/index.html", 
        "!/img/**", 
        "!config.mjs", 
        "!/quick_start_files/**",
        "!/tech_technical_specifications**", 
        "!/tech_upgrad**",
        "!/tech_migra**",
        "!/publish_to_other_platforms**" ],

    //exclude everything, except cover page + intro
    //routePatterns: ['!/**', "/pdf-cover-page**","/intro**" ],


    /*
    sorter: (pageA, pageB) => {
		const aIndex = routeOrder.findIndex(route => route === pageA.path);
		const bIndex = routeOrder.findIndex(route => route === pageB.path);
		return aIndex - bIndex;
	},
    */
   sorter: (pageA, pageB) => {

        //if not in routeOrder, add to end
        /*if (!routeOrder.includes(pageA.path) && !routeOrder.includes(pageB.path)) {
            return 1000;
        }*/

        const aIndex = routeOrder.findIndex(route => route === pageA.path);
        const bIndex = routeOrder.findIndex(route => route === pageB.path);

        return aIndex - bIndex;
    },
  outFile: 'metadata-editor-guide.pdf',
  outDir: 'docs/public',
  pdfOptions: {
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: false,
    headerTemplate,
    footerTemplate,
    margin: {
        top: 60,
        bottom: 60,
        left: 25,
    },
  },
});