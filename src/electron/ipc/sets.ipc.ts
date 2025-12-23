import { ipcMain } from 'electron';
import * as service from '../features/sets/sets.service';

export function registerSetsIpc() {
  ipcMain.handle('sets:list', (_, params) => service.listSets(params));
  ipcMain.handle('sets:add', (_, set) => service.createSet(set));
}
