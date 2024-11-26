import { app, ipcMain } from 'electron'
import {
  type ProgressInfo,
  type UpdateDownloadedEvent,
  autoUpdater
} from 'electron-updater'

export function update(win: Electron.BrowserWindow, dialog: Electron.Dialog) {

  // When set to false, the update download will be triggered through the API
  autoUpdater.autoDownload = false
  autoUpdater.autoInstallOnAppQuit = true

  // start check
  autoUpdater.on('checking-for-update', function () {})
  // update available
  autoUpdater.on('update-available', (info) => {
    const { releaseName, releaseNotes, version} = info
    const dialogOpts = {
      type: "info",
      buttons: ["Actualizar", "Postergar"],
      title: "Actualización disponible",
      message: `Nueva versión ${releaseName} disponible`,
      detail: "Hay una nueva versión disponible, ¿desea actualizar ahora?"
    }

    dialog.showMessageBox(dialogOpts).then((returnValue) => {
      if (returnValue.response === 0) autoUpdater.quitAndInstall()
    });

    win.webContents.send('update-can-available', { update: true, version: app.getVersion(), newVersion: version })
  })
  // update not available
  autoUpdater.on('update-not-available', (arg) => {
    win.webContents.send('update-can-available', { update: false, version: app.getVersion(), newVersion: arg?.version })
  })

  // Checking for updates
  ipcMain.handle('check-update', async () => {
    try {
      return await autoUpdater.checkForUpdatesAndNotify()
    } catch (error) {
      return { message: 'Network error', error }
    }
  })

  // Start downloading and feedback on progress
  ipcMain.handle('start-download', (event) => {
    startDownload(
      (error, progressInfo) => {
        if (error) {
          // feedback download error message
          event.sender.send('update-error', { message: error.message, error })
        } else {
          // feedback update progress message
          event.sender.send('download-progress', progressInfo)
        }
      },
      () => {
        // feedback update downloaded message
        event.sender.send('update-downloaded')
      }
    )
  })

  // Install now
  ipcMain.handle('quit-and-install', () => {
    autoUpdater.quitAndInstall(false, true)
  })
}

function startDownload(
  callback: (error: Error | null, info: ProgressInfo) => void,
  complete: (event: UpdateDownloadedEvent) => void,
) {
  autoUpdater.on('download-progress', info => callback(null, info))
  autoUpdater.on('error', error => callback(error, null))
  autoUpdater.on('update-downloaded', complete)
  autoUpdater.downloadUpdate()
}
