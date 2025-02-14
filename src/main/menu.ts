import { app, BrowserWindow, Menu, ipcMain, shell } from 'electron'
import defaultShortcuts from './utils/shortcuts'
import Constants from './utils/Constants'
import store from './store'

let isPlaying = false
let repeatMode = 'off'
let shuffleMode = false
let enableOSD = false
let isLock = false

export function createMenu(win: BrowserWindow) {
  let shortcuts = store.get('settings.shortcuts') as
    | {
        id: string
        name: string
        shortcut: string
        globalShortcut: string
      }[]
    | undefined
  if (shortcuts === undefined) {
    shortcuts = defaultShortcuts
  }
  const lang = store.get('settings.lang') as string

  let menu = null
  const updateMenu = (language: string) => {
    const template = {
      vi: [
        ...(Constants.IS_MAC
          ? [
              {
                label: app.name,
                submenu: [
                  { role: 'about', label: 'Giới thiệu ' + app.name },
                  { type: 'separator' },
                  { role: 'services', label: 'Dịch vụ' },
                  { type: 'separator' },
                  {
                    label: 'Tùy chọn...',
                    accelerator: 'CmdOrCtrl+,',
                    click: () => {
                      win.webContents.send('changeRouteTo', '/settings')
                    },
                    role: 'preferences'
                  },
                  { type: 'separator' },
                  { role: 'hide', label: 'Ẩn' },
                  { role: 'hideothers', label: 'Ẩn các cửa sổ khác' },
                  { role: 'unhide', label: 'Hiện tất cả' },
                  { type: 'separator' },
                  { role: 'quit', label: 'Thoát' }
                ]
              }
            ]
          : []),
        {
          label: 'Chỉnh sửa',
          submenu: [
            { role: 'undo', label: 'Hoàn tác' },
            { role: 'redo', label: 'Làm lại' },
            { type: 'separator' },
            { role: 'cut', label: 'Cắt' },
            { role: 'copy', label: 'Sao chép' },
            { role: 'paste', label: 'Dán' },
            ...(Constants.IS_MAC
              ? [
                  { role: 'delete', label: 'Xóa' },
                  { role: 'selectAll', label: 'Chọn tất cả' },
                  { type: 'separator' },
                  {
                    label: 'Đọc',
                    submenu: [
                      {
                        role: 'startspeaking',
                        label: 'Bắt đầu đọc'
                      },
                      { role: 'stopspeaking', label: 'Dừng đọc' }
                    ]
                  }
                ]
              : [
                  { role: 'delete', label: 'Xóa' },
                  { type: 'separator' },
                  { role: 'selectAll', label: 'Chọn tất cả' }
                ]),
            {
              label: 'Tìm kiếm',
              accelerator: 'CmdOrCtrl+F',
              click: () => {
                win.webContents.send('search')
              }
            }
          ]
        },
        {
          label: 'Điều khiển',
          submenu: [
            {
              label: isPlaying ? 'Tạm dừng' : 'Phát',
              accelerator: shortcuts?.find((s) => s.id === 'play')?.shortcut,
              click: () => {
                win.webContents.send('play')
              }
            },
            {
              label: 'Tiếp theo',
              accelerator: shortcuts?.find((s) => s.id === 'next')?.shortcut,
              click: () => {
                win.webContents.send('next')
              }
            },
            {
              label: 'Trước đó',
              accelerator: shortcuts?.find((s) => s.id === 'previous')?.shortcut,
              click: () => {
                win.webContents.send('previous')
              }
            },
            {
              label: 'Tăng âm lượng',
              accelerator: shortcuts?.find((s) => s.id === 'increaseVolume')?.shortcut,
              click: () => {
                win.webContents.send('increaseVolume')
              }
            },
            {
              label: 'Giảm âm lượng',
              accelerator: shortcuts?.find((s) => s.id === 'decreaseVolume')?.shortcut,
              click: () => {
                win.webContents.send('decreaseVolume')
              }
            },
            {
              label: 'Yêu thích',
              accelerator: shortcuts?.find((s) => s.id === 'like')?.shortcut,
              click: () => {
                win.webContents.send('like')
              }
            },
            {
              label: 'Lặp lại',
              submenu: [
                {
                  label: 'Tắt lặp lại',
                  click: () => win.webContents.send('repeat', 'off'),
                  id: 'off',
                  checked: repeatMode === 'off',
                  type: 'radio'
                },
                {
                  label: 'Lặp lại tất cả',
                  click: () => win.webContents.send('repeat', 'on'),
                  id: 'on',
                  checked: repeatMode === 'on',
                  type: 'radio'
                },
                {
                  label: 'Lặp lại một bài',
                  click: () => win.webContents.send('repeat', 'one'),
                  id: 'one',
                  checked: repeatMode === 'one',
                  type: 'radio'
                }
              ]
            },
            {
              label: 'Phát ngẫu nhiên',
              accelerator: 'Alt+S',
              click: () => {
                win.webContents.send('repeat-shuffle', !shuffleMode)
              }
            },
            {
              label: `${enableOSD ? 'Tắt' : 'Bật'} lời trên màn hình`,
              click: () => {
                win.webContents.send('updateOSDSetting', { show: !enableOSD })
              }
            },
            {
              label: `${isLock ? 'Mở khóa' : 'Khóa'} lời trên màn hình`,
              click: () => {
                win.webContents.send('updateOSDSetting', { lock: !isLock })
              }
            }
          ]
        },
        {
          label: 'Cửa sổ',
          submenu: [
            { role: 'close', label: 'Đóng' },
            { role: 'minimize', label: 'Thu nhỏ' },
            { role: 'zoom', label: 'Phóng to' },
            { role: 'reload', label: 'Tải lại' },
            { role: 'forcereload', label: 'Tải lại mạnh' },
            {
              role: 'toggledevtools',
              label: 'Công cụ phát triển'
            },
            { type: 'separator' },
            { role: 'togglefullscreen', label: 'Toàn màn hình' },
            ...(Constants.IS_MAC
              ? [
                  { type: 'separator' },
                  { role: 'front', label: 'Đưa tất cả lên trên' },
                  { type: 'separator' },
                  {
                    role: 'window',
                    id: 'window',
                    label: app.name,
                    type: 'checkbox',
                    checked: true,
                    click: () => {
                      const current = menu.getMenuItemById('window')
                      if (current.checked === false) {
                        win.hide()
                      } else {
                        win.show()
                      }
                    }
                  }
                ]
              : [{ role: 'close' }])
          ]
        },
        {
          label: 'Trợ giúp',
          submenu: [
            {
              label: 'GitHub',
              click: async () => {
                await shell.openExternal('https://github.com/huyduc1602/VutronMusic/')
              }
            },
            {
              label: 'Electron',
              click: async () => {
                await shell.openExternal('https://electronjs.org')
              }
            },
            {
              label: 'Công cụ phát triển',
              accelerator: 'F12',
              click: () => {
                win.webContents.openDevTools()
              }
            }
          ]
        }
      ],
      // Keep the rest of the language sections (en, zh, zht) as they are
      en: [
        /* ... */
      ],
      zh: [
        /* ... */
      ],
      zht: [
        /* ... */
      ]
    }
    menu = Menu.buildFromTemplate(template[language])
    Menu.setApplicationMenu(menu)
  }
  updateMenu(lang)

  ipcMain.on('updatePlayerState', (_, data: any) => {
    for (const [key, value] of Object.entries(data) as [string, any]) {
      const lang = store.get('settings.lang') as string
      if (key === 'playing') {
        isPlaying = value
        updateMenu(lang)
      } else if (key === 'repeatMode') {
        repeatMode = value
        updateMenu(lang)
      } else if (key === 'shuffle') {
        shuffleMode = value
      }
    }
  })

  ipcMain.on('updateOsdState', (event, data) => {
    const [key, value] = Object.entries(data)[0] as [string, any]
    if (key === 'show') {
      enableOSD = value
      updateMenu(lang)
    } else if (key === 'isLock') {
      isLock = value
      updateMenu(lang)
    }
  })

  ipcMain.on('setStoreSettings', (_, data: any) => {
    const [key, value] = Object.entries(data)[0] as [string, any]
    if (key === 'lang') {
      updateMenu(value)
    }
  })
}
