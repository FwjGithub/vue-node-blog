const dbutil = require("./DBUtil");

function insertTags(tag, ctime, utime, success){
    const sql = "insert into tags (`tag`, `ctime`, `utime`) values (?, ?, ?)";
    const params = [tag, ctime, utime];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, params, function(error, result){
        if(error == null){
            success(result);
        }else{
            console.log(error);
            success("请求失败");
        }
    });
    connection.end();
}

function queryTag(tag, success){
    const sql = "select * from tags where tag = ?";
    const params = [tag];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, params, function(error, result){
        if(error == null){
            success(result);
        }else{
            console.log(error);
            success("请求失败");
        }
    });
    connection.end();
}
function queryRandomTags(success){
    const sql = "select * from tags";
    const params = [];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, params, function(error, result){
        // console.log("tagsResult:", result);
        result.sort(function(){
            return Math.random() - 0.5;
        });
        // console.log("random之后:", result);
        if(error == null){
            success(result);
        }else{
            console.log(error);
            success("请求失败");
        }
    });
    connection.end();
}
module.exports.insertTags = insertTags;
module.exports.queryTag = queryTag;
module.exports.queryRandomTags = queryRandomTags;

