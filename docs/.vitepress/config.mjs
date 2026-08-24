import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Metadata Editor",
  description: "Metadata Editor user guide",
  base: '/metadata-editor-docs/',
  themeConfig: {
    logo: '/logo-var-dark.svg',
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
        text: 'Installation and upgrade',
        collapsed: false,
        items: [
          { text: 'Technical specifications', link: '/tech_technical_specifications' },
          {
            text: 'Installation',
            link: '/tech_installation',
            collapsed: false,
            items: [
              { text: 'Linux server', link: '/tech_installation_linux' },
              { text: 'Windows server', link: '/tech_installation_windows' },
              { text: 'Desktop', link: '/tech_installation_desktop' },
              { text: 'PHP installation', link: '/tech_installation_php' },
              { text: 'Clean URLs', link: '/tech_installation_clean_urls' }
            ]
          },
          {
            text: 'FastAPI service',
            collapsed: true,
            items: [
              { text: 'Install and configure', link: '/tech_installation_data_api' },
              { text: 'Run the FastAPI service', link: '/tech_installation_fastapi' },
              { text: 'Metadata reviewer (optional)', link: '/tech_installation_metadata_reviewer' }
            ]
          },
          { text: 'Post-install configuration', link: '/tech_post_install_configuration' },
          { text: 'OpenID Connect (OIDC)', link: '/tech_user_authentication' },
          { text: 'Jobs and background workers', link: '/tech_jobs_and_workers' },
          {
            text: 'Upgrading',
            link: '/tech_upgrading',
            collapsed: false,
            items: [
              { text: 'Upgrade to v1.3.0', link: '/tech_upgrading_v1_3' },
              { text: 'Upgrade to v1.2.0', link: '/tech_upgrading_v1_2' }
            ]
          }
          /*
          { text: 'Migrating content from Nesstar or NADA', link: '/tech_migrating' },
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
        text: 'Quick start',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/quick_start_overview' },
          { text: 'Document', link: '/quick_start_document' },
          { text: 'Microdata', link: '/quick_start_microdata' },
          { text: 'Indicator', link: '/quick_start_indicator' },          
          { text: 'Geographic dataset', link: '/quick_start_geographic' },          
          { text: 'Image', link: '/quick_start_image' },
          { text: 'Video', link: '/quick_start_video' },
          { text: 'Scripts', link: '/quick_start_script' }
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
        text: 'Custom metadata schemas',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/custom_schemas' },
          { text: 'Managing custom schemas', link: '/managing_custom_schemas' },
          { text: 'JSON Schema guidelines', link: '/custom_schemas_json_schema_guidelines' }
        ]
      },
      {
        text: 'Managing projects, collections, and users',
        collapsed: false,
        items: [
          { text: 'Managing projects', link: '/managing_projects' },
          { text: 'Managing collections', link: '/managing_collections' },
          { text: 'Managing background jobs', link: '/managing_jobs' },
          { text: 'Managing users and roles', link: '/tech_roles_permissions' }
        ]
      },
      {
        text: 'Structural metadata',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/structural_metadata' },
          { text: 'Managing codelists', link: '/managing_codelists' },
          { text: 'Managing data structures', link: '/managing_data_structures' }
        ]
      },
      {
        text: 'Documenting data',
        collapsed: false,
        items: [
          { text: 'General instructions', link: '/documenting_general_instructions' },
          { text: 'Validating metadata', link: '/validating_metadata' },
          { text: 'Document', link: '/documenting_document' },
          {
            text: 'Microdata',
            link: '/documenting_microdata',
            collapsed: false,
            items: [
              { text: 'Before you start', link: '/documenting_microdata_before_you_start' },
              { text: 'Create a new project', link: '/documenting_microdata_create_project' },
              { text: 'Import and document the dataset', link: '/documenting_microdata_import_document' }
            ]
          },
          {
            text: 'Indicator',
            link: '/documenting_indicator',
            collapsed: false,
            items: [
              { text: 'Before you start', link: '/documenting_indicator_before_you_start' },
              {
                text: 'Concepts',
                collapsed: true,
                items: [
                  { text: 'SDMX and the World Bank schema', link: '/documenting_indicator_concepts_sdmx' },
                  { text: 'Long vs wide format', link: '/documenting_indicator_concepts_long_wide' },
                  { text: 'Dimensions vs separate indicators', link: '/documenting_indicator_concepts_dimensions' }
                ]
              },
              { text: 'Reference metadata', link: '/documenting_indicator_descriptive_metadata' },
              { text: 'Structural metadata (project)', link: '/documenting_indicator_data_structure' },
              { text: 'Observation data', link: '/documenting_indicator_import_data' },
              { text: 'Export and publish', link: '/documenting_indicator_export_publish' }
            ]
          },
          { text: 'Databases or datasets', link: '/documenting_dataset' },
          { text: 'Geographic dataset or service', link: '/documenting_geographic' },
          { text: 'Image', link: '/documenting_image' },
          { text: 'Video', link: '/documenting_video' },
          { text: 'Research project and scripts', link: '/documenting_script' }
        ]
      },
      {
        text: 'Project issues',
        collapsed: false,
        items: [
          { text: 'Working with project issues', link: '/project_issues' }
        ]
      },
      {
        text: 'Metadata reviewer',
        collapsed: false,
        items: [
          { text: 'Metadata reviewer', link: '/assess_metadata' }
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
          { text: 'Introduction to the API', link: '/ME_API' },
          { text: 'API reference', link: 'https://worldbank.github.io/metadata-schemas/' }
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
