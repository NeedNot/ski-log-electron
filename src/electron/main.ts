import { app, BrowserWindow } from 'electron';
import path from 'path';
import { isDev } from './utils';
import { initDB } from './db';
import { registerIpc } from './ipc';

app.on('ready', () => {
  const dbPath = path.join(app.getPath('appData'), 'database.db');
  initDB(dbPath);
  registerIpc();

  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  if (isDev()) {
    mainWindow.loadURL('http://localhost:4200');
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), '/dist-angular/browser/index.html'));
  }
});
