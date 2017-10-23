/**
 * Created by box on 2017/10/23.
 * use for test
 */
var fs = require('fs');
var path = require('path');
var parseXlsx = require('excel');

var filePath = 'C:/Users/sscf/Desktop/电影.xlsx';

parseXlsx(filePath, function(err, lines) {
    if(err) throw err;
    console.log(lines[2]);
});