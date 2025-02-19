// first one code base
// console.log('Hello from Electron 👋');

const { app,ipcMain, BrowserWindow } = require('electron');
const path = require("path");

// 如果需要更好的类型检查(在 typescript中), 可以导入主进程模块 .
// const {app,BrowserWindow} = require('electron/main')

// 可重用函数
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,

        // preload script, if unused, comment current line
        // it's an options
        webPreferences: {

            // --dirname 表示当前执行脚本的路径 字符串内容
            // path.join 连接多个路径碎片到一起,创建一个合并过的路径字符串 - 能够在所有平台上工作。
            preload: path.join(__dirname,'preload.js')
        }
    })

    win.loadFile('index.html').then();
    // 也可以加载URL
    // win.loadURL().then();
}

// 当应用准备好了之后开始调用 函数
// app.whenReady().then(() => {
//     createWindow()
// })

// whenReady 是一个特定的ready 事件的帮助器, 用来避免不易发现的陷阱。
app.on('ready',() => {

    // 处理监听器
    // 现在我们的发送者和接受者都已经配置好了
    // 我们现在可以通过`ping` 管道发送信息 ..
    // 从 renderer 到 main process
    ipcMain.handle('ping',() => 'pong')

    createWindow();
    // app.on('activate', () => {
    //     // 当没有窗口的时候应该这样 ..
    //     if (BrowserWindow.getAllWindows().length === 0) createWindow()
    // })
});


// 所有窗口关闭之后(通常情况下,macOs 在所有窗口关闭之后应该继续运行,所以如果不加这个监听,则关闭窗口则退出了应用程序)
// 所以这就是说的在不同平台上 窗口行为表现不同。
// app.on('window-all-closed',() => {
//     if (process.platform !== 'darwin') {
//         // 立即退出 ..
//         app.quit();
//     }
// })
