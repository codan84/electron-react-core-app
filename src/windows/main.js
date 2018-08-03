const electron  = require('electron')
const { BrowserWindow } = require('electron')

const closeAllWindows = windows => {
  Object.values(windows)
        .filter(win => win.id !== mainWindow.id)
        .forEach(win => win.close())
}

const getMainWindow = (baseUri, otherWindows) => {
  const primaryDisplay = electron.screen.getPrimaryDisplay()
  const windowConfig = {
    title: 'Electron core app main window',
    resizable: false,
    autoHideMenuBar: true,
    x: primaryDisplay.bounds.x + 50,
    y: primaryDisplay.bounds.y + 50,
    width: 400,
    height: 800,
    show: false
  }

  const mainWindow = new BrowserWindow(windowConfig)
  mainWindow.on('ready-to-show', () => mainWindow.show())
  mainWindow.on('closed', () => closeAllWindows(otherWindows))
  mainWindow.loadURL(`${baseUri}#/${path}`)
  //mainWindow.webContents.openDevTools()
  return mainWindow
}

module.exports = getMainWindow
