/**
 * Created by box on 2017/10/23.
 * use for test
 */
var fs = require('fs');
var path = require('path');
var parseXlsx = require('excel');
var XLSX = require('xlsx');
var request = require('request');
var config = require('./config.json');

var filePath = 'C:/Users/sscf/Desktop/电影.xlsx';
//
//parseXlsx(filePath, function(err, lines) {
//    if(err) throw err;
//    console.log(lines);
//});

function read_config_file(filePath){
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
   return books;
};

function upload_to_server(data){
    var ip = "127.0.0.1";
    var port = config.port;
    var opt = {
        url:"http://" + ip + ":" + port + "/upload_config",
        method:"GET",
        qs:{data:data}
    };
    console.log(opt);
    request(opt, function(error, response, body){
        if(error){
            console.error("upload error", error);
        }else{
            console.log(body);
        }
    })
}

var data = read_config_file(filePath);
upload_to_server(data);

//console.log(XLSX.utils.sheet_to_json(workbook.Sheets[0]));