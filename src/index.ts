import { app, BrowserWindow, Tray } from 'electron'

const platform = require('os').platform()
const path = require('path')

declare const MAIN_WINDOW_WEBPACK_ENTRY: any

let mainWindow: BrowserWindow

let trayIcon: string
let appIcon: Tray

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit()
}

// Determine appropriate icon for platform
// console.log(path.join(__dirname, 'images/favicon.png'))
// if (platform == 'darwin') {
//   trayIcon = path.join(__dirname, 'images/favicon.png')
// } else if (platform == 'win32') {
//   trayIcon = path.join(__dirname, 'images/favicon.ico')
// }

const createWindow = (): void => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    show: false,
    // icon: trayIcon,
    title: 'CSS Prefixer',
    webPreferences: {
      nodeIntegration: true
    }
  })

  // Create tray icon
  // appIcon = new Tray(trayIcon)

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
