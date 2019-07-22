# Quasar Flash Games

SWF game directory built with Quasar Framework

## Instructions

1. Clone this repository.
2. Go to directory `quasar-electron-flash-games`.
3. Run `npm install`.
4. Download [Adobe Flash Player](https://get.adobe.com/br/flashplayer/) for your OS and architecture, and extract plugin binary file with its `manifest.json` file to appropriate directory under `src-electron/ppapi-flash-plugin`:
   - `darwin/x64` for 64-bit macOS
     - There's no 32-bit macOS since "Lion" release.
   - `linux/x64` for 64-bit Linux
   - `linux/ia32` for 32-bit Linux
   - `win32/x64` for 64-bit Windows
   - `win32/ia32` for 32-bit Windows
5. Add new games to directory `src/statics/games`. See [Game File Structure]() for more info.
6. Run `npx quasar dev -m electron` to run in development mode.
   - You can omit `npx` if you have `@quasar/cli` installed globally in your system.
7. When you're done, run `npx quasar build -m electron` to build final package.
   - You can omit `npx` if you have `@quasar/cli` installed globally in your system.
