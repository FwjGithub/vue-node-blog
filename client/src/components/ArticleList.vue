<template>
    <div class="article-container">
        <!-- <div class="article-header">
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
        <div class="article-main">
            <div class="article" v-for="(arti,i) in articleList" :key="arti._id" @click="handleClick(arti._id)">
                <el-avatar
                    class="arti-left"
                    shape="square"
                    :size="100"
                    fit="contain"
                    :src="arti.poster"
                ></el-avatar>
                <div class="arti-middle">
                    <div class="arti-title"> {{ arti.title }} </div>
                    <!-- <div class="arti-content"></div> -->
                    <div class="arti-tags">
                        <el-tag
                            v-for="(tag, i) in arti.tags"
                            :key="i"
                            :type="Math.random() > 0.5 ? 'success' : 'primary'"
                            >{{ tag }}</el-tag
                        >
                    </div>
                    <div class="arti-short el-icon-warning-outline">
                        内容已经发布一段时间，其描述的内容与事实可能有所差异
                    </div>
                </div>
                <div class="arti-right">
                    <div class="arti-date el-icon-time">{{ arti.uDate }}</div>
                    <div class="arti-view el-icon-view">
                        浏览：{{ arti.views }}
                    </div>
                </div>
            </div>
            <el-pagination
                :page-size="arti.limit"
                layout="prev, pager, next, jumper"
                :total="total"
                :current-page="arti.page"
                @current-change="cbChange"
                @prev-click="cbChange"
                @next-click="cbChange"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
import ArticleAjax from "../ajax/article.js";
export default {
    name: "ArticleList",
    props: {
        arti: {
            page: Number,
            limit: Number,
            total: Number,
            list: Array
        },
        cbChange: Function
    },
    data() {
        return {
            // articleList: [],
            // searchCondition: {
            //     key: "", //关键词
            //     page: 1, //当前页
            //     limit: 10, //每页文章数
            // },
            // total: 0,
        };
    },
    computed:{
        articleList: {
            get(){
                return this.arti.list
            },
            set(){
                return this.arti.list
            },
        },
        total: {
            get(){
                return this.arti.total
            },
            set(){
                return this.arti.total
            },
        },
        page: {
            get(){
                return this.arti.page
            },
            set(){
                return this.arti.page
            },
        },
        limit: {
            get(){
                return this.arti.limit
            },
            set(){
                return this.arti.limit
            },
        },
    },
    methods: {
        async init() {
            this.articleList = this.arti.list;
            this.total = this.arti.total
            this.page = this.arti.page
            this.limit = this.arti.limit
        },
        async handleClick(_id) {
            this.$router.push('/Detail/' + _id)
        }
        // async handleChange(cur) {
        //     this.cbChange(cur)
        // },
        // async searchArticle() {
        //     this.searchCondition.page = 1;
        //     const data = await ArticleAjax.findByPage(this.searchCondition);
        //     this.articleList = data.data;
        //     this.total = data.count;
        // },
    },
    mounted() {
        this.init();
    },
};
</script>

<style>
.article-container {
    text-align: left;
    display: flex;
    flex-direction: column;
    width: 100%;
    /* box-shadow: 2px 2px 10px #abc; */
    border-radius: 6px;
    /* overflow: hidden; */
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

.article-main {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 20px 38px;
    padding-left: 0;
    /* background: #ede; */
}
.el-pagination {
    /* background: #ede; */
    align-self: flex-end;
}
.article {
    display: flex;
    justify-content: space-around;
    padding: 10px;
    margin-bottom: 3vh;
    border-radius: 2px;
    background: rgba(222, 222, 222, 0.1);
    background: rgb(255, 255, 255);
    box-shadow: 1px 1px 6px #ddd;
    transition: all 0.3s;
}
.article:hover {
    cursor: pointer;
    transform: scale(1.01) translate(-2px, -2px);
    transition: all 0.3s;
    background: rgb(255, 255, 255);
    box-shadow: 2px 2px 8px #abc;
}
.arti-left,
.arti-right {
    width: 20%;
}
.arti-middle {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 60%;
}
.arti-title {
    font-size: 20px;
    font-weight: 500;
    margin-top: -2px;
    padding: 0;
}
.el-tag {
    margin-right: 10px;
}
.arti-short {
    font-size: 14px;
    color: gray;
}
.arti-right {
    font-size: 14px;
    color: gray;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
}
</style>
