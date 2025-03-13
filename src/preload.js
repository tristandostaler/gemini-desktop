const { contextBridge, ipcRenderer } = require('electron');

ipcRenderer.on('toggle-visibility', (e, action) => {
    document.querySelector('.view').classList.toggle('close', !action);
});

contextBridge.exposeInMainWorld('electron', {
    getLocalStorage: a => ipcRenderer.invoke('get-local-storage', a),
    setLocalStorage: (a, b) => ipcRenderer.send('set-local-storage', a, b),
    close: () => ipcRenderer.send('close')
});
