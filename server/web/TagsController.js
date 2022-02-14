const tagBlogMappingDao = require("../dao/TagBlogMappingDao");
const tagsDao = require("../dao/TagsDao");
const timeUtil = require("../util/TimeUtil");
const formatRes = require("../util/FormatRes");
const midWaresMap = new Map();


midWaresMap.set("/queryRandomTags", function(req, resp){
    tagsDao.queryRandomTags(function(result){
        resp.writeHead(200);
        // console.log("查询到：",result[0].content);
        resp.write(formatRes("success", "查询成功", result));
        resp.end();
    })
});

module.exports = midWaresMap;