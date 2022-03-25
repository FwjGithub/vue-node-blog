<template>
    <el-row>
        <el-col>
            <el-menu
                

                :default-openeds="['/ArticleList', '/UserList']"
                :default-active="curRoute"
                class="nav"
                router
            >
                <el-menu-item index="/">
                    <i class="el-icon-monitor"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
                <el-menu-item index="/CommentList">
                    <i class="el-icon-message"></i>
                    <span slot="title">留言管理</span>
                </el-menu-item>
                <el-menu-item :disabled="!isAdmin" index="/TagList">
                    <i class="el-icon-price-tag"></i>
                    <span slot="title">标签管理</span>
                </el-menu-item>

                <el-submenu :disabled="!isAdmin" index="/ArticleList">
                    <template slot="title">
                        <i class="el-icon-reading"></i>
                        <span>文章管理</span>
                    </template>
                    <el-menu-item index="/ArticleList"><i class="el-icon-document"></i>文章列表</el-menu-item>
                    <el-menu-item index="/ArticleAdd"><i class="el-icon-edit-outline"></i>写文章</el-menu-item>
                </el-submenu>
                <el-menu-item v-if="isSuper" index="/UserList"><i class="el-icon-user"></i>用户管理</el-menu-item>
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
        isAdmin: {
            get() {
                return localStorage.getItem("isAdmin");
            },
            set() {
                return localStorage.getItem("isAdmin");
            },
        },
        isSuper: {
            get() {
                return localStorage.getItem("isSuper");
            },
            set() {
                return localStorage.getItem("isSuper");
            },
        },
    },
    mounted() {
        this.curRoute = this.$route.path;
        this.isSuper = localStorage.getItem("isSuper");
        this.isAdmin = localStorage.getItem("isAdmin");
    },
};
</script>

<style scoped>
.nav {
    height: 100vh;
}
.el-menu-item {
    height: 8vh!important;
    line-height: 8vh!important;
}
.el-icon-price-tag{
    display: inline-block;
    transform: rotate(-45deg);
}
</style>
