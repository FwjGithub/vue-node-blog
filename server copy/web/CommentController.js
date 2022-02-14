const commentsDao = require("../dao/CommentsDao");
const timeUtil = require("../util/TimeUtil");
const formatRes = require("../util/FormatRes");
const midWaresMap = new Map();
const URL = require("url");
const QUERYSTRING = require("querystring");
const svgCaptcha = require('svg-captcha');

midWaresMap.set("/addComment", function(req, resp){
    req.on("data", function(data){

        console.log("监听data:",JSON.parse(data.toString()));
        data = JSON.parse(data.toString());
        commentsDao.insertComment(data.bid, data.parent, data.parentName, data.userName, data.email, data.comments, timeUtil.getNow(), timeUtil.getNow(), function(result){
            // console.log(result);
            resp.writeHead("200");
            resp.write(formatRes("success", "添加评论成功", result));
            resp.end();
            
        });
    });
})


midWaresMap.set("/queryCommentByBlogId", function(req, resp){
    
    const query = QUERYSTRING.parse(URL.parse(req.url).query);
    // console.log(query);
    const bid = +query.bid;

    commentsDao.queryCommentByBlogId(bid, function(result){
        resp.writeHead(200);
        resp.write(formatRes("success", "查询成功", result));
        resp.end();
    })

});

midWaresMap.set("/queryNewComment", function(req, resp){
    
    const query = URL.parse(req.url, true).query;
    // console.log(query);
    const size = +query.size;

    commentsDao.queryNewComment(size, function(result){
        resp.writeHead(200);
        resp.write(formatRes("success", "查询成功", result));
        resp.end();
    })

});
midWaresMap.set("/captcha", function (req, resp) {
    var captcha = svgCaptcha.create();
    // req.session.captcha = captcha.text;
    resp.writeHead(200);
    resp.write(formatRes("success", "查询成功", captcha));
    resp.end();
})
module.exports = midWaresMap;