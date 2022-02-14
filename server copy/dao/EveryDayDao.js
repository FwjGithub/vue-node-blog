const dbutil = require("./DBUtil");

function insertEveryDay(content, ctime, success){
    const sql = "insert into every_day (`content`, `ctime`) values (?, ?)";
    const params = [content, ctime];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, params, function(error, result){
        if(error == null){
            success(result);
        }else{
            console.log(error);
            success("请求失败");
        }
    })
    connection.end();
}
function queryEveryDay(success){
    const sql = "select * from every_day order by id desc limit 1;";
    const params = [];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, params, function(error, result){
        if(error == null){
            success(result);
        }else{
            console.log(error);
            // success("请求失败");
        }
    })
    connection.end();
}

module.exports.insertEveryDay = insertEveryDay;
module.exports.queryEveryDay = queryEveryDay;