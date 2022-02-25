<template>
    <el-container>
        <el-header>
            <header-nav></header-nav>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
        <el-footer>
            <div>
                关于博主 手机号码158-1398-2109 电子邮箱2855978252@qq.com
            </div>
            <div>工作时间10:00-20:00   ©2021-2022辣椒炒肉博客</div>
        </el-footer>
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
    opacity: 0.95;
}
.el-footer {
    /* background-color: #f0f0fa; */
    color: gray;
    text-align: center;
    padding-top: 6vh;
    margin: 2vh 0;
    height: 10vh !important;
    line-height: 5vh;
    font-size: 14px;
}
.el-main {
    /* background-color: #f9f9f9; */
    background-color: #f5f5fa;
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
