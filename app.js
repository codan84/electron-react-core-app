const electron  = require('electron')
const {app, BrowserWindow, ipcMain} = require('electron')

const windows = {}

const createAppWindow = (windowId, windowConfig, baseUri, path, onReadyToShow, openDevTools) => {
  if(!windows[windowId]) {
    const window = windows[windowId] = new BrowserWindow(windowConfig)
    window.on('ready-to-show', () => {
      window.show()
      onReadyToShow && onReadyToShow()
    })
    window.on('closed', () => { delete windows[windowId] })
    window.loadURL(`${baseUri}#/${path}`)
    openDevTools && window.webContents.openDevTools()
    return window
  }
}

const createMainWindow = (baseUri) => {
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
  const mainWindow = createAppWindow('main', windowConfig, baseUri, 'main', null, false)
  mainWindow.on('closed', () => {
    Object.values(windows)
          .filter(win => win.id !== mainWindow.id)
          .forEach(win => win.close())
    delete windows['main']
  })
}

const runApp = () => {
  const baseUri = process.env.DEV ? `http://localhost:3000/` : `file://${__dirname}/build/index.html`

  ipcMain.on('broadcast-message', (eventName, arg) => {
    Object.values(windows)
          .forEach(win => win.webContents.send(eventName, arg))
  })
  
  ipcMain.on('close-window', (event, arg) => {
    windows[arg] && windows[arg].close()
  })
  
  app.on('ready', () => createMainWindow(baseUri))
  
  app.on('window-all-closed', () => app.quit())
  
  app.on('activate', () => {
    if (!window.main) {
      createMainWindow(baseUri)
    }
  })
}

runApp()
