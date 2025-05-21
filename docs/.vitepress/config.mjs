import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Metadata Editor",
  description: "Metadata Editor user guide",
  base: '/metadata-editor-docs/',
  themeConfig: {
    logo: 'img/logo-var-dark.svg',
    search: {
      provider: 'local'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' }      
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'About', link: '/intro_about' },
          { text: 'Acknowledgments', link: '/intro_acknowledgments' },
          { text: 'Rationale and objective', link: '/intro_rationale' },
          { text: 'Introduction to metadata standards', link: '/intro_metadata_standards' },
          { text: 'How to produce standard-compliant metadata?', link: '/intro_metadata_creation' }
        ]
      },
      {
        text: 'Specifications, installation, and upgrade',
        items: [
          { text: 'Technical specifications', link: '/tech_technical_specifications' },
          { text: 'Installation', link: '/tech_installation' }
          /*
          { text: 'Migrating content from Nesstar or NADA', link: '/tech_migrating' },
          { text: 'Upgrading', link: '/tech_upgrading' },
          */
        ]
      },
      {
        text: 'Login, logout, and password',
        items: [
          { text: 'Login, logout, and password', link: '/user_login' }
        ]
      },
      {
        text: ' Quick start',
        items: [
          { text: 'Overview', link: '/quick_start_overview' },
          { text: 'Document', link: '/quick_start_document' },
          { text: 'Indicator', link: '/quick_start_indicator' },
          { text: 'Microdata', link: '/quick_start_microdata' },
          { text: 'Geographic dataset', link: '/quick_start_geographic' },
          { text: 'Scripts', link: '/quick_start_script' },
          { text: 'Image', link: '/quick_start_image' },
          { text: 'Video', link: '/quick_start_video' }
        ]
      },
      {
        text: 'Metadata templates',
        items: [
          { text: 'Purpose of templates', link: '/templates_purpose' },
          { text: 'Designing templates', link: '/templates_design' },
          { text: 'Administrative metadata', link: '/templates_administrative' }
        ]
      },
      {
        text: 'Managing projects, collections, and users',
        items: [
          { text: 'Managing projects', link: '/managing_projects' },
          { text: 'Managing collections', link: '/managing_collections' },
          { text: 'Managing users and roles', link: '/tech_roles_permissions' }
        ]
      },
      {
        text: 'Documenting data',
        items: [
          { text: 'General instructions', link: '/documenting_general_instructions' },
          { text: 'Microdata', link: '/documenting_microdata' },
          { text: 'Document', link: '/documenting_document' },
          { text: 'Indicator and database', link: '/documenting_indicator' },
          { text: 'Geographic dataset or service', link: '/documenting_geographic' },
          { text: 'Image', link: '/documenting_image' },
          { text: 'Video', link: '/documenting_video' },
          { text: 'Research project and scripts', link: '/documenting_script' }
        ]
      },
      {
        text: 'Publishing data and metadata',
        items: [
          { text: 'Publish to NADA', link: '/publish_to_nada' },
          /*
          { text: 'Publish to other platforms', link: '/publish_to_other_platforms' }
           */
        ]
      },
      /*
      {
        text: 'Tools for administrators',
        items: [
          { text: 'Administrator toolset', link: '/admin_tools' }
        ]
      },
      */
      {
        text: 'Metadata Editor API',
        items: [
          { text: 'Introduction to the API', link: '/ME_API' }
          /*
          { text: 'For Python users', link: '/API_python' },
          { text: 'For R users', link: '/API_R' }
           */
        ]
      },
      {
        text: 'For developers and translators',
        items: [
          { text: 'Developers', link: '/developers' },
          { text: 'Translators', link: '/translators' }
        ]
      },
      {
        text: 'Providing feedback',
        items: [
          { text: 'Feedback and contacts', link: '/feedback' }
        ]
      },
      {
        text: 'Useful resources',
        items: [
          { text: 'Resources and links', link: '/useful_resources' }
        ]
      }


    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/worldbank/metadata-editor-docs' }
    ]
  }
})
