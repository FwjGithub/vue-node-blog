<template>
    <el-container>
        <el-header>
            <header-nav></header-nav>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
        <el-footer>Footer</el-footer>
    </el-container>
</template>

<script>
import HeaderNav from "./HeaderNav";
export default {
    name: "Layout",
    components: {
        HeaderNav,
    },
};
</script>

<style>
.el-header {
    background-color: #fff;
    color: #333;
    text-align: center;
    height: 8vh !important;
    position: sticky;
    top: 0;
    z-index: 999;
    opacity: 0.9;
}
.el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    height: 12vh !important;
}
.el-main {
    /* background-color: #e9eef3; */
    color: #333;
    text-align: center;
    min-height: 180vh;
    /* line-height: 160px; */
    padding: 0 !important;
    margin: 0 !important;
    box-sizing: border-box;
    width: 100%;
}
</style>
