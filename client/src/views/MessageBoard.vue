<template>
    <div class="message-board">
        <div class="left">
            <board />
        </div>
        <div class="right">
            <div class="new">
                <div class="header">最新文章</div>
                <p v-for="(arti, i) in newList" class="msg" @click="toArti(arti._id)">
                    <span>
                        <span class="number">{{ i + 1 }}</span>
                        <span class="title">{{ arti.title }}</span>
                    </span>
                    <span class="views"
                        ><i class="el-icon-view"></i> {{ arti.views }}</span
                    >
                </p>
            </div>
            <div class="hot">
                <div class="header">浏览量排行榜</div>
                <p v-for="(arti, i) in hotList" class="msg" @click="toArti(arti._id)">
                    <span>
                        <span class="number">{{ i + 1 }}</span>
                        <span class="title">{{ arti.title }}</span>
                    </span>
                    <span class="views"
                        ><i class="el-icon-view"></i> {{ arti.views }}</span
                    >
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import board from "../components/Board";
import ArticleAjax from "../ajax/article.js";

export default {
    data() {
        return {
            hotList: [],
            newList: [],
            searchCondition: {
                key: "", //关键词
                page: 1, //当前页
                limit: 10, //每页文章数
            },
        };
    },
    components: {
        board,
    },
    methods: {
        async init() {
            const data = await ArticleAjax.findByPage(this.searchCondition);


            
            this.newList = data.data;
            // const result = await this.$ajax.get('/admin/article/hotList' "/admin/article/hotList")
            const result = await this.$ajax.get("/admin/article/hotList")
            console.log("热门", result.data.data)
            this.hotList = result.data.data;
            // console.log(this.tableData)
            // this.total = data.count;
        },
        toArti(articleId) {
            this.$router.push("/Detail/" + articleId)
        }
    },
    mounted() {
        this.init();
    },
};
</script>

<style scoped lang="scss">
.message-board {
    display: flex;
    width: 80%;
    justify-content: space-between;
    margin: 0 auto;
    padding: 3vh 0;
    .left {
        width: 60%;
        margin-right: 3vw;
    }
    .right {
        width: 30%;
        text-align: left;
        .new {
            margin-bottom: 6vh;
        }
        .header {
            font-size: 20px;
            font-weight: 500;
            height: 6vh;
            line-height: 6vh;
        }
        .msg {
            display: flex;
            font-weight: 400;
            align-items: center;
            justify-content: space-between;
            padding: 6px 8px;
            margin-bottom: 6px;
            border-radius: 2px;
            color: #666;
            width: 100%;
            user-select: none;
            background: #fff;
            box-shadow: 1px 1px 6px #ddd;

            &:hover {
                transform: translateY(-1px);
                cursor: pointer;
                font-weight: 500;
                color: #409eff;
                box-shadow: 1px 1px 8px #ddd;
            }

            .number {
                text-align: center;
                border-radius: 2px;
                margin-right: 1vw;
                // width: 2vh;
                // padding: 3px 8px;
                width: 22px;
                height: 22px;
                line-height: 22px;
                display: inline-block;
                text-align: center;
                // height: 2vh;
                // line-height: 2vh;
                // background: rgba(188, 99, 99, 0.9);
                background: rgba(114, 121, 221, 0.9);
                color: #fff;
                // &:first-of-type {
                //     background: rgba(114, 121, 221, 0.9);
                // }
                // &:nth-of-type(3) {
                //     background: rgba(99, 105, 188, 0.9);
                // }
            }
            .title {
                font-size: 16px;
                font-weight: 400;
            }
            .views {
                align-self: flex-end;
                color: gray;
            }
        }
    }
}
</style>
