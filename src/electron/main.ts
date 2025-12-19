import { app, BrowserWindow } from 'electron';
import path from 'path';
import { isDev } from './utils';

app.on('ready', () => {
  const mainWindow = new BrowserWindow({});
  if (isDev()) {
    mainWindow.loadURL('http://localhost:4200');
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), '/dist-angular/browser/index.html'));
  }
});
