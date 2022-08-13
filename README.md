# `pkg-and-serve`

This project allows you to package a static website as a single executable file. This executable will start a local server hosting your site, open it in the user's default browser, and shut itself down when the site is closed.

Note that this is most useful for quickly creating a shareable file for testing/portable deployment, and will usually be a less ideal user experience when compared with a full desktop application (e.g. with [Electron](https://www.electronjs.org/)).

## Usage

### As command-line tool

```sh
npx pkg-and-serve [input] [output]
```

### As boilerplate project

1. clone
2. `npm i`
3. replace contents of `./app` with your app
4. update `name` in `pkg.config.json`
5. add additional localhost endpoints in `server.js` if needed
6. `npm run build`
7. self-contained build outputs will be in `./build`
