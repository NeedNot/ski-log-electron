import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  locations: {
    list: () => ipcRenderer.invoke('locations:list'),
    add: (name: string) => ipcRenderer.invoke('locations:add', name),
    remove: (id: number) => ipcRenderer.invoke('locations:remove', id),
  },
});
