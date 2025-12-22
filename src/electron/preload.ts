import { contextBridge, ipcRenderer } from 'electron';
import { NewSet } from './features/sets/sets.types';

contextBridge.exposeInMainWorld('api', {
  locations: {
    list: () => ipcRenderer.invoke('locations:list'),
    add: (name: string) => ipcRenderer.invoke('locations:add', name),
    remove: (id: number) => ipcRenderer.invoke('locations:remove', id),
  },
  sets: {
    list: () => ipcRenderer.invoke('sets:list'),
    add: (set: NewSet) => ipcRenderer.invoke('sets:add', set),
  },
});
