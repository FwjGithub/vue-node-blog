<template>
    <div class="article-table">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column
                align="center"
                label="用户名"
                prop="username"
            ></el-table-column>
            <el-table-column align="center" prop="isAdmin" label="是否为管理员">
                <template slot-scope="scope">
                    <el-switch
                        @change="handleSwitch(scope.$index, scope.row)"
                        v-model="scope.row.isAdmin"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="isSuperAdmin"
                label="是否为超级管理员"
            >
                <template slot-scope="scope">
                    <el-switch
                        @change="handleSwitch(scope.$index, scope.row)"
                        v-model="scope.row.isSuperAdmin"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="注册日期"
                prop="cDate"
            ></el-table-column>

            <el-table-column align="center">
                <template slot="header" slot-scope="scope">
                    <el-input
                        v-model="searchCondition.key"
                        @change="searchUser"
                        size="mini"
                        placeholder="输入关键字搜索"
                    />
                </template>
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                        >注销该用户</el-button
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
                    _id: "6214af4edda503219c451919",
                    isAdmin: false,
                    isSuperAdmin: false,
                    cDate: 1645522766890.0,
                    username: "qwer",
                    password: "931b893ae00c11a7918a869735d298a5",
                },
                {
                    _id: "6214af4edda503219c451919",
                    isAdmin: false,
                    isSuperAdmin: false,
                    cDate: 1645522766890.0,
                    username: "qwer",
                    password: "931b893ae00c11a7918a869735d298a5",
                },
                {
                    _id: "6214af4edda503219c451919",
                    isAdmin: false,
                    isSuperAdmin: false,
                    cDate: 1645522766890.0,
                    username: "qwer",
                    password: "931b893ae00c11a7918a869735d298a5",
                },
                {
                    _id: "6214af4edda503219c451919",
                    isAdmin: false,
                    isSuperAdmin: false,
                    cDate: 1645522766890.0,
                    username: "qwer",
                    password: "931b893ae00c11a7918a869735d298a5",
                },
                {
                    _id: "6214af4edda503219c451919",
                    isAdmin: false,
                    isSuperAdmin: false,
                    cDate: 1645522766890.0,
                    username: "qwer",
                    password: "931b893ae00c11a7918a869735d298a5",
                },
            ],
            searchCondition: {
                key: "", //关键词
                page: 1, //当前页
                limit: 5, //每页文章数
            },
            total: 0,
        };
    },
    methods: {
        async handleDelete(index, row) {
            // console.log(row)
            this.$confirm("此操作将注销用户, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(async () => {
                    const { data } = await axios.delete("/api/user/" + row._id);

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
        async searchUser() {
            this.searchCondition.page = 1;
            const data = await ArticleAjax.findByPage(this.searchCondition);
            this.tableData = data.data;
            this.total = data.count;
        },
        async handleSwitch(index, row) {
            console.log("改变权限：", index, row)
        }
    },
    mounted() {
        // this.init();
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
