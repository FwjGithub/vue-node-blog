const everyDayDao = require("../dao/EveryDayDao");
const timeUtil = require("../util/TimeUtil");
const formatRes = require("../util/FormatRes");
const midWaresMap = new Map();


midWaresMap.set("/editEveryDay", function(req, resp){
    req.on("data" , function(data){
        // console.log(data.toString().trim(),timeUtil.getNow());
        everyDayDao.insertEveryDay(data.toString().trim(), timeUtil.getNow(), function(res){
            resp.writeHead(200);
            resp.write(formatRes("success","每日一句添加成功",null));
            resp.end();
        })
    })
})
midWaresMap.set("/queryEveryDay", function(req, resp){
    everyDayDao.queryEveryDay(function(result){
        resp.writeHead(200);
        // console.log("查询到：",result[0].content);
        resp.write(formatRes("success", "查询成功", result));
        resp.end();
    })
});

module.exports = midWaresMap;