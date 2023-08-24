
// preload with contextIsolation enabled
const { shell, contextBridge, ipcRenderer } = require('electron')




contextBridge.exposeInMainWorld('api', {

    // ---------------------------------
    // ② Rendererからのデータを受け取る処理
    testIpcMainProcess: (data) => {

        console.log("-------------------")
        console.log("② Rendererからのデータを受け取る処理")
        console.log("(preload script) RENDERER からきたデータはこちら　→ ", data)
        console.log("(preload script) これから、channel1 でMAINプロセスにもこのデータを送る")

        ipcRenderer.send('channel1', data)

    },

    doKeyUp: (event) => {

    },

})





// ④ MAINからくるデータを待つ処理
ipcRenderer.on("channel1-response", (event, args) => {

    console.log("-------------------")
    console.log("④ MAINプロセスからメッセージが来た")
    console.log("(preload script) MAINプロセスからきたデータは　→ ", args)


    const htmlView = document.querySelector('#html');
    htmlView.innerHTML = args;

})





