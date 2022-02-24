<template>
    <div class="article-table">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column label="封面" prop="poster">
                <template slot-scope="scope">
                    <el-avatar
                        shape="square"
                        :size="100"
                        fit="contain"
                        :src="scope.row.poster"
                    ></el-avatar>
                </template>
            </el-table-column>
            <el-table-column label="标题" prop="title"></el-table-column>
            <el-table-column prop="tags" label="标签">
                <template slot-scope="scope">
                    <div>
                        <el-tag
                            v-for="i in scope.row.tags"
                            :type="Math.random() > 0.5 ? 'primary' : 'success'"
                            disable-transitions
                            >{{ i }}</el-tag
                        >
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="发表日期" prop="cDate"></el-table-column>
            <el-table-column label="最近更新" prop="uDate"></el-table-column>

            <el-table-column align="right">
                <template slot="header" slot-scope="scope">
                    <el-input
                        v-model="searchCondition.key"
                        @change="searchArticle"
                        size="mini"
                        placeholder="输入关键字搜索"
                    />
                </template>
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button
                    >
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            :page-size="searchCondition.limit"
            layout="prev, pager, next, jumper"
            :total="total"
            :current-page="searchCondition.page"
            @current-change="handleChange"
            @prev-click="handleChange"
            @next-click="handleChange"
        ></el-pagination>
    </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import * as ArticleAjax from "../ajax/article";
export default {
    data() {
        return {
            tableData: [
                {
                    date: "2016-05-02",
                    title: "标题1",
                    address: "上海市普陀区金沙江路 1518 弄",
                    tags: ["知识", "生活"],
                    poster: "",
                },
                {
                    date: "2016-05-04",
                    title: "标题12",
                    address: "上海市普陀区金沙江路 1517 弄",
                    tags: ["知识", "生活", "思考"],
                    poster: "",
                },
                {
                    date: "2016-05-01",
                    title: "标题13",
                    address: "上海市普陀区金沙江路 1519 弄",
                    tags: ["知识", "生活"],
                    poster: "",
                },
                {
                    date: "2016-05-03",
                    title: "标题14",
                    address: "上海市普陀区金沙江路 1516 弄",
                    tags: ["知识"],
                    poster: "",
                },
            ],
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
    methods: {
        handleEdit(index, row) {
            // console.log(index, row);
            this.$router.push('/ArticleEdit/' + row._id  )
        },
        async handleDelete(index, row) {
            // console.log(row)
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(async () => {
                    const { data } = await axios.delete("/admin/article/" + row._id);

                    this.$message({
                        type: "success",
                        message: "删除成功!",
                    });
                    this.init();

                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
        async init() {
            const data = await ArticleAjax.findByPage(this.searchCondition);

            this.tableData = data.data;
            // console.log(this.tableData)
            this.total = data.count;
        },
        async handleChange(cur) {
            // console.log("改变页数", cur)
            this.searchCondition.page = cur;
            const data = await ArticleAjax.findByPage(this.searchCondition);

            this.tableData = data.data;
            // console.log(this.tableData)
            this.total = data.count;
        },
        async searchArticle() {
            this.searchCondition.page = 1;
            const data = await ArticleAjax.findByPage(this.searchCondition);
            this.tableData = data.data;
            this.total = data.count;
        },
    },
    mounted() {
        this.init();
    },
};
</script>

<style>
.article-table {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.article-table .el-table {
    margin-bottom: 20px;
}
</style>
