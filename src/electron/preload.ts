import { contextBridge, ipcRenderer } from 'electron';
import { NewSet } from './db/types';

contextBridge.exposeInMainWorld('api', {
  locations: {
    list: () => ipcRenderer.invoke('locations:list'),
    add: (name: string) => ipcRenderer.invoke('locations:add', name),
    remove: (id: number) => ipcRenderer.invoke('locations:remove', id),
  },
  sets: {
    list: (params: { start: string; end: string }) => ipcRenderer.invoke('sets:list', params),
    add: (set: NewSet) => ipcRenderer.invoke('sets:add', set),
  },
});
