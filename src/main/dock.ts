import { app, Menu, BrowserWindow, ipcMain } from 'electron'
import store from './store'

let isPlaying = false
let enableOSD = false
let isLock = false

export function createDockMenu(win: BrowserWindow) {
  const lang = store.get('settings.lang') as string

  const updateDockMenu = (language: string) => {
    const template = {
      vi: [
        {
          label: isPlaying ? 'Tạm dừng' : 'Phát',
          click() {
            win.webContents.send('play')
          }
        },
        {
          label: 'Bài tiếp theo',
          click() {
            win.webContents.send('next')
          }
        },
        {
          label: 'Bài trước',
          click() {
            win.webContents.send('previous')
          }
        },
        { type: 'separator' },
        {
          label: enableOSD ? 'Tắt lời bài hát' : 'Bật lời bài hát',
          click() {
            win.webContents.send('updateOSDSetting', { show: !enableOSD })
          }
        },
        {
          label: isLock ? 'Mở khóa lời bài hát' : 'Khóa lời bài hát',
          click() {
            win.webContents.send('updateOSDSetting', { lock: !isLock })
          }
        },
        { type: 'separator' }
      ]
    }
    const menu = Menu.buildFromTemplate(template[language])
    if (menu && app.dock) app.dock.setMenu(menu)
  }
  updateDockMenu(lang)

  ipcMain.on('updatePlayerState', (_, data: any) => {
    for (const [key, value] of Object.entries(data) as [string, any]) {
      const lang = store.get('settings.lang') as string
      if (key === 'playing') {
        isPlaying = value
        updateDockMenu(lang)
      }
    }
  })

  ipcMain.on('updateOsdState', (event, data) => {
    const [key, value] = Object.entries(data)[0] as [string, any]
    if (key === 'show') {
      enableOSD = value
      updateDockMenu(lang)
    } else if (key === 'isLock') {
      isLock = value
      updateDockMenu(lang)
    }
  })

  ipcMain.on('setStoreSettings', (_, data: any) => {
    const [key, value] = Object.entries(data)[0] as [string, any]
    if (key === 'lang') {
      updateDockMenu(value)
    }
  })
}
