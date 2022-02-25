<template>
    <div class="author-container">
        <div class="author-msg">
            <el-avatar
                shape="circle"
                :size="100"
                fit="cover"
                src="/pic/authorAvator.jfif"
            ></el-avatar>
            <div class="author-name">辣椒炒肉</div>
            <div class="author-motto">努力努力再努力</div>
        </div>
        <div class="tags-choose">
            <div class="tags-titles">
                <i class="el-icon-price-tag"></i>
                <span>标签云</span>
            </div>
            <div class="tags-list">
                <el-tag v-for="tag in tags" class="tag" type="plain" @click="handleTagChoose(tag)">{{
                    tag
                }}</el-tag> 
            </div>
        </div>
        <div class="calendar">
            <div class="tags-titles">
                <i class="el-icon-date"></i>
                <span>日历表</span>
            </div>
            <el-calendar v-model="calendar"> </el-calendar>
        </div>
    </div>
</template>

<script>
import ArticleAjax from "../ajax/article.js";
export default {
    name: "AuthorMsg",
    data() {
        return {
            searchCondition: {
                key: "", //关键词
                page: 1, //当前页
                limit: 10, //每页文章数
            },
            tags: [
                "知识",
                "test",
                "js",
                "html",
                "css",
                "知识",
                "test",
                "js",
                "html",
                "css",
                "知识",
                "test",
                "js",
                "html",
                "css",
                "知识",
                "test",
                "js",
                "html",
                "css",
            ],
            total: 0,
            calendar: new Date(),
        };
    },
    methods: {
        async init() {},
        async handleChange() {},
        async searchArticle() {},
        async handleTagChoose() {
            
        }
    },
    mounted() {
        this.init();
    },
};
</script>

<style>
.author-container {
    /* margin-left: 2vw; */
    width: 100%;
}
.author-msg {
    margin-bottom: 6vh;
}
.author-name {
    font-size: 18px;
    font-weight: 400;
    margin: 1vh 0;
}
.author-motto {
    font-size: 16px;
    font-weight: 300;
}
.tags-choose {
    min-height: 24vh;
    width: 24vw;
    text-align: left;
    padding: 6vh 0;
    border-bottom: 1px dotted rgba(63, 46, 46, 0.2);
    border-top: 1px dotted rgba(63, 46, 46, 0.2);
}
.tags-titles, .calendar {
    font-size: 18px;
    margin-bottom: 1vh;
}
.el-icon-price-tag {
    margin-right: 1vw;
    display: inline-block;
    transform: rotate(-45deg);
}
.tags-list {
    height: 100%;
    /* justify-content: flex-start; */
}
.tag {
    margin-right: 1vh;
    margin-top: 1vh;
}
.tag:hover {
    cursor: pointer;
    transform: scale(1.05);
}
.calendar {
    padding: 3vh 0;
    text-align: left;
}
.el-icon-date{
    margin-right: 1vw;
    margin-bottom: 1vh;
}
.el-calendar-table{
    text-align: center;
} 
.el-calendar-day{
    text-align: center;
    height: 38px !important;
}
</style>
