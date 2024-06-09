import { defineManifest } from '@crxjs/vite-plugin'
import packageJson from './package.json'
const { version } = packageJson

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = '0'] = version
    // can only contain digits, dots, or dash
    .replace(/[^\d.-]+/g, '')
    // split into version parts
    .split(/[.-]/)

export default defineManifest(async () => ({
    manifest_version: 3,
    name: "Search Hub",
    version: `${major}.${minor}.${patch}.${label}`,
    description: "Redirect Google search to wherever you want",
    icons: {
      "16": "search-hub-16.png",
      "24": "search-hub-24.png",
      "32": "search-hub-32.png",
      "48": "search-hub-48.png",
      "64": "search-hub-64.png",
      "96": "search-hub-96.png",
      "128": "search-hub-128.png"
    },
    browser_specific_settings: {
      "gecko": {
        "id": "searchhub@searchhub.com"
      }
    },
    permissions: ["storage"],
    content_scripts: [
      {
        "js": ["src/content.jsx"],
        "matches": ["https://www.google.com/search*"]
      }
    ],
    action: {
      "default_popup": "popup.html"
    },
    options_ui: {
      "page": "options.html",
      "open_in_tab": true
    },
}))