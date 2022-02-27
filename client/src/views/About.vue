<template>
    <div class="about-container">
        <div class="about-left">
            <div class="about-author">
                <el-avatar
                    shape="circle"
                    :size="100"
                    fit="cover"
                    src="/pic/authorAvator.jfif"
                ></el-avatar>
                <div class="about-author-name">辣椒炒肉</div>
                <div class="about-author-motto">努力努力再努力</div>
            </div>
            <div class="about-calendar">
                <el-calendar v-model="calendar"> </el-calendar>
            </div>
        </div>
        <div class="about-right">
            <div class="about-detail">
                <h2>关于博主</h2>
                <el-divider></el-divider>
                <p>昵称：辣椒炒肉</p>
                <p>学业概况：目前大四在读</p>
                <p>职业方向：前端工程师</p>
                <p>技术栈：Vue、React、Node</p>
                <p>爱好：音乐、乐器、游泳、跑步...</p>
                <p>座右铭：脚踏实地谋发展，努力努力再努力</p>
                <p>github地址：<el-link type="primary" href="https://github.com/FwjGithub/">辣椒炒肉的github</el-link></p>
                <p>邮箱地址：2855978252@qq.com</p>
            </div>
            <div class="about-detail">
                <h2>关于此博客</h2>
                <el-divider></el-divider>
                <p>博客概述：由Vue、Node.js编写，包括博客前台页面和后台管理系统，具体分为文章模块、标签模块、用户模块、评论模块等</p>
                <p>前端部分：前台和后台的界面，均使用Vue、ElementUI完成页面的编写完成</p>
                <p>后端部分：使用Node.js、typescript、express框架、mongoDB数据库完成</p>
                <p>源代码地址地址：<el-link type="primary" href="https://github.com/FwjGithub/vue-node-blog">个人博客github</el-link></p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            calendar: new Date()
        }
    },
};
</script>

<style>
.about-container {
    width: 80vw;
    margin: 0 auto;
    padding: 6vh;
    display: flex;
    
}
.about-left{
    width: 32%;
}
.about-author {
    margin-bottom: 3vh;
    padding-bottom: 6vh;
    border-bottom: 1px dotted rgba(200, 200, 200, .5)
}
.about-author-name {
    font-size: 22px;
    font-weight: 400;
    margin: 1vh 0;
}
.about-author-motto {
    font-size: 20px;
    font-weight: 300;
}

.about-right {
    width: 68%;
    
    margin-left: 6vh;
}
.about-detail {
    background-color: #fff;
    margin-bottom: 6vh;
    padding: 3vh 6vh;
    text-align: left;
    font-size: 16px;
    font-weight: 400;
    border-radius: 2px;
}
.about-detail h2{
    margin: 0;
}
.about-detail p{
    /* height: 5vh; */
    line-height: 5vh;
}
</style>
