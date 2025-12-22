import { ipcMain } from 'electron';
import * as service from '../features/locations/locations.service';

export function registerLocationsIpc() {
  ipcMain.handle('locations:list', () => service.listLocations());
  ipcMain.handle('locations:add', (_, name) => service.createLocation(name));
  ipcMain.handle('locations:remove', (_, id) => service.deleteLocation(id));
}
