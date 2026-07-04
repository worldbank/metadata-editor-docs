/* TS CODE

// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'

// custom CSS
import './style/print.css'

export default {
  // Extending the Default Theme
  ...DefaultTheme,
}
*/

import DefaultTheme from 'vitepress/theme'

import { theme, useOpenapi, useTheme } from 'vitepress-openapi/client'
import 'vitepress-openapi/dist/style.css'

import spec from '../openapi.bundled.json'

// custom CSS
import './print.css'

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        // Set the OpenAPI specification.
        useOpenapi({ spec })

        // Configure theme.
        useTheme({
            path: {
                //showBaseURL: true,
            },
            requestBody: {
                defaultView: 'contentType',
            },
            codeSamples: {
                defaultLang: 'curl',
                availableLanguages: [
                    {
                        lang: 'curl',
                        label: 'cURL',
                        target: 'shell',
                        client: 'curl',
                        highlighter: 'bash',
                        icon: 'curl',
                    },
                    {
                        lang: 'python',
                        label: 'Python',
                        target: 'python',
                        client: 'requests',
                        highlighter: 'python',
                        icon: '.py',
                    },
                    {
                        lang: 'r',
                        label: 'R',
                        target: 'r',
                        client: 'httr',
                        highlighter: 'r',
                        icon: '.r',
                    },
                ],
            },
            /*server: {
                allowCustomServer: true,
            },*/
            playground: {
                jsonEditor: {
                    mode: 'text',
                    mainMenuBar: false,
                    navigationBar: false,
                    statusBar: false,
                },
            },
        })

        // Use the theme.
        theme.enhanceApp({ app })
    }
}
