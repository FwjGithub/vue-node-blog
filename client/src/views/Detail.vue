<template>
    <div class="bg-container">
        <div class="detail-container">
            <el-page-header @back="goBack" content="详情页面"></el-page-header>

            <div class="detail-title">{{ articleObj.title }}</div>
            <mavon-editor
                v-model="articleObj.content"
                ref="md"
                :subfield="false"
                :toolbars="{ navigation: true, readmodel: true }"
                :edtiable="false"
                defaultOpen="preview"
                :navigation="true"
                class="md-editor"
                style="min-height: 700px; width: 100%"
            />
            <div class="detail-msg">
                <p><i class="el-icon-time"></i> {{ articleObj.uDate }}</p>
                <p>
                    <i class="el-icon-view"></i> 浏览： {{ articleObj.views }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import moment from "moment";

export default {
    name: "Detail",
    data() {
        return {
            id: "",
            articleObj: {},
            articleMd: "",
        };
    },
    // computed:{
    //     articleObj: {
    //         get() {
    //             return this.
    //         }
    //     }
    // },
    components: {
        mavonEditor,
    },
    methods: {
        goBack() {
            this.$router.back();
        },
        async init() {
            this.id = this.$route.params.id;
            // console.log("_id:", this.id)
            const { data } = await this.$ajax.get("/admin/article/" + this.id);
            if (!data.code) {
                console.err(data.err);
                return;
            }
            console.log("详情数据", data.data);
            this.articleObj = data.data;

            this.articleObj.uDate = moment(this.articleObj.uDate).format("lll");
            this.articleObj.cDate = moment(this.articleObj.cDate).format("lll");
        },
    },

    mounted() {
        this.init();
    },
};
</script>

<style>
.bg-container {
    /* min-height: 300vh; */
    width: 100%;
    /* background-image: url("/pic/bgpic1.jpg") ; */
    /* background: rgba(0, 0, 0, .5) url("/pic/bgpic1.jpg")  no-repeat  fixed  top ;
    background-size: cover; */
    
}
.detail-container {
    width: 80vw;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    text-align: left;
}
.el-page-header {
    background: #fff;
    padding: 3vh;
    margin-top: -1px !important;
}
.detail-title {
    font-size: 36px;
    font-weight: 600;
    margin: 6vh 0;
}
.detail-msg {
    font-size: 18px;
    text-align: right;
    color: grey;
    padding: 3vh 0;
}
.detail-msg p {
    line-height: 6vh;
}
</style>
