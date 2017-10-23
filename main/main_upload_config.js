/**
 * Created by box on 2017/10/23.
 * 主进程 上传配置
 */
const path = require('path')
const electron = require('electron')
const ipc = electron.ipcMain;

ipc.on('upload_config', function (event, filePath) {
    // dosomething
    read_config_file(filePath);
    event.sender.send('upload_finish');
});

ipc.on('select_config', function(event, filePath){
    console.log("aaa", filePath);
});

// 读取配置文件
function read_config_file(filePath){
    
}