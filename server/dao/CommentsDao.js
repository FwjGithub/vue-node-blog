const dbutil = require("./DBUtil");

function insertComment(blog_id, parent, parent_name, user_name, email, comments, ctime, utime, success){
    const sql = "insert into comments (`blog_id`, `parent`, `parent_name`, `user_name`, `email`, `comments`, `ctime`, `utime`) values (?, ?, ?, ?, ?, ?, ?, ?)";
    const params = [blog_id, parent, parent_name, user_name, email, comments, ctime, utime];
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
function queryCommentByBlogId(bid, success){
    const sql = "select * from comments where blog_id = ?";
    const params = [bid];
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
function queryNewComment(size, success){
    const sql = "select * from comments order by ctime desc limit 0, ?";
    const params = [size];
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
module.exports.insertComment = insertComment;
module.exports.queryCommentByBlogId = queryCommentByBlogId;
module.exports.queryNewComment = queryNewComment;
