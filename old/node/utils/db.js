/*
 * @Author: qiuziz
 * @Date: 2017-06-14 16:32:03
 * @Last Modified by: qiuziz
 * @Last Modified time: 2017-06-14 16:51:12
 */

var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://qiuziz:14360zhuQQ@localhost:27017/dish'; // 数据库为 dish
 
function connect(callback) {
    MongoClient.connect(DB_CONN_STR, function(err, db) {
        callback(err, db);
    });
}

module.exports = connect;
