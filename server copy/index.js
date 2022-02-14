const express = require("express");
const app = new express();
const globalConfig = require("./config");
const loader = require('./loader');
// const svgCaptcha = require('svg-captcha');

app.use(express.static("./page/"));

app.post("/editEveryDay", loader.get("/editEveryDay"));
app.get("/queryEveryDay", loader.get("/queryEveryDay"));

app.post("/editBlog", loader.get("/editBlog"));
app.get("/queryBlogByPage", loader.get("/queryBlogByPage"));
app.get("/queryBlogCount", loader.get("/queryBlogCount"));
app.get("/queryBlogDetail", loader.get("/queryBlogDetail"));
app.get("/addViewsByBlogId", loader.get("/addViewsByBlogId"));


app.post("/addComment", loader.get("/addComment"));
app.get("/queryCommentByBlogId", loader.get("/queryCommentByBlogId"));
 
app.get('/captcha', loader.get("/captcha"));

app.get("/queryHotBlog", loader.get("/queryHotBlog"));
app.get("/queryAllBlog", loader.get("/queryAllBlog"));

app.get("/queryNewComment", loader.get("/queryNewComment"));

app.get("/queryRandomTags", loader.get("/queryRandomTags"));
app.get("/queryBlogByTag", loader.get("/queryBlogByTag"));

app.listen(globalConfig.port, ()=>{
    console.log(`服务器已开启，监听${globalConfig.port}`);
})