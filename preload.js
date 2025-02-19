// exposes selected properties of Electron's process.versions object
// to the renderer process in a `versions` global variable.


const {contextBridge,ipcRenderer}  = require('electron');


// now, we can access DOM API.

let preloadDiv = document.createElement('div');

preloadDiv.innerText = 'preload script insert it';

// 这种方式没有啥用 ..
window.preloadDiv = preloadDiv;

// expose to renderer process
contextBridge.exposeInMainWorld('versions',{
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,

    // we can also expose variables, not just functions

    // add process.versions ??

    versions: () => process.versions,

    // add aaa text variable
    name: 'jasonj-electron-hello',

    // 现在包装了ipc...相关的调用在一个帮助器函数中, 而不是直接通过上下文桥接暴露`ipcRenderer` 模块.
    // 不应该通过预加载脚本直接暴露整个ipcRenderer 模块
    // 这导致能够让renderer 有能力发送任意的IPC 消息到主进程, 这将为恶意代码提供强有力的攻击载体/途径.


    // 当我们暴露了这个 处理器之后, 我们需要在主进程中设置 handle 监听器.
    ping: () => ipcRenderer.invoke('ping'),
    preloadDiv
});

// this script need attach to renderer process
// by webPreferences.preload options  with its(preload script) path

// see main.js



// At this point, the renderer has access to the versions global

// so let's display that information in the window.

 // see renderer.js







