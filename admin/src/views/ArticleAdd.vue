<template>
    <!-- <keep-alive> -->
        <div>
            <div class="title">
                <span class="sub-title">文章标题：</span>
                <el-input
                    maxlength="15"
                    show-word-limit
                    class="title-input"
                    v-model="title"
                    placeholder="为文章写上标题吧"
                ></el-input>
            </div>
            <div class="tags">
                <span class="sub-title">文章分类：</span>
                <!-- <tags-choose :cb="getTags"></tags-choose> -->
                <el-select
                    v-model="tags"
                    multiple
                    placeholder="请选择文章分类"
                >
                    <el-option
                        v-for="item in options"
                        :key="item._id"
                        :label="item.text"
                        :value="item.text"
                    >
                    </el-option>
                </el-select>
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
                        @imgAdd="$imgAdd"
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
    <!-- </keep-alive> -->
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import UploadPic from "../components/UploadPic.vue";
import TagsChoose from "../components/TagsChoose.vue";
import axios from "axios";
import articleUtil from "../utils/article";
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
            poster: "",
            title: "",
            options: [], // 表示初始化查询到的标签
            tags: [], // 表示已经选中的标签
        };
    },
    methods: {
        // 所有操作都会被解析重新渲染
        change(value, render) {
            // render 为 markdown 解析后的结果[html]
            this.html = render;
        },
        // 提交
        async submit() {
            const article = {
                ...this.$data,
            };
            if (!articleUtil.checkArticleNull(this, article)) {
                return;
            }
            // console.log("文章对象", article);
            this.$confirm("确认发表文章?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "success",
            })
                .then(async () => {
                    const { data } = await axios.post(
                        "/admin/article",
                        article
                    );
                    this.$message({
                        type: "success",
                        message: "发布成功!",
                    });
                    this.$router.push("/ArticleList");
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消发布",
                    });
                });
        },
        getPoster(base64) {
            this.poster = base64;
            // console.log(this.poster);
        },
        getTags(tags) {
            this.tags = tags;
            // console.log(this.poster);
        },
        $imgAdd(pos, $file) {
            // 第一步.将图片上传到服务器.
            var formdata = new FormData();
            formdata.append("imgfile", $file);
            axios({
                url: "/admin/upload",
                method: "post",
                data: formdata,
                headers: { "Content-Type": "multipart/form-data" },
            }).then(({ data }) => {
                // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
                // $vm.$img2Url 详情见本页末尾
                if (!data.code) {
                    this.$message({
                        type: "error",
                        message: data.err,
                    });
                    return;
                }

                this.$refs.md.$img2Url(pos, data.data);
            });
        },
        async init() {
            const {data} = await this.$ajax.get('/api/tag');
            if(!data.code) {
                this.$message(data.err);
                // console.log(data);
                return
            }
            // console.log("tags", data.data.data)
            this.options = data.data.data;
        }
    },
    mounted() {
        this.init()
    },
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
