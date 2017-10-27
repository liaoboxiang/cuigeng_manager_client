/**
 * Created by sscf on 2017/10/27.
 */
var fs = require('fs');
var path = require('path');

var filePath = path.join(__dirname, 'config.json');
console.log(filePath);

var binData = fs.readFileSync(filePath);
var data = JSON.parse(binData);

var config = module.exports;

config.get = function(key){
    return data[key];
}