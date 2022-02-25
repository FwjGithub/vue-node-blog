<template>
    <div class="home">
        <el-image class="bgpic" src="/pic/bgpic1.jpg"></el-image>
        <div class="content">
            <!-- <div class="article-container">
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
                </div> -->
            <div class="article-part">
                <article-list></article-list>
            </div>
            <!-- </div> -->

            <div class="author-part"><author-msg></author-msg></div>
        </div>
    </div>
</template>

<script>
import ArticleList from "../components/ArticleList";
import AuthorMsg from "../components/AuthorMsg";
export default {
    name: "Home",
    data() {
        return {
            bgPic: "",
        };
    },
    methods: {
        async init() {
            // const {data} = await this.$ajax.get("/pic/bgpic1.jpg")
            // console.log(data)
            // this.bgPic = data
        },
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
.article-part {
    width: 70%;
}
.author-part {
    width: 30%;
}
</style>
