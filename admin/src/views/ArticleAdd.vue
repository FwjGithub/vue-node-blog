<template>
    <keep-alive>
        <div>
            <div class="title">
                <span class="sub-title">文章标题：</span>
                <el-input
                    maxlength="15"
                    show-word-limit
                    class="title-input"
                    v-model="titleData"
                    placeholder="为文章写上标题吧"
                ></el-input>
            </div>
            <div class="tags">
                <span class="sub-title">文章分类：</span>
                <tags-choose :cb="getTags"></tags-choose>
            </div>
            <div class="poster">
                <span class="sub-title">文章封面：</span>
                <upload-pic :cb="getPoster"></upload-pic>
            </div>
            <div class="content">
                <span class="sub-title">文章内容：</span>
                <div>
                    <mavon-editor
                        v-model="content"
                        ref="md"
                        @change="change"
                        class="md-editor"
                        style="min-height: 700px; width: 100%"
                    />
                </div>
            </div>
            <div class="btn">
                <!-- <el-button type="info" @click="submit">暂存</el-button> -->

                <el-button type="success" @click="submit">发布</el-button>
            </div>
        </div>
    </keep-alive>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import UploadPic from "../components/UploadPic.vue";
import TagsChoose from "../components/TagsChoose.vue";

export default {
    // 注册
    components: {
        mavonEditor,
        UploadPic,
        TagsChoose,
    },
    data() {
        return {
            content: "", // 输入的markdown
            html: "", // 及时转的html
            posterData: "",
            titleData: "",
            tagsData: "",
        };
    },
    methods: {
        // 所有操作都会被解析重新渲染
        change(value, render) {
            // render 为 markdown 解析后的结果[html]
            this.html = render;
        },
        // 提交
        submit() {
            // console.log(this.content);
            // console.log(this.html);
            const formdata = { ...this.$data };
            console.log(formdata);
        },
        getPoster(base64) {
            this.posterData = base64;
            // console.log(this.posterData);
        },
        getTags(tags) {
            this.tagsData = tags;
            // console.log(this.posterData);
        },
    },
    mounted() {},
};
</script>

<style>
.title,
.tags,
.poster,
.content {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
    padding: 10px 0;
    vertical-align: middle;
}
.sub-title {
    display: inline-block;
    min-width: 100px;
    box-sizing: border-box;
}
.title-input {
    width: 380px !important;
}
.md-editor {
    margin-bottom: 20px;
}
.btn {
    display: flex;
    justify-content: flex-end;
}
</style>
