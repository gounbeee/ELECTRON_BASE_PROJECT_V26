
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





// ----------------------------------------
// remoteモジュールをrenderer プロセスで使用する
// https://stackoverflow.com/questions/69233435/uncaught-error-electron-remote-is-disabled-for-this-webcontents 
//
// const remote = require("@electron/remote");
// const wnd = remote.getCurrentWindow();
// document.querySelector("h1").onclick = () => {
//      wnd.close()
// }

// const remote = require('@electron/remote')
// const currentWindow = remote.getCurrentWindow();




// const path = require('path');

// const marked = require('marked');








// const renderMarkdownToHTML = (markdown) => {

//     // -------------------------------------------------
//     // marked :: sanitize オプションはもはや使用されない!
//     // https://marked.js.org/#/USING_ADVANCED.md#options
//     // 
//     // htmlView.innerHTML = marked.marked(markdown, {
//     //     sanitize: true,
//     // });

//     

// };




// const updateUserInterface = (edited) => {


//     // edited indicates whether the document has unsaved changes
//     let title = 'Fire Sale';


//     if (filePath) {
//         // Updating the window title based on the current file
//         title = `${path.basename(filePath)} - ${title}`;
//     }


//     if (edited) {
//         title = `${title} (Edited)`;
//     }


//     currentWindow.setTitle(title);

    
//     // If edited, then updates the window accordingly
//     currentWindow.setDocumentEdited(edited);

    
//     // Enabling the Save and Revert buttons when there are unsaved changes
//     saveMarkdownButton.disabled = !edited;
//     revertButton.disabled = !edited;


// };





// const keyUpHandler = (event) => {

//     console.log("keyup EVENT OCCURED")
//     console.log(g_window)

//     renderMarkdownToHTML(event.target.value);

//     // Whenever the user inputs a keystroke into the Markdown view, checks to see
//     // if the current content matches the content that we stored in a variable
//     // and updates the UI accordingly.

//     updateUserInterface(originalContent !== event.target.value);

// }





// contextBridge.exposeInMainWorld('api', {

//     doSomething: () => {
//         console.log("doSomething FUNCTION EXECUTED")
//         ipcRenderer.send("doSomething")
//     },
//     doKeyUp: keyUpHandler,
// })





// const createNewWindow = () => {

//     let win = new BrowserWindow({
//         width: 1000,
//         height: 800,
//         webPreferences: {
//             nodeIntegration: true,
//             enableRemoteModule: true,
//             contextIsolation: true,
//             preload: path.join(__dirname, 'preload.js')
//         },
//     });

//     win.loadFile("index.html");

// }



