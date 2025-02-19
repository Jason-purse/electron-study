# first app

## 加载一个web页面到浏览器窗口

在electron 中,每一个窗口可以显示一个来自本地html文件或者远程web地址的web页面。

例如, 你能够加载本地文件。


## 模块导入规则

1. 模块导入遵循每个单词首字母大写驼峰(PascalCase) , 这种模块导出的是构造器，可以实例化。
2. 模块导入遵循驼峰命名(camelCase), 这种模块导出的元素无法实例化。(app,webContents,ipcRenderer)
3. 如果在ts中,需要更强的类型提示,从特定的子目录中导出(这其中包含了各部分的类型定义)
4. ES 模块导入在Electron 28开始支持

## Node 特性
1. Electron中的大多数核心模块都是事件发射器,因为Node.js 是基于异步事件驱动的架构。
## 窗口特性

1. 在各个平台上,窗口表现都不相同,electron 让您在代码中进行必要的行为展示,根据监听应用程序和浏览器模块发出来的事件实现基本的窗口约定。
2. 平台

    只有三种平台 win32 (Windows), linux (Linux), and darwin (macOS)

    平台可以通过`process.platform` 变量来判断属于哪个平台。

## 所有窗口关闭之后退出应用(windows & linux)

首先监听`window-all-closed` 事件, 然后调用`app.quit()` 方法退出应用 - 如果用户不在`macOS` 平台上。


## 如果没有任何窗口打开,则打开一个窗口(macOS)

macOS 通常会继续运行 - 如果没有任何窗口关闭 ..

激活app的时候如果没有窗口,则应该打开一个新的。

我们仅需要监听`app` 模块的`activate` 事件, 然后调用存在的`createWindow()` 方法即可,如果没有`BrowserWindows` 打开。

> 因为窗口不能在`ready` 事件前创建,所以我们仅应该在app 初始化之后监听。

```js
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
```


## 可选的: 从VS code 中调试

如果需要从VS code 调试,则需要依附VSCode 代码到 主、渲染进程上。

下面是一个简单的配置,  创建一个`launch.json` 配置到`.vscode` 目录中(位于你项目中)
```json
{
  "version": "0.2.0",
  "compounds": [
    {
      "name": "Main + renderer",
      "configurations": ["Main", "Renderer"],
      "stopAll": true
    }
  ],
  "configurations": [
    {
      "name": "Renderer",
      "port": 9222,
      "request": "attach",
      "type": "chrome",
      "webRoot": "${workspaceFolder}"
    },
    {
      "name": "Main",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron",
      "windows": {
        "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron.cmd"
      },
      "args": [".", "--remote-debugging-port=9222"],
      "outputCapture": "std",
      "console": "integratedTerminal"
    }
  ]
}
```
当你在侧边栏中选择 `Run and Debug`的时候将会出现`Main + renderer` 选项, 允许你设置断点并且检查同时在`main` 和 `renderer` 进程中的所有变量和执行其他操作。

在这个文件中有3个配置:

1. `Main` 被用来启动主进程, 然后暴露了9222端口用来远程调试 ,这个端口用来附加`Render` 的调试器,因为主进程是`Node.js` 进程,所以类型设置为`node` ..
2. `Render`被用来调试`render` 进程, 因为这个是主进程创建的一个进程, 我们要依附到它(所以是`request: attach` ) 而不是创建一个新的,此渲染进程是一个web 进程,
因此调试器我们需要使用`chrome`.
3. `Main + renderer` 是一个混合任务, 能够同时执行之前的任务。

> 注意: 因为我们在`Renderer` 中依附到一个进程, 代码中的第一行则有可能跳过, 因为debugger 可能还没有足够的时间去连接到`main` 进程(在代码执行前),
> 你能够解决这个问题 - 通过刷新这个页面,或者设置一个合理的超时(在开发环境中执行代码时 - 在执行真正代码之前).
























































