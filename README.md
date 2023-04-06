# ReactDownload

- ✨ **This workspace has been generated by [Nx, a Smart, fast and extensible build system.](https://nx.dev)** ✨
- ✨ **Credit: Core functionality is taken from this [blog.](https://huynvk.dev/blog/download-files-and-zip-them-in-your-browsers-using-javascript)** ✨

## Requirements

- Node 18
- yarn
- Chrome
- [Chrome CORS extension](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en)

## Development server

- Run `yarn && yarn start` for a dev server.
- Navigate to http://localhost:4200/.
- The app will automatically reload if you change any of the source files.

## Links to NPM packages

- [bluebird](https://www.npmjs.com/package/bluebird)
- [jszip](https://www.npmjs.com/package/jszip)
- [FileSaver](https://github.com/eligrey/FileSaver.js)

## Links to free image generator sites (downloadable via chrome cors extension):

- https://picsum.photos
- https://via.placeholder.com/600/771796

## Links to free wav sample sites (downloadable via chrome cors extension):

- https://freewavesamples.com/
- https://file-examples.com/index.php/sample-audio-files/sample-wav-download/

## Change log

### 4/6/2023

- replaced fetch with axios
- axios gets are cached correctly
- chrome cors extension must be on for all downloads including images
- to test for failure cases, toggle the extension off
