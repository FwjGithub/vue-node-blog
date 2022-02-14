const dbutil = require("./DBUtil");

module.exports.blogMappingTag = function(tagId, blogId, ctime, utime, success){
    const sql = "insert into tag_blog_mapping (`tag_id`,`blog_id`,`ctime`,`utime`) values (?, ?, ?, ?)";
    const params = [tagId, blogId, ctime, utime];
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