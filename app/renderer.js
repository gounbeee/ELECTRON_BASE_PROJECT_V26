

let filePath = null;
let originalContent = '';


const ipcTestBt = document.querySelector('#ipcTestBt');



// DOMオブジェクトのボタンを設定
ipcTestBt.addEventListener('click', (event) => {

    console.log("-------------------")
    console.log("① TEST を開始")
    console.log("(renderer process DOMオブジェクト) ボタンが押された！")

    // -------------
    // ① TEST を開始
    // tesIpcMainProcessは、preload スクリプトで定義されていて、RendererではAPIのみ見える

    // ## を文字列につけることで、この先、MAINプロセスでmarkedというNodeJS用機能で
    // <h2>としてHTML化してくる。
    window.api.testIpcMainProcess('## Rendererからのメッセージです')


});






