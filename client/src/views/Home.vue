<template>
    <div class="home">
        <el-image class="bgpic" src="/pic/bgpic1.jpg"></el-image>
        <div class="content">
            <div class="article-container">
                <div class="article-header">
                    <h1>最新文章</h1>
                    <div>
                        <el-input
                            @change="searchArticle"
                            v-model="searchCondition.key"
                            prefix-icon="el-icon-search"
                            placeholder="输入关键词搜索"
                        ></el-input>
                    </div>
                </div>
                <div class="article-part">
                    <article-list
                        :arti="{
                            page: searchCondition.page,
                            limit: searchCondition.limit,
                            total,
                            list: articleList,
                        }"
                        :cbChange="handleChange"
                    ></article-list>
                </div>
            </div>

            <div class="author-part"><author-msg :cbChoose="handleChoose"></author-msg></div>
        </div>
    </div>
</template>

<script>
import ArticleList from "../components/ArticleList";
import AuthorMsg from "../components/AuthorMsg";
import ArticleAjax from "../ajax/article.js";

export default {
    name: "Home",
    data() {
        return {
            bgPic: "",
            searchCondition: {
                key: "", //关键词
                page: 1, //当前页
                limit: 10, //每页文章数
            },
            articleList: [],
            total: 0,
        };
    },
    methods: {
        async init() {
            const data = await ArticleAjax.findByPage(this.searchCondition);
            this.articleList = data.data;
            // console.log(this.tableData)
            this.total = data.count;
        },
        async searchArticle() {
            this.searchCondition.page = 1;
            const data = await ArticleAjax.findByPage(this.searchCondition);
            this.articleList = data.data;
            this.total = data.count;
        },
        async handleChange(cur) {
            // console.log("改变页数", cur)
            this.searchCondition.page = cur;
            const data = await ArticleAjax.findByPage(this.searchCondition);

            this.articleList = data.data;
            // console.log(this.tableData)
            this.total = data.count;
        },
        async handleChoose(tag) {
            this.searchCondition.page = 1;
            this.searchCondition.key = tag === "不分类" ? "" : tag;
            const data = await ArticleAjax.findByPage(this.searchCondition);

            this.articleList = data.data;
            // console.log(this.tableData)
            this.total = data.count;
        }
    },
    components: {
        ArticleList,
        AuthorMsg,
    },
    mounted() {
        this.init();
    },
};
</script>

<style>
.home {
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
}
.bgpic {
    /* margin-top: 3px; */
    width: 100%;
    height: 70vh;
}
.content {
    /* background: #eee;
    box-shadow: 2px 2px 10px #abc; */

    margin: 5vh 0;
    border-radius: 2px;
    /* overflow: hidden; */
    display: flex;
    width: 80vw;
    border: 1px;
    min-height: 110vh;

    justify-content: space-between;
    /* transform: translateY(-12vh); */
    /* opacity: 0.9; */
}
.article-header {
    font-size: 18px;
    display: flex;
    height: 12vh;
    line-height: 12vh;
    box-sizing: border-box;
    padding-right: 38px;
    justify-content: space-between;
    /* background: rgba(255, 255, 255, 0.3); */
}
.article-part {
    width: 100%;
}

.author-part {
    width: 30%;
}
</style>
