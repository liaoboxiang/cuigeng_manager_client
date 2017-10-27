/**
 * Created by box on 2017/10/23.
 * 主进程 上传配置
 */
const electron = require('electron');
const dialog = electron.dialog;
const ipc = electron.ipcMain;
var XLSX = require('xlsx');
var request = require('request');
var config = require('../config/config.js');

ipc.on('upload_config', function (event) {
    dialog.showOpenDialog({
        properties: [
            'openFile',
        ]
    },function(res){
        var filePath = res[0];
        read_config_file(filePath, function(err, data){
            if(err){
                event.sender.send('upload_finish', err);
            }else{
                upload_to_server(data, function(err){
                    if(err){
                        console.error("upload error:", err);
                        event.sender.send('upload_finish', err);
                    }else {
                        event.sender.send('upload_finish');
                    }
                });

            }
        });
    });
});

// 读取配置文件
function read_config_file(filePath, cb){
    var books = [];
    var workbook = XLSX.readFile(filePath);
    for(var sheet in workbook.Sheets){
        if (workbook.Sheets[sheet]['!ref']) {
            books.push({
                name:sheet,
                datas:XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
            });
        }
    };
    cb(null, books);
};

// 上传服务器
function upload_to_server(data, cb){
    var ip = config.get('server_ip');
    var port = config.get('port');
    var opt = {
        url:"http://" + ip + ":" + port + "/upload_config",
        method:"GET",
        qs:{data:data}
    }
    console.log(opt);
    request(opt, function(error, response, body){
        cb(error);
    })
}