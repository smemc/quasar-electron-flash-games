import { app, BrowserWindow } from 'electron'
import fs from 'fs'
import path from 'path'

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = path.join(__dirname, 'statics').replace(/\\/g, '\\\\')
}

let mainWindow

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.join(__statics, 'icon.png'),
    width: 1000,
    height: 600,
    useContentSize: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      plugins: true
    }
  })

  mainWindow.loadURL(process.env.APP_URL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// Set Flash plugin switches
const pluginDir = process.env.PROD
  ? path.join(process.resourcesPath, 'PepperFlash')
  : path.resolve(
    __dirname,
    '..',
    'ppapi-flash-plugin',
    process.platform,
    process.arch
  )

const pluginName = {
  win32: 'pepflashplayer.dll',
  darwin: 'PepperFlashPlayer.plugin',
  linux: 'libpepflashplayer.so'
}

app.commandLine.appendSwitch(
  'ppapi-flash-path',
  path.join(pluginDir, pluginName[process.platform])
)
app.commandLine.appendSwitch(
  'ppapi-flash-version',
  JSON.parse(fs.readFileSync(path.join(pluginDir, 'manifest.json'))).version
)

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
