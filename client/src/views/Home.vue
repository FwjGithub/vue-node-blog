<template>
    <div class="home">
        <el-image class="bgpic" src="/pic/bgpic1.jpg"></el-image>
        <div class="content">
            <div class="articlePart"><article-list></article-list></div>
            <div class="userPart">作者部分</div>
        </div>
    </div>
</template>

<script>
import ArticleList from '../components/ArticleList'
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
        ArticleList
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
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    width: 80vw;
    min-height: 110vh;
    justify-content: space-between;
    transform: translateY(-12vh);
    opacity: 0.9;
}
.articlePart {
    width: 70%;
}
.userPart {
    width: 30%;
    background: #eee;
}
</style>
