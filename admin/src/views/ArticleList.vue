<template>
    <div class="article-table">
        <el-table
            :data="
                tableData.filter(
                    (data) =>
                        !search ||
                        data.name.toLowerCase().includes(search.toLowerCase())
                )
            "
            style="width: 100%"
        >
            <el-table-column label="封面" prop="poster">
                <template slot-scope="scope">
                    <img :src="scope.row.poster" alt="封面图" />
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
            <el-table-column label="发表日期" prop="date"></el-table-column>

            <el-table-column align="right">
                <template slot="header" slot-scope="scope">
                    <el-input
                        v-model="search"
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
        <!-- <div class="pagination"> -->
            <el-pagination
                :page-size="100"
                layout="prev, pager, next, jumper"
                :total="1000"
            ></el-pagination>
        <!-- </div> -->
    </div>
</template>

<script>
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
            search: "",
        };
    },
    methods: {
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        init() {},
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
.article-table .el-table{
    margin-bottom: 20px;
}
</style>
