# Quasar Flash Games

SWF game directory built with Quasar Framework

## Motivation

With [Adobe Flash Player EOL](https://theblog.adobe.com/adobe-flash-update/) announced at the end of 2020, a huge number of SWF games and educational resources may be unplayable in almost all web browsers. Major web browsers are already progressively disabling Adobe Flash Player plugin support, making the usage of these games harder and harder.

In order to provide a way to ensure the games will still be playable for some time after Flash Player EOL, we're developing this Electron-based SWF game browser with [Quasar Framework](https://quasar.dev). We're continously updating it, and we'll stick it in the latest supported Flash Player plugin and Electron releaeses after that EOL. It supports both online and offline games.

## Instructions

1. Clone this repository.
2. Go to directory `quasar-electron-flash-games`.
3. Run `npm install`.
4. Download [Adobe Flash Player](https://get.adobe.com/br/flashplayer/) for your OS and architecture, and extract plugin with its `manifest.json` to appropriate directory under `src-electron/ppapi-flash-plugin`:
   - `darwin/x64` for 64-bit macOS
     - There's no 32-bit macOS since "Lion" release.
   - `linux/x64` for 64-bit Linux
   - `linux/ia32` for 32-bit Linux
   - `win32/x64` for 64-bit Windows
   - `win32/ia32` for 32-bit Windows
5. Add new games to directory `src/statics/games`. See [Game File Structure](/src/statics/games/README.md) for more info.
6. Run `npx quasar dev -m electron` to run in development mode.
   - You can omit `npx` if you have `@quasar/cli` installed globally in your system.
7. When you're done, run `npx quasar build -m electron` to build final package.
   - You can omit `npx` if you have `@quasar/cli` installed globally in your system.
