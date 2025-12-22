import { registerLocationsIpc } from './locations.ipc';
import { registerSetsIpc } from './sets.ipc';

export function registerIpc() {
  registerLocationsIpc();
  registerSetsIpc();
}
