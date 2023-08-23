const {
    app,
    BrowserWindow,
    ipcMain
} = require('electron');

const fs = require('fs');
const path = require('path')

const marked = require('marked')



// ----------------------------------------
// remoteモジュールをrenderer プロセスで使用する
// https://stackoverflow.com/questions/69233435/uncaught-error-electron-remote-is-disabled-for-this-webcontents 
//
// const remote = require("@electron/remote");
// const wnd = remote.getCurrentWindow();
// document.querySelector("h1").onclick = () => {
//      wnd.close()
// }

const remote = require('@electron/remote/main')
remote.initialize()





let g_window;







// ③ preloadスクリプトから（Renderer側から）くるメッセージを待つ
ipcMain.on("channel1", (event, args) => {

    console.log("-------------------")
    console.log("③ preloadスクリプトからメッセージが来た")
    console.log("(main process) 送られたデータは　→ ", args)
    console.log("(main process) また、MAINからも　RENDERER側に返信をする")

    //event.sender.send('channel1-response', "(MAINプロセスからの返信) ちゃんと受け取りました!!!!")
    event.sender.send('channel1-response', marked.marked(args) )

});




app.whenReady().then( () => {

    createWindow()

})



const createWindow = () => {


    g_window = new BrowserWindow({
        // show: false,
        width: 800,
        height: 600,
        webPreferences: {

            //sandbox: true,
            nodeIntegration: false,
                 
            // // index.htmlでrequireを使用する際、requireがない！と出た時必要な設定
            // // だが、これはElectronアプリケーションのセキュリティを脅かすことだ。
            // // これをFalseにせず、「Preload機能」を使用して必要な機能を揃えるべきだ。
            // contextIsolation: true,   

            enableRemoteModule: true,

            preload: path.join(__dirname, 'preload.js')
        },
    });





    // remoteモジュールの対策
    // https://stackoverflow.com/questions/69233435/uncaught-error-electron-remote-is-disabled-for-this-webcontents
    require('@electron/remote/main').enable(g_window.webContents)

    g_window.loadFile(__dirname + '/index.html');



    g_window.webContents.openDevTools();




    g_window.on('close', (event) => {

        console.log("WINDOWを閉じています...")

    });



    g_window.on('closed', () => {

        console.log("WINDOWが閉じられました")

    });



    // ------------------------------------------------
    // アプリに対して：WINDOWを閉じたらの処理
    // MACでは、WINDOWを閉じただけではアプリが閉じられない。
    // 
    // Quit the app when all windows are closed (Windows & Linux)
    // On Windows and Linux, exiting all windows generally quits an 
    // application entirely.
    app.on('window-all-closed', () => {

      if (process.platform !== 'darwin') app.quit()

    })




};








exports.createWindow = createWindow;


