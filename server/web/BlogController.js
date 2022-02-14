const blogDao = require("../dao/BlogDao");
const tagsDao = require("../dao/TagsDao");
const tagBlogMappingDao = require("../dao/TagBlogMappingDao");
const timeUtil = require("../util/TimeUtil");
const formatRes = require("../util/FormatRes");
const midWaresMap = new Map();
const URL = require("url");
const QUERYSTRING = require("querystring");
midWaresMap.set("/editBlog" , function(req, resp){
    const query = QUERYSTRING.parse(URL.parse(req.url).query);
    // console.log(query);
    const title = query.title;
    let tags = query.tags;
    req.on("data", function(data){
        console.log("getNow执行结果：",timeUtil.getNow());
        blogDao.insertBlog(title, data, 0, tags, timeUtil.getNow(), timeUtil.getNow(), function(result){
            // console.log(result);
            resp.writeHead("200");
            resp.write(formatRes("success", "添加博客成功", result));
            resp.end();
            tags = tags.replace(/，| /g,",").split(",");
            const blogId = result.insertId;
            // console.log("blogId:",blogId);
            for(let i = 0; i < tags.length; i++){
                queryTag(tags[i], blogId);
            }

        });
        
    });
});

function queryTag(tag, blogId){
    tagsDao.queryTag(tag, function(result){
        //查不到证明没插入过
        if(result.length == 0 || result == null){
            insertTag(tag, blogId);
        }else{
            // console.log("queryTag的结果：",result[0]);
            const tagId = result[0].id;
            // console.log("插入过的tagId", tagId);
            blogMappingTag(tagId, blogId);
        }
    })
}
function insertTag(tag, blogId){
    tagsDao.insertTags(tag, timeUtil.getNow(), timeUtil.getNow(), function(result){
        // console.log("insertTags结果", result);
        // resp.writeHead("200");
        // resp.write(formatRes("success", "添加标签成功", null));
        // resp.end();
        const tagId = result.insertId;
        // console.log("没插入过的tagId", tagId);
        blogMappingTag(tagId, blogId);
    })
}
function blogMappingTag(tagId, blogId){
    tagBlogMappingDao.blogMappingTag(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(), function(result){
        console.log("blogMappingTag结果：", result);
    })
}

midWaresMap.set("/queryBlogByPage", function(req, resp){
    const query = QUERYSTRING.parse(URL.parse(req.url).query);
    // console.log(query);
    const page = +query.page;
    const pageSize = +query.pageSize;
    // console.log(page, pageSize);
    blogDao.queryBlogByPage(page, pageSize, function(result){
        // console.log("按页查询的结果:",result);
        // for (const [index, obj] in result) {
        //     obj[index].content = obj[index].content.replace(/<[\w\W]{1,5}>/g,"");
        // }
        for(let i = 0; i < result.length; i++){
            //过滤掉标签
            result[i].content = result[i].content.replace(/<\/?[A-Za-z]+[^>]*>/g, "")
            //设置content的最大长度
            result[i].content = result[i].content.substring(0, 300);


        }
        resp.writeHead(200);
        resp.write(formatRes("success", "查询成功", result));
        resp.end();
    }); 
});

midWaresMap.set("/queryBlogCount", function(req, resp){
    const query = URL.parse(req.url, true).query;
    
    blogDao.queryBlogCount(query, function(result){
        resp.writeHead(200);
        resp.write(formatRes("success", "查询成功", result));
        resp.end();
    })
});

midWaresMap.set("/queryBlogDetail", function(req, resp){
    let params = URL.parse(req.url).query;
    // console.log("参数字符串：",params);
    params = params.indexOf("=") != -1 ? params.split("&") : "没传id";
    // console.log("参数数组：",params);
    let bid = -1;
    for (let i = 0; i < params.length; i++) {
        if(params[i].split("=")[0] == "bid"){
            bid = params[i].split("=")[1]
        }
    }
    blogDao.queryBlogDetail(bid, function(result){
        blogDao.addViewsByBlogId(bid,function(result){
            if(result){
                console.log(bid + "views加一成功");
            }
        })
        resp.writeHead(200);
        resp.write(formatRes("success", "查询成功", result));
        resp.end();
    })
})
midWaresMap.set("/addViewsByBlogId", function(req, resp){
    const query = URL.parse(req.url, true).query;

    const bid = +query.bid;
    blogDao.addViewsByBlogId(bid,function(result){
        resp.writeHead(200);
        resp.write(formatRes("success", "查询成功", result));
        resp.end();
    })
});
midWaresMap.set("/queryHotBlog", function(req, resp){
    // const query = QUERYSTRING.parse(URL.parse(req.url).query);
    const query = URL.parse(req.url, true).query;

    // console.log("query:", query);
    const size = +query.size;
    // console.log("size:", size);
    blogDao.queryHotBlog(size, function(result){
        resp.writeHead(200);
        resp.write(formatRes("success", "查询成功", result));
        resp.end();
    })
});
midWaresMap.set("/queryAllBlog", function(req, resp){
    blogDao.queryAllBlog(function(result){
        resp.writeHead(200);
        resp.write(formatRes("success", "查询成功", result));
        resp.end();
    })
});
midWaresMap.set("/queryBlogByTag", function(req, resp){
    const query = URL.parse(req.url ,true).query;
    // console.log(query);
    const page = +query.page;
    const pageSize = +query.pageSize;
    const tag = query.tag;
    // console.log("ctag:",tag);
    // console.log(page, pageSize);
    blogDao.queryBlogByTag(tag, page, pageSize, function(result){
        // console.log("按页查询的结果:",result);
        // for (const [index, obj] in result) {
        //     obj[index].content = obj[index].content.replace(/<[\w\W]{1,5}>/g,"");
        // }
        for(let i = 0; i < result.length; i++){
            //过滤掉标签
            result[i].content = result[i].content.replace(/<\/?[A-Za-z]+[^>]*>/g, "")
            //设置content的最大长度
            result[i].content = result[i].content.substring(0, 300);


        }
        resp.writeHead(200);
        resp.write(formatRes("success", "查询成功", result));
        resp.end();
    }); 
});

module.exports = midWaresMap;