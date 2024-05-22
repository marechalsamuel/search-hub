# Search hub

## Requirements
- NodeJS `v20.13.1`

## Install
- `npm i -g pnpm@9.1.1`
- `pnpm i`

## Build
- `pnpm build`

## Adapt manually `manifest.json` for Firefox :
- Add `browser_specific_settings.gecko.id`
    ```json
      "browser_specific_settings": {
        "gecko": {
          "id": "searchhub@searchhub.com"
        }
      },
    ```
- Remove `version_name`
- Remove `web_accessible_resources.use_dynamic_url`

## Notes
Made with
- vitejs
- crxjs
- react
- chakra-ui
- zod
- uuid