<template>
    <div class="tag-table">
        <div class="tag-add">
            <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputBlur"
            ></el-input>
            <el-button
                class="button-new-tag"
                v-else
                size="small"
                @click="showInput"
                >+ 新增标签</el-button
            >
        </div>
        <el-table :data="tagsData" style="width: 100%" center>
            <el-table-column label="标签">
                <template slot-scope="scope">
                    <el-tag
                        :type="Math.random() > 0.5 ? 'primary' : 'success'"
                        disable-transitions
                        >{{ scope.row.text }}</el-tag
                    >
                </template>
            </el-table-column>
            <el-table-column label="文章数量" prop="count"></el-table-column>
            <el-table-column label="创建日期" prop="date"></el-table-column>
            <el-table-column align="right">
                <template slot="header" slot-scope="scope">
                    <el-input
                        v-model="searchCondition.key"
                        @change="searchTag"
                        size="mini"
                        placeholder="输入关键字搜索"
                    />
                </template>
                <template slot-scope="scope">
                    <!-- <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button
                    > -->
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <!-- <el-pagination
            :page-size="searchCondition.limit"
            layout="prev, pager, next, jumper"
            :total="total"
            :current-page="searchCondition.page"
            @current-change="handleChange"
            @prev-click="handleChange"
            @next-click="handleChange"
        ></el-pagination> -->
    </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import TagsChoose from "../components/TagsChoose";
export default {
    components: {
        TagsChoose,
    },
    data() {
        return {
            tagsData: [
                {
                    date: "2016-05-02",
                    text: "标题1",
                    count: 6,
                },
                {
                    date: "2016-05-02",
                    text: "标题1",
                    count: 6,
                },
                {
                    date: "2016-05-02",
                    text: "标题1",
                    count: 6,
                },
                {
                    date: "2016-05-02",
                    text: "标题1",
                    count: 6,
                },
            ],
            inputVisible: false,
            inputValue: "",
            searchCondition: {
                key: "", //关键词
                page: 1, //当前页
                limit: 5, //每页文章数
            },
            key: "",
            page: 1,
            limit: 5,
            total: 0,
        };
    },
    computed: {
        tags() {
            return this.tagsData.map((item) => item.text);
        },
    },

    methods: {
        showInput() {
            this.inputVisible = true;
            this.$nextTick((_) => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleInputBlur() {
            (this.inputValue = ""), (this.inputVisible = false);
        },
        async handleInputConfirm() {
            let inputValue = this.inputValue;
            this.inputVisible = false;
            this.inputValue = "";
            // console.log("新标签：", inputValue)
            const { data } = await this.$ajax.post("/api/tag", {
                text: inputValue,
            });
            console.log("返回结果：", data);
            if (!data.code) {
                this.$message(data.err);
                return;
            }
            this.$message("添加成功");
            this.init();
        },
        handleEdit(index, row) {
            // console.log(index, row);
            // this.$router.push('/ArticleEdit/' + row._id  )
        },
        async handleDelete(index, row) {
            // console.log(row)
            this.$confirm("此操作将永久删除该标签, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(async () => {
                    // if (row.count > 0) {
                    //     this.$message({
                    //         type: "error",
                    //         message: "删除失败！目前仍有文章是由此标签",
                    //     });
                    //     return;
                    // }
                    const { data } = await this.$ajax.delete(
                        "/api/tag/" + row._id
                    );
                    if(!data.code) {
                        this.$message({
                            type: "error",
                            message: data.err,
                        });
                        console.log("删除结果：", data);
                        return
                    }

                    this.$message({
                        type: "success",
                        message: "删除成功!",
                    });
                    this.init();
                })
                .catch((err) => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                    console.log("删除结果：", err);
                });
        },
        async init() {
            const { data } = await this.$ajax.get(
                "/api/tag",
                this.searchCondition
            );
            // console.log("返回结果", data)
            if (!data.code) {
                this.$message(data.error);
                return;
            }

            this.tagsData = data.data.data.map((item) => {
                item.date = moment(item.date).format("lll");
                return item;
            });
            this.total = data.data.count;
        },
        async handleChange(cur) {
            // console.log("改变页数", cur)
            this.searchCondition.page = cur;
            this.init();
        },
        async searchTag() {
            this.searchCondition.page = 1;
            this.init();
        },
    },
    mounted() {
        this.init();
    },
};
</script>

<style>
.tag-table {
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.tag-table .el-table {
    margin-bottom: 20px;
}
.tag-table .el-pagination {
    align-self: center;
}
.tag-add {
    margin-bottom: 6vh;
}
.tag-add .el-input,
.tag-add .el-button {
    margin: 0 !important;
}
</style>
