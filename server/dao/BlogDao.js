const dbutil = require("./DBUtil");

function insertBlog(title, content, views, tags, ctime, utime, success){
    const sql = "insert into blog (`title`, `content`,`views`,`tags`,`ctime`,`utime`) values (?, ?, ?, ?, ?, ?)";
    const params = [title, content, views, tags, ctime, utime];
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

function queryBlogByPage(page, pageSize, success ){
    // const sql = "select * from blog order by id desc limit ?, ?";
    const sql = "select * from blog order by id desc limit ?, ?;";
    const params = [page * pageSize, pageSize];
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
function queryBlogCount(query, success){
    let sql = "select count(*) as count from blog order by id desc";
    let params = [];
    if(query.tag){
        // console.log("dtag:",query.tag);
        sql = "select count(*) as count from blog where tags like '%"+ query.tag +"%' order by id desc"
    }
    // console.log("daoparams:",params);
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
function queryBlogDetail(bid, success){
    const sql = "select * from blog where id = ?";
    const params = [+bid];
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
function addViewsByBlogId(blog_id, success){
    // console.log("dao:bid:", +blog_id);
    const sql = "update blog set `views` = views+1 where id = ?";
    const params = [+blog_id];
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
function queryHotBlog(size, success){
    const sql = "select * from blog order by views desc limit 0, ?";
    const params = [+size];
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
function queryAllBlog(success){
    const sql = "select * from blog order by id desc";
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
function queryBlogByTag(tag, page, pageSize, success){
    // const sql = "select * from blog order by id desc limit ?, ?";
    // console.log("tag:",tag);
    const sql = "select * from blog where tags like '%"+ tag +"%' order by id desc limit ?, ?;";
    // console.log("sql:",sql);
    const params = [page * pageSize, pageSize];
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
module.exports.insertBlog = insertBlog;
module.exports.queryBlogByPage = queryBlogByPage;
module.exports.queryBlogCount = queryBlogCount;
module.exports.queryBlogDetail = queryBlogDetail;
module.exports.addViewsByBlogId = addViewsByBlogId;
module.exports.queryHotBlog = queryHotBlog;
module.exports.queryAllBlog = queryAllBlog;
module.exports.queryBlogByTag = queryBlogByTag;

