<template>
    <el-row>
        <el-col>
            <el-menu
                background-color="#545c64"
                text-color="#fff"
                :default-openeds="['/ArticleList', '/UserList']"
                active-text-color="#ffd04b"
                :default-active="curRoute"
                class="nav"
                router
            >
                <el-menu-item index="/">
                    <i class="el-icon-menu"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
                <el-submenu index="/ArticleList">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>文章管理</span>
                    </template>
                    <el-menu-item index="/ArticleList">文章列表</el-menu-item>
                    <el-menu-item index="/ArticleAdd">写文章</el-menu-item>
                </el-submenu>
                <el-submenu index="/UserList">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>用户管理</span>
                    </template>
                    <el-menu-item index="/UserList">用户列表</el-menu-item>
                </el-submenu>
                <el-menu-item index="/CommentList">
                    <i class="el-icon-menu"></i>
                    <span slot="title">评论留言</span>
                </el-menu-item>
                <el-menu-item index="/TagList">
                    <i class="el-icon-menu"></i>
                    <span slot="title">标签管理</span>
                </el-menu-item>
                
            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
export default {
    computed: {
        curRoute: {
            get() {
                return this.$route.path;
            },
            set() {
                return this.$route.path;
            },
        },
    },
    mounted() {
        this.curRoute = this.$route.path;
    },
};
</script>

<style>
.nav {
    height: 100vh;
}
</style>
